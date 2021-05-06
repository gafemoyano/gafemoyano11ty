---
title: UUIDs with Action Text and Active Storage
date: 2021-04-11
featured_image: /assets/img/articles/juan-camilo-guarin-p-57SHaZUAOtQ-unsplash.jpg
featured_image_alt: Red parrot. Cali, Valle del Cauca, Colombia.
image_caption: Photo by <a href="https://unsplash.com/@jcguarinpenaranda?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Juan Camilo Guarin P</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
description: Setup a fresh Rails app with Postgres UUIDs, Active Storage and Action Text.
tags:
  - rails
  - postgresql
  - development
layout: layouts/post.njk
---

In this article we'll learn how to use UUIDs as default primary key for a new Rails application using Postgres, Active Storage and Action Text.

Some time ago Rails shook the web development world by showing us the power of relying on convention over configuration. One of these conventions was that every table would have an ID column as primary key, and it would be an auto incremental integer. At the time, it was a very welcomed change. We no longer had to spend time thinking about what to name our primary key columns, if our tables should be named in singular or plural form or if we should use natural or surrogate keys on our tables.

At the time, Rails chose the default to give a surrogate key to every model and make it an incremental ID. Back then, this was mostly taken as a good practice by the community and it's still probably a good enough default for new apps, but nowadays you could make an argument for UUIDs as a better default given:

- They don't expose information about your system
- Accidentally accessing the wrong model by passing it another model's ID
- Frontend independence to create new IDs without a database roundtrip

It's also worth noting the things that we'd be giving up by going all in on UUIDs:

- Convenience to access a particular model in production
- Logic for handling special cases (which you probably shouldn't be doing in your apps but it does happen often enough)
- A very small (but not negligible) chance of key clashes.

Taking into account the previous considerations, I think it's worth it for me to go with UUIDs as default for my future Rails applications. I'm currently working on a job board app and I'd like to allow users to edit job listings by clicking on a magic link sent to their E-mail instead of having to create an account and login. Using the default edit action with a sequential ID was out of the question since it could be guessed easily. With a UUID, I'd practically get this feature for free without having to write any extra code.

## Making UUIDs the new default

There's already a [great article](https://pawelurbanek.com/uuid-order-rails) covering the steps to setup your models with UUIDs on a Rails 6 app and PostgreSQL. I recommend checking it out if you want to know in depth what's going on to make this work, or if you're trying to migrate an existing table with data. For completeness, I'll add the steps here to get us going before moving onto the ActionText and ActiveStorage bits.

Let's start by enabling the `pgcrypto` extension on Postgres. Create a new migration with

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

Next, we configure the rails generators to use UUIDs by default.

```ruby
Rails.application.config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
end
```

From Rails 6 a new configuration option was introduced to control the default ordering column in ActiveRecord. Normally it uses IDs for ordering which would be inconsistent with random UUIDs and could break methods like `last` and `first`. Given that we want to make all tables use UUIDs by default, we can add the following to `ApplicationRecord` to make the change global.

```ruby
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  self.implicit_order_column = "created_at"
  ...
end
```

If everything is wired up correctly, your generators should now pickup the new default. For example, after running the following command to create a new Listing model for my Jobs:

```shell
bin/rails generate model Listing job:references published:boolean
```

The resulting migration should look like this (notice the `:uuid` tags on the table and the reference)

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

As you can see, the migration adapters need to explicitly define that they'll be using `uuid` as primary key. It's easy to forget to add the extra arguments if you're doing migrations manually, so I generally try to always run the generators to avoid these kind of manual errors.

## Installing Active Storage

Now that we've changed our defaults, we can move on to installing Active Storage. If you want to read the full details of the setup, I recommend checking out the official rails guides [here](https://edgeguides.rubyonrails.org/active_storage_overview.html).

The first step is to run the following command:

```shell
bin/rails active_storage:install
```

This will generate a couple of migration tables. We now need to adjust the ActiveStorage migrations to look like the one on our listing model, making sure we adjust the table's `id` type and the references as well:

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

## Installing Action Text

Same story for Action Text. Let's run the installation script and modify the corresponding migration.

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

Don't forget to follow the rest of the installation steps for Action Text [here](https://edgeguides.rubyonrails.org/action_text_overview.html#installation)

## Closing thoughts

I hope this will help you get up and running on your new Rails app with UUIDs, Action Text and Active Storage. It's never been a better time to spin off new Rails apps and I've never felt more productive using the framework. It might have some opinions you don't agree with, but they're fairly easy to overwrite and replace with your own. As always, let me know if you try this out and how it went for you on (twitter)[https://twitter.com/gafemoyano] or writing to [felipe@gafemoyano.com](mailto:felipe@gafemoyano.com).
