---
title: "De Tailwind a Vanilla Extract: la herramienta correcta para un Sistema de Diseño"
date: 2022-06-14
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

## Introducción

Recientemente empecé a trabajar en una organización cuyo modelo es un buen fit para implementar su propio Sistema de Diseño. A pesar de que aún está en una etapa temprana del ciclo de producto y que la capacidad del equipo es limitada, decidimos extraer unos componentes de UI base que sirvieran de fundación para un Sistema de Diseño.

El plan consistió en construir las pantallas de funcionalidades e ir extrayendo componentes comunes de UI a medida que se fueran revelando. Esta aproximación permite tener un buen balance entre el tiempo invertido en extraer componentes reutilizables y al mismo tiempo avanzar en la implementación del MVP.

## Extracción de componentes de Tailwind

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

## Cambio a Vanilla Extract

Dados los puntos anteriores sentimos que estabamos forzando los casos de uso de tailwind y deberíamos cambiar la herramienta base de nuetra creciente librería de componentes. Idealmente buscamos algo que permitiera el uso de tokens de diseno directamente como propiedades de React. Vanilla Extract permite hacer esto a través del aditamento de Sprinkles además de tener un gran soporte de Typescript.

**La transición**

Decidimos hacer un cambio progresivo y convertir un componente a la vez a medida que ibamos necesitando agregar funcionalidad a la librería. Hacer la instalación inicial es relativamente fácil sin embargo fue útil tener las implementaciones de referencia de [Shopify's Polaris](https://github.com/Shopify/foundational-design-system-proto) and [Seek's Braid](https://github.com/seek-oss/braid-design-system) ya que era necesario escribir código adicional para exponer las clases de utilidad como propiedades de React.

**Las cosas buenas**

Al ser una librería basada en Typescript los consumidores cuentan con autocompletar y los autores con chequeo de errores de tipo. Esto agrega una capa adicional de confianza al equipo para evolucionar el Sistema de Diseno y evitar errores en componentes de aplicación.

El modelo mental de Vanilla Extract es diferente a Tailwind ya que este último te guía a construir toda la aplicación a partir de claes de utilidad mientras que el primero te lleva a definir clases atómicas para los estilos más comunes y recurrir a `CSS in TS para complementar los estilos más complejos. En la práctica esta mezcla permite aprovechar el modelo de composición de React y partir de unos componentes base que reciben propiedades de bajo nivel y reutilizarlos para construir componentes más complejos.

Vanilla Extract nos permitió definir componentes de bajo nivel que se puedan reutilizar para construir unos más complejos. [Dessert Box](https://github.com/TheMightyPenguin/dessert-box) fue una gran librería para exponer las variables del tema en un cpomponente genérico `Box` o `Div`. Con estos bloques base pudimos desarrollar nuevos elementos como `Flex`, `Grid`, `Card`, `Button` y otros.

Estos componentes podían ser utilizados en nuevas funcionalidades o incluso para reimplementar algunos componentes base escritos con Tailwind. Ya que Vanilla Extract tiene soporte para variantes, pudimos simplificar la lógica condicional para aplicar clases según las propiedades del componente. Si el componente es particularmente compleja, los archivos `.css.ts` son un lugar natural para alojar la lógica de estilos.

**Las cosas no tan buenas**

Anteriormente mencioné el problema de lidiar con PurgeCSS para crear clases dinámicamente. La comparación es un poco injusta, ya que Vanilla Extract no tiene ningún tipo de limpieza de CSS inutilizado. La diferencia es que Vanilla Extract no pretende que _toda_ la aplicación sea escrita con clases de utilidad sino las propiedades más comunes, por lo que en la práctica es poco probable que el tamaño del CSS atómico sea problemático.

Aunque una de las propuestas iniciales de valor de Vanilla Extract es que es más cercano a CSS que otras librerías, haciéndolo más accesible para diseñadores (como SASS), todavía es muy temprano para saber si ese será el caso. Hasta ahora los archivos de `css.ts` parecen más Typescript que una hoja de estilos. Contar con el poder de un lenguaje de programación es una ventaja para desarrolladores pero idealmente la responsabilidad del sistema de diseño se comparte con el equipo de diseñadores y estos estilos se pueden sentir un poco abrumadores al principio:

```typescript
// Un ejemplo de un archivo css.ts.
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

La restricción más importante de Vanilla Extract hasta el momento es el límite de una variante por propiedad. En tailwind es posible tener varios modificadores para una propiedad, por ejemplo es posible escribir `hover:text-lg` y `md:text-lg` al mismo tiempo. Con Sprinkles estamos limitados a escoger una de las dos condiciones para las variantes de clases de utilidad. Sin embargo, como mencioné anteriormente, Vanilla Extract no fomenta el uso de utilidades para todos los estilos por lo que la forma de evitar este problema, de nuevo, es usando los archivos `css.ts` en estos casos.

## Conclusiones

Este artículo no pretende ser una crítica contra Tailwind. Aunque sabíamos desde el principio que podía no ser la mejor elección para construir una librería de componentes, nos permitió construir la primera iteración del producto dado el tamaño del equipo y sus habilidades. De todas formas considero valioso escribir acerca de la experiencia de enfrentarse a las limitaciones que se pueden encontrar con estas librerías en el contexto de un producto real ya que muchas veces los artículos comparativos se enfocan en casos de uso superficiales que no alcanzan a dar una foto completa de las ventajas y desventajas de una librería.

En una nota personal, estoy muy impresionado con Vanilla Extract y considero que la estaré usando como default en proyectos que ameriten una arquitectura de UI basada en componentes, mientras reservo a Tailwind como herramienta por defecto para sitios web que generan el HTML desde el servidor. Siento que Vanilla Extract aún está en sus inicios y me emociona ver como evoluciona a futuro y se integra con nuevos tecnologías como Web Components.
