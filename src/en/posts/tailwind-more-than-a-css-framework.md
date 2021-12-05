---
title: "Tailwind: more than a CSS framework"
date: 2020-11-02
featured_image: /assets/img/daniel-vargas-ngrIs67UJEg-unsplash.png
featured_image_alt: Minca, Atlántico, Colombia
image_caption: Photo by <a href="https://unsplash.com/@showingourplanet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Niels van Altena</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

description: "Tailwind is a lot more than a CSS framework. It's an ecosystem of learning materials for CSS and web design."
tags:
  - post
  - tailwind
  - css
layout: layouts/post.njk
---

## Intro

Recently [Tailwind](https://tailwindcss.com) has been gaining more popularity every day. It's a great framework and I'm happy to see it succeed given how much value I've gotten out of it. Plenty of articles have been written about the good parts (and downsides) of using Tailwind from the technical point of view, however, some of the reasons I hold Tailwind in such a high regard go beyond the technical aspect of it, I'd say they're even emotional and I'd like to share them in this article.

## How it first came to me

On 2016 I started developing a new consumer product along with my partners at [Savy](https://savy.co). At the time I didn't really _know_ how to make a site look nice, but I knew that Bootstrap was a good starting point for typography, colors and a few components. I'd experienced the pain of trying to break out of themes in the past so I went with a bare bones installation via `bootstrap-sass` which was the recommended way for a [Rails](https://rubyonrails.org/) project. I changed the default colors and started hacking away a landing and a search results page. Rather quickly I bumped into use cases where I wanted to change things up a bit for the navbar, cards, media items, etc. To my delight, bootstrap included helper utilities that you could throw in the HTML like `mb-5`, `px-4`, `bg-primary` to personalize the default components. In fact, just with a few utilities for padding, positioning, display, and color I realized that `80%` of what I needed to do was achievable with these utilities, right in my HTML.

But `80%` wasn't enough, I wanted to do more with utilities, which eventually lead me to, if I recall correctly, TailwindCSS v0.7. Thus it began one of my longest lasting relationship's with a library. But there was something bigger in store for me behind that library, something that changed my career for the better, I just didn't know it at the time. It was also the beginning of my love for Web Design.

## Beyond the technical aspect of atomic CSS

There's a lot of work that was put behind Tailwind as a library but there's just as much, if not more, work put around it's ecosystem and development. I'm talking about [the awesome docs](https://tailwindcss.com/), [the streams](https://www.youtube.com/c/AdamWathan) implementing UIs with the library, [the design tips](https://twitter.com/i/events/879086180909764608?lang=en), [the book](https://www.refactoringui.com/book) on design for developers, and more. All of these added up to an ecosystem that made it easy to succeed with the library and also learn a few things on the journey.

### It taught me CSS

Seriously, I have to thank the Tailwind docs for finally making flexbox click in my brain. The pictures along with the code samples were so helpful in understanding the different properties at play in a flex container. The axis, flow, direction, wrap... it was all there. It's not like I learnt it overnight, I had to keep coming back to the docs basically every time I needed to create a layout. But the fact that I could look up the primitives of how to achieve something in flex instead of trying to copy paste some CSS classes of something that looked like what I wanted to build instead of creating my own was a turning point for me. This also applies to the display properties, positioning, margins and paddings and well.. so much more.

> As an aside note I remember when, after having used tailwind for a couple of months, I could suddenly _see_ a UI and decompose it into it's individual properties. Being able to think this card component is just a flex container with rounded corners, a shadow and some padding inside felt like being Neo watching the matrix for the first time.

### It gave me ownership of my CSS

This is the part where we talk about maintainability. While it can be off putting to have so many classes on your HTML (and if your design is _very_ detailed such as tailwindUI's there are even more) being able to come back to a component and _know_ that you can replace everything in it without breaking something else is worth it on it's own.

### It made me more productive

I place a lot or value around how the tailwind workflow enables you to quickly try out designs without having to jump between files. This is specially true for web design projects such as landing pages and marketing sites although it can get pretty repetitive on web apps that have more component reuse across the board. I also find it relatively straight forward to implement someone else's design, which is a big win for teams that have designers working in Figma.

### It taught me (web) design fundamentals

This is part of Tailwind's ecosystem rather than the library itself, but following Steve and Adam taught me a lot about design. Their focus in putting out tips of design for developers was right up my alley and I consumed every bit of information they put out on twitter, medium, etc. All these tips eventually turned into Refactoring UI which is a great read if you haven't given it a try.

### It introduced me to the idea of design as a system

Okay kind of. The framework has grown a lot since the 0.7 days when you could say that the limiting set of utilities was a way to enforce design constraints but now a days there's so many utilities that the whole _Tailwind is a design system_ idea might be debatable. Then there's also the introduction of the JIT compiler, which allows you you to create one off utilities on the fly. Still, I'd argue that tailwind defaults push you in the right direction and make it easy for everyone on the project to enforce some design constraints.

### It's easy to jump between projects

Since the utilities remain consistent between older versions and projects, unless you use more semantic names which is generally fine, it's easy to come back to a project and pick up where you left off. This is specially true when it comes to modifying existing components since you can be sure not to break styling anywhere else.

## The future

I'll probably keep using Tailwind on my personal projects. It keeps pushing it's own boundaries so it's also been an interesting journey to keep up with it and what's possible beyond the initial idea of utility classes. But this space is in constant flux, and new paradigms emerge everyday as the web evolves. CSS variables have already unlocked some new approaches such as [Vanilla Extract](https://vanilla-extract.style) which I'm excited to explore for component based frameworks and widespread use of Custom Elements might need a different approach. It is, after all, still an exciting time for being a web developer.
