---
title: "De Tailwind a Vanilla Extract: la herramienta correcta para un Sistema de Diseño"
date: 2021-12-22
featured_image: /assets/img/articles/saul-mercado-LFuFLGo_3ME-unsplash.jpg
featured_image_alt: En algún lugar de Colombia
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

Recientemente empecé a trabajar en una organización cuyo modelo es un buen fit para implementar su propio Sistema de Diseño. A pesar de que aún está en una etapa temprana de desarrollo de producto y el equipo es pequeño, lo que hace que invertir recursos dedicados en un proyecto de este estilo fuera de consideración, como equipo de producto podemos extraer unos componentes base que a futuro se conviertan en un Sistema de Diseño completo.

El plan consistió en construir las pantallas de funcionalidades e ir extrayendo componentes comunes de UI a medida que se fueran revelando. Esta aproximación permite tener un buen balance entre el tiempo invertido en extraer componentes reutilizables y al mismo tiempo avanzar en la implementación del MVP.

## Extracting Tailwind Components

Para este MVP usamos una combinación de [React](https://reactjs.org/) (con [Next.js](https://nextjs.org/)) y [Tailwind](https://tailwindcss.com) para los estilos. En mi experiencia, Tailwind funciona bastante bien con librerías de componentes ya que crean una frontera natural para reutilizar estilos y evita algunas aproximaciones problemáticas como el uso de `@apply`. Sin embargo, construir componentes para un sistema de diseño es lo mismo que construir componentes de aplicación. Los primeros tienden a necesitar mucha mayor flexibilidad: pueden implementar temas distintos, incluyen componentes de más bajo nivel para maquetación y espaciado basados en los tokens de diseño. A pesar que el equipo tenía dudas de lograr esta transición efectivamente decidimos seguir adelante con tailwind e ir resolviendo problemas en el camino. Algunas [palabras adicionales](https://www.netlify.com/blog/2021/03/23/from-semantic-css-to-tailwind-refactoring-the-netlify-ui-codebase/) del equipo de [Netlify](https://www.netlify.com/) nos reafirmaron que la idea no era descabellada después de todo.

Sin embargo a medida que comenzamos a extraer algunos componentes nos topamos con dificultades relacionadas a la técnica de clases atómicas. Quisiera notar en este punto que Tailwind es una solución perfectamente válida para extraer componentes reutilizables de **aplicación**, sin embargo en este caso en particular estabamos buscando extraer la base de un Sistema de Diseño para el cual los requerimientos son diferentes. Dicho esto, miremos algunos de los problemas que encontramos.

**No es natural traducir clases de tailwind a propiedades de React**

Una de las primeras decisiones a las que nos enfrentamos es de qué forma exponer propiedades de estilos para los componentes compartidos. Por ejemplo, supongamos que tenemos un component que recibe una propiedad de _background_ para cambiar su color de fondo. ¿Los consumidores del componentes deberían pasar la clase de tailwind o el nombre del color? El primero se siente extraño pues estaríamos repitiendonos un poco  `background="bg-blue-400"`. El segundo le deja al componente la responsabilidad de reconstruir la clase apropiada para aplicar el color de fondo, además de traer otros problemas adicionales que discutiremos en otro punto.

```javascript
// Esto se siente un poco extraño
function Card({ background = "bg-white", ...rest }) {
  return <div className={background} {...rest} />
}

// Esto necesita trabajo adicional
function Card({ background = "white", ...rest }) {
  const backgroundClass = `bg-${background}` // No type safety

  return <div className={topSpace} {...rest} />
}
```

Esto aplica para todas las propiedades de estilos que se quieran exponer del componente y se convierte en una tarea abrumadora rápidamente

**You have to keep the tailwind config in sync with component props**

Generally you'll have some special semantics around your design system to make it easier to communicate intent. You can configure your `tailwind.config.js` to reflect something semantic like `tones` such as `primary`, `secondary`, `accent` and then create a `Tone` type that can be reused on your components, but it's a manual step and extra effort needed to keep your component types in sync with the tailwind config. If you've ever worked with something like [Styled System](https://styled-system.com/) before, you're probably familiar with a `Box` component that can take styling tokens as props. This is such a powerful API and I found it strikes the perfect balance of enforcing consistency at the token level while allowing engineers to work on screens without being held back by missing components. Unfortunately, trying to come up with something similar while using tailwind classes felt like bending the library beyond it's intended use case.

**Dynamically generating classNames won't work with PurgeCSS**

I don't think this is that big of a deal, but you have to be careful when concatanating classes with props to avoid writing explicit mappings, since PurgeCSS needs to find the actual classname string or it will remove it from the final bundle. We tried to figure out a few ways around this, like messing with the PurgeCSS config, explicitly mapping the values to classes instead of interpolating strings and having code comments with the used classes but none of them felt like a longterm solution.

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
