---
layout: layouts/post.njk
title: Integration Testing Remix Routes with Vitest
date: 2023-09-26T01:32:39.133Z
featured_image: /assets/img/richard-brunsveld-obhu9aanm_4-unsplash-1-.jpg
featured_image_alt: Fishermen near Santa Marta, Colombia with the Sierra Nevada
  mountains in the distance.
image_caption: 'Photo by <a
  href="https://unsplash.com/@richardbrunsveld?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Richard
  Brunsveld</a> on <a
  href="https://unsplash.com/photos/OBhu9aAnm_4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>   '
description: Setting up integration testing and code coverage in Remix with
  Vitest and React Testing Library.
---
*In this article we'll go through the necessary steps to setup the tooling around your remix App so you can run integration tests for your Route components, loaders and actions.*

## Full Stack React

I've really been enjoying building Apps with Remix. Or rather, I've always enjoyed building apps with full stack frameworks, even though I've spent a significant amount of my development hours in React land for the past 4 years. Since I usually work on small to medium sized teams responsible for the whole stack, I've always found it a burden having to work on a separate layer when a frontend framework was necessary. That includes a handful of different setups, from monorepos, glue libraries (like react-rails), separate pipelines, and such.

With Remix I no longer feel the dread of having to maintain to different projects when it comes down to using React. Everything can live nicely under the same repository, share types, build pipeline, deploy to whatever cloud you want to, and access your database from a long running Nodejs server where you can bring in the whole ecosystem of libraries as needed.

Still, Remix is far from a full-stack framework nor is it trying to become one: they've clearly stated that they don't want to dictate the architecture of people's applications. That's a perfectly fine choice for the maintainers, they're already solving some really hard problems to bring us the magic experience of seamless frontend and backend integration, but it does mean that you're on your own when it comes to setting up certain core features that we've grown accustomed to in frameworks such as Rails, Laravel or Phoenix such as testing.

## About Testing Remix Apps

It's worth mentioning that the common advice on the Remix community is to [use e2e testing](https://github.com/remix-run/remix/discussions/993#discussioncomment-1792350) via [Playwright](https://playwright.dev/) or [Cypress](https://www.cypress.io/). I've uses both of these libraries and they work really well with Remix. After all, if you have full stack react you might as well test your whole app with e2e escenarios. However I needed to get test coverage reports for this project and since Playwright and Cypress both rely on [Instanbul](https://istanbul.js.org/) to setup instrumentation, which itself relies on babel plugins to work and those won't work since Remix uses Esbuild under the hood. 

So, I had to drop down one level and do integration testing with [Vitest](https://vitest.dev/)

## Setting up the Tools

First of all we want to install all our dependencies

```shell
npm install -D vitest vitest-dom vite-tsconfig-paths @vitejs/plugin-react @remix-run/testing
```

Then we add a few helper files to setup Vitest environment: *huge shoutout to [Kent C. Dodds'](https://twitter.com/kentcdodds) Epic Stack github [repo](https://github.com/epicweb-dev/epic-stack), which has been a constant source of knowledge and inspiration for my Remix journey*

```shell
// tests/setup-test-env.ts

import { beforeEach, expect, vi } from "vitest"
import { installGlobals } from "@remix-run/node"
import "dotenv/config"
import { truncateDB } from "./truncate-db.js"

import * as matchers from "vitest-dom/matchers"
expect.extend(matchers)

// console.log(matchers)
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock)

installGlobals()

beforeEach(async () => {
  await truncateDB()
})
```

## Setting up a test database

This step is optional, but I prefer having a separate database to run tets against that can be fully setup and wipe out after each test run. This way you don't even have to mock your loaders and actions and can hit your stack all the way to the database (which is what I'm looking for since these are integration tests). If you want to setup a test database with docker, I'd recommend following the instructions in [this article](https://www.simplethread.com/isolated-integration-testing-with-remix-vitest-and-prisma/).