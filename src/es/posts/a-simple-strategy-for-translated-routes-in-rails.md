---
title: Una estrategia simple para traducir rutas en Ruby on Rails
date: 2020-11-02
featured_image: /assets/img/daniel-vargas-ngrIs67UJEg-unsplash.png
featured_image_alt: Las calles de Guatapé, Antioquia, Colombia
image_caption: <span>Photo by <a href="https://unsplash.com/@danielvargas?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Daniel Vargas</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
description: Una solución simple para desarrollar tu aplicación de Rails en un lenguaje primario distinto al inglés y mantener las convenciones del framework. Sin gemas, ni complicaciones. Únicamente es necesario aprovechar los features que nos provee Rails.
tags:
  - post
  - rails
  - i18n
layout: layouts/post.njk
---

Hace poco empecé un nuevo proyecto personal. Se trata de un listado de trabajos remotos en tecnología. Admito que no es la idea más novedosa que hay, pero no he visto un tablero enfocado en el mercado Colombiano o latino que haya encontrado tracción. Así que decidí hacer el intento y lanzarla yo mismo.

Escogí Rails ya que me siento bastante cómodo con el framework y estaba seguro que la integración con [ActiveStorage](https://edgeguides.rubyonrails.org/active_storage_overview.html) para archivos adjuntos y [ActionText](https://edgeguides.rubyonrails.org/action_text_overview.html) para el editor de texto me ahorrarían una buena parte del trabajo.

Parte de mi hipótesis por la que no existe un buen tablero de trabajos remotos en Latam (a parte de lo complicadísimos que son los sitios existentes) es que están 100% en inglés. Por lo tanto quería que esta app estuviera completamente en español. Si bien Rails tiene un módulo de [i18n](https://guides.rubyonrails.org/i18n.html), siento que está más enfocado en la traducción de textos, sin embargo deja por fuera una parte clave de una app web, la URL.

Adicionalmente, mi objetivo no es tener una aplicación internacionalizada para incluir otros lenguajes a futuro, simplemente quiero que todo lo que esté de cara al usuario esté en español.

Históricamente, he tratado la traducción de URLs en rails de las siguientes formas:

- **Crear los modelos en el lenguaje desado**. Ya que Rails es un framework que se basa principalmente en convenciones, el nombre de las rutas se puede inferir generalmente del nombre de los modelos. El problema, es que ya que las reglas de [inflexión](https://api.rubyonrails.org/classes/ActiveSupport/Inflector.html) están en inglés, tendría que agregar excepciones por cada uno de los modelos de la aplicación y, aún así, hay algunos escenarios en los que las inflexionese no funcionan de la forma que uno esperaría. Finalmente, se me hace confuso tener el código fuente en **spanglish**, por lo tanto preferiría que el código se mantenga principalmente en inglés.

- **Usar una gema** Existen gemas súper completas en el ecosistema para traducciones de rutas. La más notable es [route_translator](https://github.com/enriclluelles/route_translator) que incluso permite manejar varias técnicas de internacionalización para sitios multilingues. Esto me permitiría definir las rutas dentro de un bloque `localized`, configurar español como lenguaje por defecto y definir el nombre de las rutas en un archivo `.yml`. Esta parece una gran opción, sin embargo siento que mi caso de uso es mucho más sencillo. De nuevo, mi idea no es tener un sitio que soporte múltiplese lenguajes y esta gema hace muchísimo más. Me gustaría buscar una solución aún más sencilla.

- **Dejar las URLs en inglés**. Honestamente, esta es la opción por la que he optado la mayoría de las veces en el pasado. A pesar de ir encontra de las buenas prácticas de SEO, en mi experiencia no he visto que tener las URLs en inglés tenga un impacto negativo, siempre y cuando los meta tags y el contenido estén configurados correctamente. Por otro lado, los usuarios no tienden a fijarse en las URLs ni en su lenguaje.

Para este proyecto, ninguna de estas opcionese parecía ideal. Pensé que _debía_ existir una forma más sencilla de lograr traducir URLs. Después de todo, Rails es reconocido por ser un framework modular y flexible (a pesar de que algunas personas no estarían de acuerdo con esta afirmación, en el fondo lo es).

Resulta que _sí_ existe una forma más sencilla y siempre estuvo al frente mio. Se trataba de mirar un poco más de cerca la forma en la que rails maneja la definición de rutas. Al definir un recurso con la directiva `resource`, esta recibe ciertos **kwargs** o **keyword arguments**. Uno de ellos es el argumento **path** que nos permite cambiar el prefijo de la ruta según'lo descrito en la [documentación](https://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper/Resources.html#method-i-resources). En un caso hipotético para un recurso `jobs` podríamos hacer lo siguiente:

```ruby
resources :jobs, path: 'trabajos'
# Generates the following routes:
# jobs	   GET    /trabajos(.:format)
#		   POST   /trabajos(.:format)
# new_job  GET    /trabajos/new(.:format)
# edit_job GET    /trabajos/:id/edit(.:format)
# job 	   GET    /trabajos/:id(.:format)
#	       PATCH  /trabajos/:id(.:format)
#          PUT    /trabajos/:id(.:format)
#	       DELETE /trabajos/:id(.:format)
```

Excelente, por un lado tenemos nuestras rutas de cara a los usuarios en español (en su mayoría) y por otro podemos mantener las referencias internas al código consistentes en inglés.

No obstante, aún nos falta una parte para tener las rutas completamente traducidas. `new` y `edit` todavía están en inglés. Esto lo podemos solucionar fácilmente gracias al argumento `path_name`:

```ruby
resources :jobs, path: 'trabajos', path_names: {new: "nuevo", edit: "editar"}
```

Yendo un paso más allá, podemos aplicar `path_names` a todo un scope, evitando que tengamos que repetirlo en cada ruta que defina la aplicación.

```ruby
scope(:path_names => { :new => 'nuevo', :edit => 'editar' }) do
    resources :jobs, path: 'trabajos'
    resources :tags, path: 'etiquetas'
  end
# new_job  GET    /trabajos/nuevo(.:format)
# edit_job GET    /trabajos/:id/editar(.:format)
```

¡Y eso es todo! ahora todas las URLs están en el lenguaje que deseamos sin incluir dependencias extenas complejas, sacrificar la legibilidad de nuestro código o perder unos hipotéticos puntos de SEO.

Espero que este ejemplo haya servido para ilustrar como una solución simple muchas veces puede ser suficiente y recordarnos que a veces debemos mirar **dentro** de las posibilidades que ofrecen las herramientas que usamos, un lugar de mirar hacia **afuera** e incluir dependencias que cubren más casos de usos de los que necesitamos.
