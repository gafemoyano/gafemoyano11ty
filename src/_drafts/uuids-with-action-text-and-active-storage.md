---
title: UUIDs with Action Text and Active Storage
date: 2021-02-11
featured_image: /assets/img/berend-leupen-hbHKEB5m2xE-unsplash.png
featured_image_alt: Tayrona National Park, Magdalena, Colombia
image_caption: <span>Photo by <a href="https://unsplash.com/@bcleupen?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Berend Leupen</a> on <a href="https://unsplash.com/s/photos/colombia?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
description: "Kick off your new Rails application with Active Storage, Action Text and UUIDs for primary keys as default."
tags:
  - post
  - rails
  - action-text
  - active-storage
layout: layouts/post.njk
---

In this article we'll learn how to use UUIDs as default primary key for a new Rails application using PostgreSQL, ActiveStorage and ActionText.

## The trade offs between UUIDs and incremental ids

Some time ago Rails shook the web development world by showing us the power of relying on convention over configuration. One of these conventions was that every table would have an ID column as primary key, and it would be an auto incremental integer. At the time, it was a very welcomed change. We no longer had to spend time thinking about what to name our primary key columns, if it was going to be a capital `ID` or a lowercase `Id`, or if maybe another field was better suited to serve as primary key.

Nowadays, however, I think you could make an argument in favor of UUIDs as a better default for primary keys. There's plenty of other articles online that cover the pros vs cons, but to summarize some of the benefits are:

- They don't expose information about your system
- Accidentally accessing the wrong model by passing it another model's ID
- Frontend independence to generate IDs without talking to the Database

On the other hand, it's also worth considering what we'd be giving up with sequential IDs:

- Convenience to access a particular model in production
- Handling special cases (yeah, I've seen Jobs/Backend services implement special logic depending on specific ids, specially for multi tenant apps)
- It's the default in Rails, so it just works

## The use case

All things considered, I believe it's worth having a valid use case to go out of our way to override a default. I'm currently working on Job Board app and I'd like to allow users to edit job listings by clicking on a magic link sent to their E-mail instead of having to create an account and login. Using the default edit action with a sequential ID was out of the question since it could be guessed easily. With a UUID, I'd practically get this feature for free without having to write any extra functionality.

## Changing the default Primary Key type

There's already a [great article](https://pawelurbanek.com/uuid-order-rails) covering the steps to setup your models with UUIDs on a Rails 6 app and PostgreSQL. I recommend checking it out if you want to know in depth what's going on to make this work, or if you're trying to migrate an existing table with data. For completeness, I'll add the steps here to get us going before moving onto the ActionText and ActiveStorage bits.

First, let's start by enabling the `pgcrypto` extension on PostgreSQL

```ruby
class EnableUuid < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'pgcrypto'
  end
end
```

Next, we configure the rails generators to use UUIDs by default

```ruby
Rails.application.config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
end
```

From Rails 6 a new configuration option was introduced to control the default default ordering column in ActiveRecord. The default is to rely on IDs for ordering which would no longer work with random UUIDs and would break methods like `last` and `first`. Given that we want to make all tables use UUIDs by default, we can add the following to `ApplicationRecord`

```ruby
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  self.implicit_order_column = "created_at"
  ...
end
```

If everything is wired up correctly, Rails generators should now pickup the new default. For example, after running the following command to create a new Listing model for my Jobs:

```shell
bin/rails generate model Listing job:references published:boolean
```

The resulting migration should look like this (notice the `:uuid` tags on the table and the reference)

```ruby
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

As you can see, the migration adapters need to explicitly define the type as `uuid` for the primary key. It's easy to forget to add the extra arguments if you're doing migrations manually, so I try to always use generators when defining new models to avoid these kind of errors.

## Installing Active Storage

Now that we've changed our defaults, we can move on to installing Active Storage. If you want to read the full details of the setup, I recommend checking out the offical rails guides [here](https://edgeguides.rubyonrails.org/active_storage_overview.html).

The first step is to run the following command:

```shell
bin/rails active_storage:install
```

This will generate a migration with two tables. We need to adjust the ActiveStorage migrations to look like the one on our listing model, making sure we adjust the table's `id` type to `uuid` and the reference fields as well:

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

For action text we'll follow the same steps. First, lets run the installation script:

```shell
bin/rails action_text:install
```

And modify the migration accordingly:

```ruby/3,6
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

Don't forget to follow the rest of the installation steps [here](https://edgeguides.rubyonrails.org/action_text_overview.html#installation)

## Closing thoughts

I hope this will help you get up and running on your new Rails app with UUIDs, ActionText and ActiveStorage. It's never been a better time to spin off new Rails apps and I've never felt more productive using the framework. It might have some opinions you don't agree with, but they're fairly easy to overwrite and replace with your own. As always, let me know if you try this out and how it went for you on [twitter](https://twitter.com/gafemoyano) or writing to [felipe@gafemoyano.com](mailto:felipe@gafemoyano.com)
