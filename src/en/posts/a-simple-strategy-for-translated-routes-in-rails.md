---
title: A Simple Strategy for Translated Routes in Rails
date: 2020-11-02
featured_image: /assets/img/daniel-vargas-ngrIs67UJEg-unsplash.png
featured_image_alt: The streets of Guatapé, Antioquia, Colombia
image_caption: <span>Photo by <a href="https://unsplash.com/@danielvargas?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Daniel Vargas</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
description: Sometimes you want your Rails app to be in another language. This doesn't mean you want to bring a full on i18n solution. Lets try to solve this using only what the framework provides.
tags:
  - post
  - rails
  - i18n
layout: layouts/post.njk
---

Recently I've been working on a new project, a job board focused on remote offerings. Admittedly this is not a novel idea, however I haven't seen anything like this targeted to the local job market in Colombia. My guess is that remote offerings are not that popular here (yet) and that most of the existing boards out there are not in spanish so I decided to give it a try.

I decided to go with Rails for the stack since it would allow me to leverage [ActiveStorage](https://edgeguides.rubyonrails.org/active_storage_overview.html) for file uploads and [ActionText](https://edgeguides.rubyonrails.org/action_text_overview.html) for rich text editing, both of which I was going to need at some point for this.

My hypothesis is that current remote job boards haven't caught on due to them being on a foreign language, so I want this app to be completely in spanish. Rails comes with built in [i18n](https://guides.rubyonrails.org/i18n.html), however it is targetted at content and does not cover one piece of the app, the URL. Also, I'm not really looking to internationalize this app I just want the public routes not to be in english.

Also, I'm not really looking to support multiple languages or internationalize this app, I just want the public facing routes not to be in english.

In the past, I've dealt with this in the following ways:

- **Create your domain models in the target language** Since Rails is convention based, you can just create your models in spanish and by convention the routes themselves will be in spanish too. The downside, is that you'd have to start adding exceptions to Rails' [inflector](https://api.rubyonrails.org/classes/ActiveSupport/Inflector.html) so that it pluralizes your models correctly and even if you do there are still edge cases where it doesn't work as expected. Also, the rest of Rails is still in english, so you end up reading code with words mixed up in two languages. I'd rather keep all the code in english.

- **Bring in an external gem**. There's some great gems out there for handling route translations. Most notable of them is [route_translator](https://github.com/enriclluelles/route_translator) which can handle multiple use cases for multilingual sites. This would allow me to set spanish as the default locale and wrap all my routes in a `localized` block. This seems like a good option, but it also feels like this gem does way more than what I actually need. I'd like a simpler solution, if possible.
- **Ignore the URLs and let them be in english** This is what I've done most of the time. Despite common SEO advice I haven't seen much impact on having two routes be in english and user's don't really notice the URL or what language it's in.

None of this options seemed very satisfying to me. There **must** be a simpler way to achieve this. After all, Rails is known for being a modular and flexible framework, although some people might argue with this statement.

Turns out there **is** a simpler way and it had been in front of me all along. I just needed to take a closer look into how rails routing works. When you define a resource or route in rails, it can take some keyword arguments. One of them is `path`, which according to the [docs](https://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper/Resources.html#method-i-resources) it allows you to change the path prefix of the resource. So we could do something like:

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

That's great, on the one hand we have now have our user facing routes (mostly) in Spanish and on the other hand we get to keep our code consistent by referring to the models in English in our route helpers.

What about `new` and `edit`? Well it turns out that Rails also has an option to override those with the `path_names` keyword:

```ruby
resources :jobs, path: 'trabajos', path_names: {new: "nuevo", edit: "editar"}
```

Furthermore, we could avoid having to pass `path_names` to every resource by defining a scope at the top of our routes:

```ruby
scope(:path_names => { :new => 'nuevo', :edit => 'editar' }) do
    resources :jobs, path: 'trabajos'
    resources :tags, path: 'etiquetas'
  end
# new_job  GET    /trabajos/nuevo(.:format)
# edit_job GET    /trabajos/:id/editar(.:format)
```

And there you go! now every part of the URL should be in your language of choice, withouot having to include complex external dependencies or sacrificing hypothetical SEO points.

I hope this simple example is useful enough to illustrate that sometimes a simple solution might be enough and you sometimes have to look **into** the framework and the options it provides, instead of **outside** for dependencies that often include broader use cases.
