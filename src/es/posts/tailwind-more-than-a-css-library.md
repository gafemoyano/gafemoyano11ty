---
title: "Tailwind: más que un framework de CSS"
date: 2021-12-20
featured_image: /assets/img/daniel-vargas-ngrIs67UJEg-unsplash.png
featured_image_alt: Minca, Atlántico, Colombia
image_caption: Foto por <a href="https://unsplash.com/@showingourplanet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Niels van Altena</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

description: "Tailwind es maś que librería de CSS. Es un ecosistema de material de aprendizaje de CSS y diseño web."
tags:
  - post
  - tailwind
  - css
  - web-design
layout: layouts/post.njk
---

## Intro

Hace un buen tiempo que he sido un fiel usuario de [Tailwind](https://tailwindcss.com) y siento que en los últimos días se ha disparado en popularidad en el mundo del desarrollo web. Es una librería excelente y me encanta verla triunfar dado el mucho valor que le he sacado personalmente. Entre tanto se han publicado varios artículos acerca de sus ventajas y desventajas del lado técnico, sin embargo muchas de las razones por las cuales me siento tan adepto (incluso agradecido) a Tailwind son más personales que otra cosa y quisiera compartirlas en este artículo.

## Como empezó todo

En el 2016 estaba desarrollando una nueva aplicación web para consumidores con mis socios en [Savy](https://savy.co). En ese entonces no tenía mucha idea de como hacer una página visualmente agradable pero sabía que [Bootstrap](https://getbootstrap.com) era un buen punto de partida para tener unos textos y colores por defecto junto a algunos componentes de UI. Rápidamente me topé con escenarios en los que quería modificar los estilos por defecto de algunos componentes como la barra de navegación y las tarjetas. Para mi agradable sorpresa, esta versión de Bootstrap incluía algunas clases de utilidad, como `mb-5`, `px-4` and `bg-primary` que permitían personalizar los componentes sin salir del HTML. Sumando a esto otras clases para manejar color, posicionamiento y presentación me dí cuenta que podía lograr el `80%` de lo que necesitaba para maquetación sin escribir CSS adicional.

Desde ese momento quedé enganchado en usar clases de utilidad, pero quería llegar más allá ese `80%`, quería poder hacer mucho más con clases atómicas, lo que últimamente me llevó a Tailwind v0.7 (si no estoy mal). Así empezó una de las relaciones más largas que he tenido en mi carrera con una librería, pero el cambio más importante para mi aún estaba por descubrirlo, gracias a Tailwind. El inicio de mi amor por el Diseño Web.

## Más que una librería

Si bien es indiscutible que hay una cantidad inmensa de trabajo detrás de Tailwind, la librería, también es cierto que hay tanto o más trabajo detrás del ecosistema de recursos que construyeron sus creadores. Desde la excelente [documentación de la librería] (https://tailwindcss.com), [los streams](https://www.youtube.com/c/AdamWathan) donde construyen UIs complejas con Tailwind, [los tips de diseño](https://twitter.com/i/events/879086180909764608?lang=en) en Twitter y hasta un [libro de diseño para desarrolladores](https://www.refactoringui.com/book) se encargaron de crear todo un ecosistema de herramientas y materiales de aprendizaje para triunfar no solo en el uso de la herramienta sino en Diseño Web como disciplina.

### Me enseñó las primitivas de CSS

Para este punto llevaba usando y escribiendo CSS por años, pero creo que nunca lo había _entendido_ realmente. Debo agradecerle a la documentación de Tailwind finalmente haber entendido `flexbox` y todas sus propiedades. Los fragmentos de código y ejemplos visuales me ayudaron tremendamente a crear el modelo mental y retenerlo. No sucedió de un día para otro, pero poco a poco la necesidad de tener la documentación abierta como referencia me obligó a aprender las primitivas necesarias para implementar un diseño.

Esto fue un punto de quiebre para mi. Tener la habilidad de ver un diseño y descomponer las distintas propiedades necesarias para implementarlo abrió, de repente, todo un mundo de posibilidades de exploración y creatividad.

### Permitió apropiarme de los estilos de mis aplicaciones

Anteriormente cambiar los estilos de una aplicación existente se sentía completamente intimidante. No era sólo la falta de conocimiento, hacer cambios en hojas de estilos podía tener resultados muy inesperados. En consecuencia, siempre tuve la sensación de estar adivinando y esperando que no ocurriera nada que afectara el diseño en un lugar sorpresivo. Con Tailwind, a pesar de que en principio puede ser difícil interpretar elementos HTML con muchas clases, tenemos la seguridad que los cambios que se realizan afectan únicamente los elementos que están en la plantilla. Por lo tanto, eres libre de editar todo lo que quieras sin temor de dañar el diseño de la aplicación.

### Me hizo más productivo

Personalmente valoro mucho el flujo de trabajo de Tailwind y la forma en la que permite implementar diseños sin saltar entre archivos. Tener retroalimentación casi instantánea de los estilos evitando tener que cambiar entre archivos de HTML y CSS es fantástico tanto para experimentar con un nuevo diseño como para implementar uno existente desde una herramienta como figma. También elimina la necesidad de crear nombres para cada clase o componente HTML lo que permite concentrarse únicamente en los estilos. Aunque es cierto que las plantillas se pueden congestionar un poco de clases, Tailwind promueve la idea de extraer parciales/componentes en sus propios archivos lo que permite enfocarse en un elemento a la vez.

### Me enseñó fundamentos de diseño

Esta parte corresponde más al ecosistema de Tailwind que a la librería en sí, pero seguir a sus creadores y promotores iniciales me enseñó muchos conceptos básicos de diseño que jamás había aprendido como desarrollador. Los numerosos tips de Steve en [twitter](https://twitter.com/i/events/994601867987619840) me ayudaron a entender los principios de diseño para construir interfaces gráficas funcionales y agradables. Adicionalmente los _screencasts_ de Adam en [youtube](https://www.youtube.com/c/AdamWathan) eran una lección de como implementar un gran diseño en Tailwind y, al ser una herramienta de bajo nivel, en CSS. Estos recursos fueron invaluables en mi trayectoria como desarrollador web y eventualmente como emprendedor.

### Me mostró el valor de un sistema de diseño

Más o menos, este punto puede sonar un poco forzado. La idea de un Sistema de Diseño va mucho más allá que los tokens, además el framework ha crecido mucho desde los días de la versión 0.7 donde el set limitado de utilidades se podía considerar una ventaja para la consistencia. Sin embargo, la configuración por defecto de Tailwind te encamina en la dirección correcta: tener tokens para los espacios, colores, bordes y tipografías con valores por defecto excelentes son un punto de partida excelente para cualquier aplicación. No considero que Tailwind por sí solo cuente como un sistema de diseño (tampoco es uno de sus objetivos) pero definitivamente es un primer paso.

## El futuro

Probablemente seguiré usando Tailwind en mis proyectos personales. La librería sigue empujando los límites de la técnica del CSS atómico y clases de utilidad. Sin embargo, este espacio de CSS está en flujo constante y nuevos paradigmas y herramientas emergen cada año a medida que la plataforma web evoluciona. La adopción de variables CSS por los navegadores principales dieron paso a nuevas librerías como [Vanilla Extract](https://vanilla-extract.style) o [Stitches](https://stitches.dev/)las cuales se ven prometedoras para el desarrollo de Sistemas de Diseño. Después de todo, sigue siendo una época emocionante para ser un desarrollador web.
