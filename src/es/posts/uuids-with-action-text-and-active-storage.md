---
title: UUIDs con Action Text y Active Storage
date: 2021-04-11
featured_image: /assets/img/articles/juan-camilo-guarin-p-57SHaZUAOtQ-unsplash.jpg
featured_image_alt: Loro rojo. Cali, Valle del Cauca, Colombia.
image_caption: Photo by <a href="https://unsplash.com/@jcguarinpenaranda?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Juan Camilo Guarin P</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
description: Configura una nueva instalación de Rails con Postgres, UUIDs, Active Storage y Action Text.
tags:
  - rails
  - postgresql
  - development
layout: layouts/post.njk
---

En este artículo aprenderemos como usar UUIDs por defecto para las llaves primarias de nuestra aplicación Rails usando Postgres, Active Storage y Action Text.

Hace un tiempo Rails sacudió el mundo del desarrollo web mostrándo el poder de la "convención" sobre "configuración". Una de estas convenciones fue que cada tabla tendría una columna `id` que sería numérica y auto incremental. En ese entonces fue un cambio bienvenido y nos liberó de decisiones de cómo debíamos llamar nuestras columnas de primary keys o si debíamos usar llaves naturales o sustitutas.

Con el tiempo vale la pena revisar algunas de las convenciones que se adoptaron originalmente, en este caso, la decisión de usar enteros auto incrementales. Si bien siguen siendo una buena decisión para una gran variedad de aplicaciones hoy en día, se puede argumentar que usar UUIDs es un mejor punto de partida dados los siguientes puntos:

- No exponen información interna de tu sistema
- Hacen imposible acceder a modelos
- Le dan la independencia al frontend de crear nuevos IDs de registro sin necesidad de hacer un viaje de ida y vuelta a la base de datos.

También vale la pena listar algunas de las cosas que se sacrifican al usar UUIDs por default:

- La conveniencia de acceder modelos fácilmente en producción para debugging o tareas esporádicas.
- Lógica de aplicación que maneje casos especiales (no es una buena práctica, pero lo he visto suficientes veces para que valga la pena mencionarlo)
- Asumir una pequeña, pero existente, posibilidad de que se generen conflictos de llaves PKs.

Teniendo en cuenta las consideraciones previas, pienso que vale la pena usar UUIDs por defecto en mis nuevas aplicaciones Rails. Últimamente he estado trabajando en un tablero de empleos en tecnología y quisiera enviar links mágicos que permitan editar los registros sin requerir la creación de cuentas de usuario. Usar una acción de **edit** por defecto con IDs secuenciales está fuera de consideración por motivos de seguridad, por lo que tendría que generar tokens automáticamente. Sin embargo, usando UUIDs la implementación de esta funcionalidad sería trivial.

## Cambiar el default a UUIDs en ActiveRecord

Ya existe un [excelente artículo en inglés](https://pawelurbanek.com/uuid-order-rails) cubriendo los pasos para cambiar una aplicación de Rails 6 y Postgres. Si quieres conocer más en detalle lo que está pasando por detrás para que estos cambios funcionen, recomiendo darle una revisada o si deseas saber cómo migrar tablas existentes en producción a UUIDs. En este artículo, nos enfocaremos en los pasos necesarios para configurar una aplicación nueva.

Lo primero es habilitar la extensión `pgcrypto` de Postgres. Para esto, debemos crear una nueva migración.

```shell
bin/rails g migration enable_pgcrypto
```

```ruby
class EnablePgcypto < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'pgcrypto'
  end
end
```

A continuación, debemos decirle a Rails que cambie el tipo de llave que se va usar en los generadores de Active Record.

```ruby
Rails.application.config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
end
```

En Rails 6 hay una nueva opción de configuración que nos permite controlar la columna por defecto utilizada para ordenar los registros de nuestras tablas. Normalmente usa los IDs, sin embargo al usar UUIDs obtendríamos resultados distintos cada vez lo cuál podría ser confuso para nuestros usuarios, además de que afectaría el comportamiento de métodos como `first` y `last`. Para esto, podemos sobre escribir el atributo `implicit_order_column` de nuestro `ApplicationRecord`.

```ruby
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  self.implicit_order_column = "created_at"
  ...
end
```

Si todo está funcionando correctamente podríamos generar una nueva migración y validar la salida del comando. Siguiendo el ejemplo de una aplicación de empleos con sus respectivos anuncios:

```bash
bin/rails generate model Listing job:references published:boolean
```

La migración resultante de la operación debería verse algo así

```ruby/3
class CreateListings < ActiveRecord::Migration[6.1]
  def change
    create_table :listings, id: :uuid do |t|
      t.references :job, null: false, foreign_key: true, type: :uuid
      t.boolean :published
      t.timestamps
    end
  end
end
```

Como podemos observar, es necesario que las migraciones especifiquen el tipo de columna de las llaves primarias y foráneas. Ya que es fácil olvidar agregar estos parámetros adicionales, mi recomendación es usar los generadores de rails tanto como sea posible y así evitar errores manuales.

## Instalar Active Storage

Ahora que hemos cambiado las opciones por default, podemos continuar con la instalación de Active Storage. Si quieres revisar los detalles completos de configuración puedes revisar la guía oficial [aquí](https://edgeguides.rubyonrails.org/active_storage_overview.html).

Para instalar Active Storage ejecutamos el comando:

```shell
bin/rails active_storage:install
```

Este va a generar un par de archivos de migración, los cuales tenemos que ajustar de forma similar al ejemplo de empleos y anuncios, asegurándonos que los `id`s y referencias a otra tables incluyan el tipo de dato `uuid`.

```ruby/3,15,18,19
class CreateActiveStorageTables < ActiveRecord::Migration[5.2]
  def change
    create_table :active_storage_blobs, id: :uuid do |t|
      t.string   :key,        null: false
      t.string   :filename,   null: false
      t.string   :content_type
      t.text     :metadata
      t.bigint   :byte_size,  null: false
      t.string   :checksum,   null: false
      t.datetime :created_at, null: false

      t.index [ :key ], unique: true
    end

    create_table :active_storage_attachments, id: :uuid do |t|
      t.string     :name,     null: false
      t.references :record,   null: false, polymorphic: true, index: false, type: :uuid
      t.references :blob,     null: false, type: :uuid

      t.datetime :created_at, null: false

      t.index [ :record_type, :record_id, :name, :blob_id ], name: "index_active_storage_attachments_uniqueness", unique: true
      t.foreign_key :active_storage_blobs, column: :blob_id
    end
  end
end
```

## Instalar Action Text

Para este parte seguimos los mismos pasos del punto anterior. Ejecutamos el comando de instalación y ajustamos las migraciones según corresponda.

```shell
bin/rails action_text:install
```

```ruby/5,6
class CreateActionTextTables < ActiveRecord::Migration[6.0]
  def change
    create_table :action_text_rich_texts, id: :uuid do |t|
      t.string     :name, null: false
      t.text       :body, size: :long
      t.references :record, null: false, polymorphic: true, index: false, type: :uuid

      t.timestamps

      t.index [ :record_type, :record_id, :name ], name: "index_action_text_rich_texts_uniqueness", unique: true
    end
  end
end
```

Para completar la instalación de Action Text _no olvides_ completar los demás pasos descritos [aquí](https://edgeguides.rubyonrails.org/action_text_overview.html#installation)

## Conclusiones

Espero que esta guía sirva de referencia para lanzar una nueva aplicación de Rails usando UUIDs, Postgres, Action Text y Active Storage. Es un gran momento para iniciar nuevos proyectos en el mundo de Ruby on Rails y prácticamente todas las aplicaciones web que construyo hoy en día usan este par de gemas en algún punto. Si bien algunas configuraciones por defecto de Rails pueden ser debatibles, es bastante fácil sobre escribirlas y reemplazarlas. Como siempre, si hay alguna duda o comentario respecto al artículo y el procedimiento descrito me pueden contactar por [twitter](https://twitter.com/gafemoyano) o enviándome un correo a [felipe@gafemoyano.com](mailto:felipe@gafemoyano.com).

I hope this will help you get up and running on your new Rails app with UUIDs, Action Text and Active Storage. It's never been a better time to spin off new Rails apps and I've never felt more productive using the framework. It might have some opinions you don't agree with, but they're fairly easy to overwrite and replace with your own. As always, let me know if you try this out and how it went for you on (twitter)[https://twitter.com/gafemoyano] or writing to [felipe@gafemoyano.com](mailto:felipe@gafemoyano.com).
