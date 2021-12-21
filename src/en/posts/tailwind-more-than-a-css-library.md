---
title: "Tailwind: more than a CSS library"
date: 2021-12-20
featured_image: /assets/img/articles/niels-van-altena-baUqXWWvN1c-unsplash.jpg
featured_image_alt: Minca, Atlántico, Colombia
image_caption: Photo by <a href="https://unsplash.com/@showingourplanet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Niels van Altena</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

description: "Tailwind is more than a CSS framework. It's an ecosystem of learning materials for CSS and web design."
tags:
  - post
  - tailwind
  - css
  - web-design
layout: layouts/post.njk
---

## Intro

I've been a fan of [Tailwind](https://tailwindcss.com) for a while now and it seems that it has recently exploded in popularity. It's a great framework and I'm happy to see it succeed given how much value I've gotten out of it. Plenty of articles have been written about the good parts (and downsides) of using Tailwind from the technical point of view, however, some of the reasons I hold Tailwind in such a high regard go beyond the technical aspect of it, I'd say they're even emotional and I'd like to share them in this article.

## How it first came to me

On 2016 I started developing a new consumer product along with my partners at [Savy](https://savy.co). At the time I didn't really _know_ how to make a site look nice, but I knew that Bootstrap was a good starting point for typography, colors and a few components. Naturally, I quickly bumped into use cases where I wanted to change break out a bit from the default styles, specially with components such as the navbar, cards, etc. To my delight, bootstrap included helper utilities that you could throw in the HTML like `mb-5`, `px-4`, `bg-primary` to personalize the default components. In fact, just with a few utilities for padding, positioning, display, and color I realized that `80%` of what I needed to do was achievable with these utilities, right in my HTML.

I was hooked on utility classes from that point on, but `80%` wasn't enough, I wanted to have more of them which eventually lead me to Tailwind v0.7(IIRC). Thus it began one of my longest lasting relationship's with a library. But there was something bigger in store for me behind that library, something that changed my career for the better, I just didn't know it at the time. It was also the beginning of my love for Web Design.

## Beyond a CSS library

There's a lot of work that was put behind Tailwind as a library but there's just as much, if not more, work put around it's ecosystem and development. I'm talking about [the awesome docs](https://tailwindcss.com/), [the streams](https://www.youtube.com/c/AdamWathan) implementing UIs with the library, [the design tips](https://twitter.com/i/events/879086180909764608?lang=en), [the book](https://www.refactoringui.com/book) on design for developers, and more. All of these added up to an ecosystem that made it easy to not only succeed with the library but also learn Web Design as a whole at the same time.

### It taught me CSS basics

I'd been using CSS for years but I don't think I'd ever truly _understood_ it up to that point. Seriously, I have to thank the Tailwind docs for finally making `flexbox` click in my brain (and I don't think I'm alone here). The pictures along with the code samples were so helpful in understanding the different properties at play in a flex container. It wasn't an overnight process, but the way tailwind forces you to think in primitives made it so that I had to learn the properties in order to implement a layout.

This was a turning point for me. I could see a design and decompose in my mind the individual properties that would need to be implemented. Suddenly a whole new world of creative exploration was available to me.

### It helped me take ownership of application styles

I used to feel very insecure when editing the stylesheets of an existing application. It wasn't just lack of knowledge but also that the way styles were written changing a property could lead to very unexpected results. So I'd generally feel like I was guessing and then hoping things wouldn't break. With Tailwind, even though elements with lots of classes might be difficult to parse specially at first, you _know_ that it's all scoped to that single element. You're free to change everything up without fear of breaking other parts of the layout.

### It made me more productive

I greatly value how the Tailwind workflow enables you to implement designs without having to jump between files. The quick feedback loop is great for iteration, if you're experimenting, or for implementing an existing design from a tool like figma. It also removes the step of having to come up with names for every HTML element and lets you focus just on the styling. While the markup may get pretty crowded and might be difficult to navigate you're encouraged to extract components or partials which let you focus on one piece of your design at a time.

### It taught me (web) design fundamentals

This is part of Tailwind's ecosystem rather than the library itself, but following Steve's design tips on [twitter](https://twitter.com/i/events/994601867987619840) helped me understand design basics for building UIs. On top of that Adam's screencasts on [youtube](https://www.youtube.com/c/AdamWathan) were a terrific walk-through on how to implement a designer's vision with CSS. By making design fundamentals more approachable a new world was opened up to me, which ended up playing a big role in my career as a web developer and eventually as an entrepreneur.

### It showed me the value of a design system

Okay kind of, this one is a bit of a stretch. A Design System goes beyond tokens and the way the framework has grown since the 0.7 days when you could call the limiting set of utilities an advantage to enforce consistency. Yet, Tailwind does point you in the right direction: tokenizing spacing scales, colors, borders, shadows and typography set you up for success specially with the great defaults given by the library itself. I don't consider Tailwind to be a Design System by itself (and it's not one of the libraries objectives) but it is a stepping stone for creating one.

## The future

I'll probably keep using Tailwind on my personal projects. It keeps pushing it's own boundaries and it's been an interesting journey to discover what's possible beyond the idea of utility classes and atomic CSS. But this space is in constant flux, and new paradigms emerge everyday as the web evolves. CSS variables have already unlocked some new approaches such as [Vanilla Extract](https://vanilla-extract.style) and [Stitches](https://stitches.dev) which I'm excited to explore for building Design Systems. It is, after all, still an exciting time for being a web developer.
