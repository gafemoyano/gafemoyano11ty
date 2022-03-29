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

**No es ergonómico traducir clases de tailwind a propiedades de React**

Una de las primeras decisiones a las que nos enfrentamos es de qué forma exponer propiedades de estilos para los componentes compartidos. Por ejemplo, supongamos que tenemos un component que recibe una propiedad de _background_ para cambiar su color de fondo. ¿Los consumidores del componentes deberían pasar la clase de tailwind o el nombre del color? El primero se siente extraño pues estaríamos repitiendonos un poco `background="bg-blue-400"`. El segundo le deja al componente la responsabilidad de reconstruir la clase apropiada para aplicar el color de fondo, además de traer otros problemas adicionales que discutiremos en otro punto.

```javascript
// Esto se siente extraño
function Card({ background = "bg-white", ...rest }) {
  return <div className={background} {...rest} />
}

// Esto necesita trabajo adicional para cada propiedad
function Card({ background = "white", ...rest }) {
  const backgroundClass = `bg-${background}` // No type safety

  return <div className={topSpace} {...rest} />
}
```

Esto aplica para todas las propiedades de estilos que se quieran exponer del componente y se convierte en una tarea abrumadora rápidamente

**Debes sincronizar manualmente las propiedades de los componentes con el archivo de configuración de Tailwind**

Ya que no existe una integración entre Tailwind y React, en el sentido que ambos coexisten sin la noción del otro, cada vez que se cambie la configuración de Tailwind debemos recordar actualizar las propiedades de los distintos componentes que la consumen. Este paso es fácil de olvidar y puede llevar a estilos y propiedades desactualizados.

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

**Construir clases dinámicamente no permite purgar o generar (con JIT) las clases en producción**

En un punto anterior comenté que interpolar texto con valores de Tailwind se siente un poco incómodo, sin embargo hay un problema adicional, las clases generadas de esta forma no serán generadas por el JIT y puede que en producción falten algunos estilos esperados. Esto puede ser un poco confuso pero tiene una solución sencilla, incluir un _whitelist_ de las clases que se deben incluir en el bundle.

```javascript
function Spacer({ top = "16", ...rest }) {
  const topSpace = `mt-${top}` // mt-16 no va a estar incluida en el bundle de producción 
  return <div className={topSpace} {...rest} />
}
```

**Deduplicación y especificidad de clases CSS**

Al momento de sobreescribir o modificar las clases base de un componente y asegurarnos que no se incluyan 2 clases que modifiquen una misma propiedad estamos por nuetra cuenta. Generalmente los componentes de un sistema de diseno aplican algunos estilos por defecto y exponen algunas propiedades para modificar su apariencia o comportamiento. Escribir la lógica condicional para hacer funcionar todo esto está en nuetras manos y en algunos componentes complejos puede llegar a ser un poco compleja.

**There's no good way to break out of tailwind**

Probablemente llegará el momento en el que tengas que implementar alguna funcionalidad más allá de las utilidades de tailwind. La alternativa más común acá es usar clases sencilla de CSS y la utilidad de `@apply` para tener acceso a los tokens existentes. Si bien esto funciona en mi experiencia es difícil notar que se está haciendo algo 'personalizado' ya que `classNames` está sobrecargado de utilidades y es difícil ver que se agregó una clase 'custom' que, como implementador, preferiría que fuera algo que se destaca al consultar el código.


## Switching to Vanilla Extract

Dados los puntos anteriores sentimos que estabamos forzando los casos de uso de tailwind y deberíamos cambiar la herramienta base de nuetra creciente librería de componentes. Idealmente buscamos algo que permitiera el uso de tokens de diseno directamente como propiedades de React. Vanilla Extract permite hacer esto a través del aditamento de Sprinkles además de tener un gran soporte de Typescript.

**The switch**

Decidimos hacer un cambio progresivo y convertir un componente a la vez a medida que ibamos necesitando agregar funcionalidad a la librería. Hacer la instalación inicial es relativamente fácil sin embargo fue útil tener las implementaciones de referencia de [Shopify's Polaris](https://github.com/Shopify/foundational-design-system-proto) and [Seek's Braid](https://github.com/seek-oss/braid-design-system) ya que era necesario escribir código adicional para exponer las clases de utilidad como propiedades de React.

**The good things**

Al ser una librería basada en Typescript los consumidores cuentan con autocompletar y los autores con chequeo de errores de tipo. Esto agrega una capa adicional de confianza al equipo para evolucionar el Sistema de Diseno y evitar errores en componentes de aplicación. 

El modelo mental de Vanilla Extract es diferente a Tailwind ya que este último te guía a construir toda la aplicación a partir de claes de utilidad mientras que el primero te lleva a definir clases atómicas para los estilos más comunes y recurrir a `CSS in TS para complementar los estilos más complejos. En la práctica esta mezcla permite aprovechar el modelo de composición de React y partir de unos componentes base que reciben propiedades de bajo nivel y reutilizarlos para construir componentes más complejos.

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
