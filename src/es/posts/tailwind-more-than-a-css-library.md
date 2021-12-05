---
title: "Tailwind: más que un framework de CSS"
date: 2020-11-02
featured_image: /assets/img/daniel-vargas-ngrIs67UJEg-unsplash.png
featured_image_alt: Minca, Atlántico, Colombia
image_caption: Photo by <a href="https://unsplash.com/@showingourplanet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Niels van Altena</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

description: "Tailwind es mucho maś que librería de CSS. Es un ecosistema de material de aprendizaje de CSS y diseño web."
tags:
  - post
  - tailwind
  - css
  - web-design
layout: layouts/post.njk
---

## Intro

Hace un buen tiempo que he sido un fiel usuario de [Tailwind](https://tailwindcss.com) y siento que en los últimos días se ha disparado en popularidad en el mundo del desarrollo web. Es una librería excelente y me encanta verla triunfar dado el mucho valor que le he sacado personalmente. Entre tanto se han publicado varios artículos acerca de sus ventajas y desventajas del lado técnico, sin embargo muchas de las razones por las cuales me siento tan adepto (incluso agradecido) a Tailwind son más personales que otra cosa y quisiera compartirlas en este artículo.

## Como Tailwind llegó a mi

En el 2016 estaba desarrollando una nueva aplicación web para consumidores con mis socios en [Savy](https://savy.co). En ese entonces no tenía mucha idea de como hacer una página visualmente agradable pero sabía que [Bootstrap](https://getbootstrap.com) era un buen punto de partida para tener unos textos y colores por defecto junto a algunos componentes de UI. Rápidamente me topé con escenarios en los que quería modificar los estilos por defecto de algunos componentes como la barra de navegación y las tarjetas. Para mi agradable sorpresa, esta versión de Bootstrap incluía algunas clases de utilidad, como `mb-5`, `px-4` and `bg-primary` que permitían personalizar los componentes sin salir del HTML. Sumando a esto otras clases para manejar color, posicionamiento y presentación me dí cuenta que podía lograr el `80%` de lo que necesitaba para maquetación sin escribir CSS adicional.

Desde ese momento quedé enganchado en usar clases de utilidad, pero quería llegar más allá ese `80%`, quería poder hacer mucho más con clases atómicas, lo que últimamente me llevó a Tailwind v0.7 (si no estoy mal). Así empezó una de las relaciones más largas que he tenido en mi carrera con una librería, pero el cambio más importante para mi aún estaba por descubrirlo, gracias a Tailwind. El inicio de mi amor por el Diseño Web.

## 5 cosas que aprendí usando Tailwind

Si bien es indiscutible que hay una cantidad inmensa de trabajo detrás de Tailwind, la librería, también es cierto que hay tanto o más trabajo detrás del ecosistema de recursos que construyeron sus creadores. Desde la excelente [documentación de la librería] (https://tailwindcss.com), [los streams](https://www.youtube.com/c/AdamWathan) donde construyen UIs complejas con Tailwind, [los tips de diseño](https://twitter.com/i/events/879086180909764608?lang=en) en Twitter y hasta un [libro de diseño para desarrolladores](https://www.refactoringui.com/book) se encargaron de crear todo un ecosistema de herramientas y materiales de aprendizaje para triunfar no solo en el uso de la herramienta sino en Diseño Web como disciplina.

### Me enseñó a pensar en CSS

Para este punto llevaba usando y escribiendo CSS por años, pero creo que nunca lo había _entendido_ realmente. Debo agradecerle a la documentación de Tailwind finalmente haber entendido `flexbox` y todas sus propiedades. Los fragmentos de código y ejemplos visuales me ayudaron tremendamente a crear el modelo mental y retenerlo. No sucedió de un día para otro, pero poco a poco la necesidad de tener la documentación abierta como referencia me obligó a aprender las primitivas necesarias para implementar un diseño.

Esto fue un punto de quiebre para mi. Tener la habilidad de ver un diseño y descomponer las distintas propiedades necesarias para implementarlo abrió, de repente, todo un mundo de posibilidades de exploración y creatividad.

### Me enseñó a ser dueño de mis estilos de aplicación

Anteriormente cambiar los estilos de una aplicación existente se sentía completamente intimidante. No era sólo la falta de conocimiento, hacer cambios en hojas de estilos podía tener resultados muy inesperados. En consecuencia, siempre tuve la sensación de estar adivinando y esperando que no ocurriera nada que afectara el diseño en un lugar sorpresivo. Con Tailwind, a pesar de que en principio puede ser difícil interpretar elementos HTML con muchas clases, tenemos la seguridad que los cambios que se realizan afectan únicamente los elementos que están en la plantilla. Por lo tanto, eres libre de editar todo lo que quieras sin temor de dañar el diseño de la aplicación.

### Me ayudó a ser más productivo

El workflow de tailwind es uno de los más rápidos que conozco (aparte de contar con un sistema de diseño personalizado) para implementar prototipos de diseño rápidamente. Eliminar el paso de tener que saltar entre archivos de CSS y HTML evita estar cambiando de contexto y puedes explorar dentro del mismo archivo distintas posibilidades. Por otro lado, no tener que ponerle nombre a las clases de cada elemento ahorra varios ciclos de pensamiento que ahora

I place a lot or value around how the tailwind workflow enables you to quickly try out designs without having to jump between files. This is specially true for web design projects such as landing pages and marketing sites although it can get pretty repetitive on web apps that have more component reuse across the board. I also find it relatively straight forward to implement someone else's design, which is a big win for teams that have designers working in Figma.

### It taught me (web) design fundamentals

This is part of Tailwind's ecosystem rather than the library itself, but following Steve and Adam taught me a lot about design. Their focus in putting out tips of design for developers was right up my alley and I consumed every bit of information they put out on twitter, medium, etc. All these tips eventually turned into Refactoring UI which is a great read if you haven't given it a try.

### It introduced me to the idea of design as a system

Okay kind of. The framework has grown a lot since the 0.7 days when you could say that the limiting set of utilities was a way to enforce design constraints but now a days there's so many utilities that the whole _Tailwind is a design system_ idea might be debatable. Then there's also the introduction of the JIT compiler, which allows you you to create one off utilities on the fly. Still, I'd argue that tailwind defaults push you in the right direction and make it easy for everyone on the project to enforce some design constraints.

### It's easy to jump between projects

Since the utilities remain consistent between older versions and projects, unless you use more semantic names which is generally fine, it's easy to come back to a project and pick up where you left off. This is specially true when it comes to modifying existing components since you can be sure not to break styling anywhere else.

## The future

I'll probably keep using Tailwind on my personal projects. It keeps pushing it's own boundaries so it's also been an interesting journey to keep up with it and what's possible beyond the initial idea of utility classes. But this space is in constant flux, and new paradigms emerge everyday as the web evolves. CSS variables have already unlocked some new approaches such as [Vanilla Extract](https://vanilla-extract.style) which I'm excited to explore for component based frameworks and widespread use of Custom Elements might need a different approach. It is, after all, still an exciting time for being a web developer.
