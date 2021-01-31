---
title: Errores (DRY) en los formularios de Ruby on Rails
date: 2021-01-26
featured_image: /assets/img/articles/omar-nava-LGx6XzKYyv0-unsplash.jpg
featured_image_alt: El desierto de la tatacoa, Colombia
image_caption: <span>Photo by <a href="https://unsplash.com/@omar_nava?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Omar Nava</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
description: DRY up your forms with a little Rails hook that will help you forget about conditionally rendering validation errors inline.
tags:
  - post
  - rails
  - forms
layout: layouts/post.njk
---

Iniciar una nueva aplicación de Ruby on Rails siempre ha sido un placer para mi. Uno puede construir rápidamente el esqueleto de las pantallas que necesita tu app para funcionar, crear los modelos iniciales de base de datos y arrancar a programar la lógica de negocio que, finalmente, es la que genera valor. Siempre he sentido que es una herramienta que _facilita_ el trabajo. Sin embargo,
hay un punto que siempre encuentro difícil, donde los defaults del framework no cumplen del todo con mis espectativas: validación de formularios y manejo de errores. En particular, al mostrar los errores de entrada de los campos.

Si corremos el generador de _scaffold_ de Rails (que es una gran forma de arrancar una app pero no está pensado para código de _producción_), encontraremos en nuestros formularios el siguiente fragmento:

```erb
<div id="error_explanation">
  <h2><%= pluralize(model.errors.count, "error") %> prohibited this model from being saved:</h2>

  <ul>
    <% model.errors.each do |error| %>
      <li><%= error.full_message %></li>
    <% end %>
  </ul>
</div>
```

Lo que esto hace es mostrar en una alerta encima del formulario una lista de los errores encontrados ordenando el nombre del campo, seguido del mensaje de error. Incluso podriamos considerar, ya que esta lógica es bastante genérica, extraerla a una vista parcial aparte y reutilizarla.

![description](/assets/img/articles/lM8pK46.png)

Esta técnica funciona decentemente en formularios con dos o tres campos, pero después de eso le traslada la carga cognitiva de relacionar cada error con su campo correspondiente al usuario.

Sería mucho más claro mostrar los errores de validación junto al campo que falló la validación. Para lograr esto, podríamos incluir un código condicional similar a este para cada campo:

```erb
<%= form.label :email %>
<%= form.text_field :email %>

<!-- Mostrar los errores de validación de email -->
<%= tag.p user.errors["email"].join(", ") if user.errors["email"].any? %>
```

En principio esto cumple con nuestro requerimiento, sin embargo rápidamente se convierte en algo tedioso de escribir para todos los campos. Si alguna vez has trabajado en una aplicación que usara una gema como [Simple Form](https://github.com/heartcombo/simple_form) puedes sentir que estás escribiendo mucho más código en comparación:

```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :email, label: 'Your email please', error: 'Email is mandatory, please specify one' %>
<% end %>`
```

Con esa sóla línea de código, por debajo Simple Form está creando la etiqueta correspondiente, infiriendo el tipo del `input` según el campo de base de datos, mostrando un error condicionalmente y seguramente mucho más.

A pesar de esto tengo dos razones para no incluir Simple Form (o una librería similar) en este proyecto.

La primera es que para el CSS de este proyecto estoy usando [tailwind](https://tailwindcss.com) y los formularios tienen layouts más bien complejos. Al usar un helper como el de simple form, donde las clases del label, input, wrapper se pasan como argumetos adicionales, resulta un poco difícil entender la estructura del html que se va a generar. Adicionalmente, no he logrado que el autocomplete de tailwind funcione en bloques de Ruby:

```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :email,
   label: 'Your email please',
   error: 'Email is mandatory, please specify one',
   wrapper_html:  { class: "mt-2" },
   label_html:  { class: "font-semibold text-gray-800" },
   input_html:  { class: "border border-gray-800 rounded" },
   %>
<% end %>

<!-- vs -->

<%= form_for @user do |f| %>
  <div class="mt-2">
    <label for="user_email" class="font-semibold text-gray-800">Email</label>
    <%= f.input :email, class: "border border-gray-800 rounded" %>
  </div>
<% end %>
```

La segunda, es que como regla autoimpuesta si sólo necesito una _parte_ de la funcionalidad de una gema y yo mismo podría escribirla en un tiempo _razonable_ seguramente lo haré. En este caso sólo me interesa autogenerar los errores.

## Aplicando DRY a los errores de validación

Con este objetivo en mente salí a buscar mejor forma de incluir los errores automáticamente junto a sus respectivos inputs. Empecé inspeccionando el repositorio de Simple Form, pero rápidamente vi que ellos se "enganchan" de todo el formulario, no sólo de los inputs. Eventualmente me topé con este [blog post](https://www.jorgemanrubia.com/2019/02/16/form-validations-with-html5-and-modern-rails/) de Jorge Manrubia. En el artículo jorge nos muestra una forma de extraer la funcionalidad por default del _scaffold_, todos los errores agregados en una alerta, en un inicializador de Rails. De ahí, sólo toma un poquito de trabajo adicional modificar el código para que incluya los mensajes de error debajo de los inputs.

```ruby
# Place this code in a initializer. E.g: config/initializers/field_error.rb

ActionView::Base.field_error_proc = Proc.new do |html_tag, instance_tag|
  fragment = Nokogiri::HTML.fragment(html_tag)
  field = fragment.at('input,select,textarea')

  html = if field
           error_message = instance_tag.error_message.join(', ')
           field['class'] = "#{field['class']} border-red-600 border focus:outline-none"
           html = <<-HTML
              #{fragment.to_s}
              <p class="mt-1 text-sm text-red-600">#{error_message.upcase_first}</p>
           HTML
           html
         else
           html_tag
         end

  html.html_safe
end
```

Since I had a bit of trouble understanding what was going on at first, I'll try to explain it here. This proc is called by Rails action view each time an ActiveModel field, that has validation errors, is rendered. This includes all kind of elements, including labels so the first thing we do is check if we're rendering an input that could have a validation error. If it's any other tag, we just render the html as is. Otherwise, we'll get all the error messagges from the field associated with the instance_tag (I was surprised to find out is exposed on it's public [api](https://api.rubyonrails.org/classes/ActionView/Helpers/ActiveModelInstanceTag.html#method-i-error_message)) and finally append our `<p>` tag with the proper styling and errors below the input.

## Closing thoughts

And there you go! Now we have automatically included a way to conditionally show validation errors on all of our forms without having to write a single line of code. I got to admit it felt a bit hacky at first, but so far I haven't really encountered any issues with this bit of logic and it pairs fairly well with server side validations. So what do you think? Is this a great or terrible idea? Let me know via email if you experiment with it and find any issues.
