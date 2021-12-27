---
title: "From Tailwind to Vanilla Extract: the right CSS tool for the Design System job"
date: 2021-12-22
featured_image: /assets/img/articles/saul-mercado-LFuFLGo_3ME-unsplash.jpg
featured_image_alt: Colombia
image_caption: Photo by <a href="https://unsplash.com/@mercadomuses?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Saul Mercado</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

description: A story about migrating a nascent component library from Tailwind to Vanilla Extract and the lessons learned during the process.
tags:
  - post
  - design-systems
  - tailwindcss
  - vanilla-extract
layout: layouts/post.njk
---

## Intro

Recently I came into a new organization that is a good fit for developing it's own Design System. Although we're still early on the product development journey and we're just getting a couple of MVPs of the ground with a small team, we decided it would be worth to extract base components early on that would eventually become the foundation for a full featured Design System down the line.

The plan was to build the feature screens first and then extract common UI components as they revealed themselves. I've found this approach of "build then extract" to be a good balance of extracting base components while allowing the team to move forward with feature work. It does require some willingness to "let some things go", since there isn't always time to extract a component right then and there but the added benefit is that you can design the component's API that's, ideally, used in a couple different places.

## Extracting Tailwind Components

For our tech stack we chose React and Nextjs with Tailwind as a styling solution. I'd found tailwind to work really well with component UI libraries since it creates a natural boundary for style reuse instead of going down the road of using `@apply`. However building components for a design system is quite a different story from building application components. The former tend to need more flexibility: they are often times themable and include lower level utilities for layouts and spacing based on design tokens. While we had some doubts about being able to pull out this transition we felt confident enough to keep using tailwind to get things of the ground and figure it out down the road. Some encouraging [words](https://www.netlify.com/blog/2021/03/23/from-semantic-css-to-tailwind-refactoring-the-netlify-ui-codebase/) from the [Netlify](https://www.netlify.com/) team also reassured us that the idea wasn't too crazy after all.

However as we started extracting out some components we started bumping into some difficulties with the utility classes approach. As a disclaimer, I think tailwind is fine if you're extracting components inside your own app and are keeping the API of each component fairly restricted but since we were looking to extract a **design system** the constraints are a bit different. That said, let's dive into some of the problems we found.

**It's awkward to map tailwind classes to props**

The first decision that we bumped into is how we should expose styling props for some components. For example imagine a component that exposes background property that accepts a color from your palette. Do consumers of the component pass in the class that contains the style or a string with the color value?. The former feels a bit odd, since you'd be repeating yourself by using the class `background="bg-blue-400"`. The latter would take in the value, such as `blue-400` and the component would rebuild the appropriate class dynamically which brings it's own set of issues which we'll discuss later.

```javascript
// This feels odd
function Card({ background = "bg-white", ...rest }) {
  return <div className={background} {...rest} />
}

// This needs more work
function Card({ background = "white", ...rest }) {
  const backgroundClass = `bg-${background}` // No type safety

  return <div className={topSpace} {...rest} />
}
```

This is also the case for any other property that the component might expose and can get overwhelming pretty quickly.

**You have to keep the Tailwind config in sync with component props**

There's no real integration between React and Tailwind, meaning that they're not **aware** of each other, so every time you add or remove a value from Tailwind's config you have to remember to update or expose the corresponding props in your components. It's easy to forget this step and end up with out of date props and styles.

```javascript
// tailwind.config.js
module.exports = {
  extend: {
    spacing: {
      // New values
      72: "18rem",
      84: "21rem",
    },
  },
}

// Must update types that map to the new values
type SpacingProps = {
  // New values
  72: number,
  84: number,
}

function Spacer({ top }: { top: SpacingProps }) {
  return <div className={topSpace} {...rest} />
}
```

**Dynamically generating classNames don't get purged or generated (with JIT)**

In a previous point we debated the choice of eweather 
I don't think this is that big of a deal, but you have to be careful when concatenating classes with props to avoid writing explicit mappings, since PurgeCSS needs to find the actual classname string or it will remove it from the final bundle. We tried to figure out a few ways around this, like messing with the PurgeCSS config, explicitly mapping the values to classes instead of interpolating strings and having code comments with the used classes but none of them felt like a longterm solution.

```javascript
function Spacer({ top = "16", ...rest }) {
  const topSpace = `mt-${top}` // mt-16 will be absent on the prod bundle since PurgeCSS couldn't find it
  return <div className={topSpace} {...rest} />
}
```

**There's no escape hatch**

What are your options to allow a Component to be modified beyond it's own props? Generally you'd use the `className` or `style` prop directly. The problem here is that if you expose the `className` prop any consumer can potentially override some of the components 'base' classes. This can cause unexpected behavior, since overriding a property will cause the utility that's defined later on the `CSS` file to win, which many people are unaware of. Then could think about doing things like de duping at the utility level which seems like a lot of added complexity.

**There's no good way to break out of tailwind**

Lastly, there's a good chance that you'll get to a point where you need to implement something outside of tailwind's utilities. Although the library is huge by now and you can do a _lot_ with when the time comes you'll need a way to breakout. The alternatives here are to use plain old CSS with `@apply` so you can keep using your tokens which works fine but I find that since `className` is already overloaded with utilities it's easy to miss when and where custom CSS was used.

## Switching to Vanilla Extract

Given the previous considerations it felt like we needed to stop bending tailwind backwards and use a different underlying library to power our growing component library. Ideally we'd go for something that would let us use our design tokens directly, as utility classes do, since I've found (and I've seen this argument around for a while) that naming every single tag slows you down. Also we wanted to provide good typing support to expose subset of utilities as component props. Turns out Vanilla Extract provides just that with it's excellent Typescript support as well as atomic styles extracted at build time.

**The switch**

We decided to do the switch progressively, converting one component at a time as we needed to add functionality. Setting up the library was somewhat easy but it was helpful to see a couple reference implementations from [Shopify's Polaris](https://github.com/Shopify/foundational-design-system-proto) and [Seek's Braid](https://github.com/seek-oss/braid-design-system). Basically, you create your theme object, pass it to the `sprinkles` function that creates the atomic classes and export the`Atoms` generic type to be able to map parts of the theme to component props.

**The good things**

The `Atom` type makes it as simple as it can get to map low level CSS concepts to component properties along with typescript's autocomplete. If you update your theme object, your types get updated along with it and if something gets removed it will yield a type error. This is a great way to avoid breaking components without relying solely on tests.

The mental model while working with Vanilla Extract is a bit different than Tailwind. While it provides atomic classes it doesn't expect you to write your whole application with it. Thus, it feels more naturally to drop down to `css in ts` and finish the job. You still get to mix and match regular CSS properties with your atomic classes and it all gets extracted to static CSS at buildtime.

Working with Vanilla Extract allowed us to define flexible low level components that could be composed into more complex ones. Libraries like [Dessert Box](https://github.com/TheMightyPenguin/dessert-box) are a wonderful starting point to map your theme to a `Box` component that can be used as basis for layout components such as `Flex`, `Center`, `Grid` and even `Cards`, `Button` and more. This was very much inline with the approach of extracting base components as we built the main application.

We've found that having a first class variant support simplifies a lot of conditional code we used to have around components and provides a natural queue for when it's time to move some of the styling logic to `css.ts` files.

**The not so good things**

Previously I listed dealing PurgeCSS when creating classNames dynamically as a problem. That's not really fair in this comparison since Vanilla Extract doesn't do any purging at all. But Vanilla Extract doesn't **want you** to map as much of CSS to utilities, so while in theory you could end up with unused CSS it's unlikely this will become a problem in practice.

While one of the initial value propositions of Vanilla Extract is that CSS in TS is closer to CSS than other approaches it's early to tell if this will be the case. So far I find that `css.ts` files tend to feel more like typescript files than style sheets. This is fine for developers and you get to have the full power of typescript at your disposal, but ideally you'd want designers to share ownership of this files and they might feel a bit daunting at first:

```typescript
// A sample css.ts file that's rather simple.
export const step = styleVariants({
  default: {},
  active: {
    color: "white",
    background: vars.colors["purple-500"],
  },
  disabled: {
    color: vars.colors["gray-400"],
    background: vars.colors["gray-50"],
  },
})

export const icon = style([
  style({
    transition: "transform 75ms ease-in",
  }),
  atoms({
    height: "6",
    width: "6",
  }),
])

export const openAnimation = style({
  transform: "rotate(180deg)",
})
```

You're restricted to one kind of variant per property. In tailwind you can get multiple kind's of variants for a single property. Think of how you can have `hover:text-sm` and `md:text-lg` at the same time. On Vanilla Extract + Sprinkles, as far as I can tell, you can only have one type of variant per property. This is fine 90% of the time and, as I mentioned before, since Vanilla Extract doesn't encourage to have every single style as an atomic property, it's best to pull out a `css.ts` if you're looking for multiple modifiers, but I do miss it some times.

## The takeaways

This article isn't by any means meant to bash on Tailwind. While it was a very real possibility that it wasn't going to be the right fit to build a Component Library it was still a good way to get the ball rolling given the team's size and constraints . I think it's valuable to write about the experience of hitting some of the walls that you might encounter with these libraries in the context of a real life application since I find that most articles focus on shallow use cases that don't give you the full picture in order to understand some of the trade offs of a library.

On a personal note, I am very impressed by Vanilla Extract and I feel like I'll be reaching for it more often on projects that require a component based approach, while keeping tailwind as my preferred solution for server side templates. I'm particularly excited to see how Web Components continue to mature and I think Vanilla Extract, being statically extracted at build time, fits into that ecosystem.
