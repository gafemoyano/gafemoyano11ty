---
title: "Tailwind: more than a CSS library"
date: 2020-11-02
featured_image: /assets/img/daniel-vargas-ngrIs67UJEg-unsplash.png
featured_image_alt: Minca, Atlántico, Colombia
image_caption: Photo by <a href="https://unsplash.com/@showingourplanet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Niels van Altena</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

description: "Tailwind is a lot more than a CSS framework. It's an ecosystem of learning materials for CSS and web design."
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

### It helped me be more productive

I greatly value how the Tailwind workflow enables you to implement designs without having to jump between files. The quick feedback loop is great for iteration, if you're experimenting, or for implementing an existing design from a tool like figma. It also removes the step of having to come up with names for every HTML element and lets you focus just on the styling. While the markup may get pretty crowded and might be difficult to navigate you're encouraged to extract components or partials which let you focus on one piece of your design at a time.

### It taught me (web) design fundamentals

This is part of Tailwind's ecosystem rather than the library itself, but following Steve and Adam taught me a lot about design. Their focus in putting out tips of design for developers was right up my alley and I consumed every bit of information they put out on twitter, medium, etc. All these tips eventually turned into Refactoring UI which is a great read if you haven't given it a try.

### It introduced me to the idea of design as a system

Okay kind of. The framework has grown a lot since the 0.7 days when you could say that the limiting set of utilities was a way to enforce design constraints but now a days there's so many utilities that the whole _Tailwind is a design system_ idea might be debatable. Then there's also the introduction of the JIT compiler, which allows you you to create one off utilities on the fly. Still, I'd argue that tailwind defaults push you in the right direction and make it easy for everyone on the project to enforce some design constraints.

### It's easy to jump between projects

Since the utilities remain consistent between older versions and projects, unless you use more semantic names which is generally fine, it's easy to come back to a project and pick up where you left off. This is specially true when it comes to modifying existing components since you can be sure not to break styling anywhere else.

## The future

I'll probably keep using Tailwind on my personal projects. It keeps pushing it's own boundaries so it's also been an interesting journey to keep up with it and what's possible beyond the initial idea of utility classes. But this space is in constant flux, and new paradigms emerge everyday as the web evolves. CSS variables have already unlocked some new approaches such as [Vanilla Extract](https://vanilla-extract.style) which I'm excited to explore for component based frameworks and widespread use of Custom Elements might need a different approach. It is, after all, still an exciting time for being a web developer.
