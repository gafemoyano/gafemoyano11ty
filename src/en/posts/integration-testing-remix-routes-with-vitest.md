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

_In this article we'll go through the necessary steps to setup the tooling around your remix App so you can run integration tests for your Route components, loaders and actions._

_Disclaimer: When I first started writing this post, the official Remix as a Vite plugin hadn't been released. I haven't tried it myself but I imagine most of this setup is still relevant._

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

Then we add a few helper files to setup Vitest environment: _huge shoutout to [Kent C. Dodds'](https://twitter.com/kentcdodds) Epic Stack github [repo](https://github.com/epicweb-dev/epic-stack), which has been a constant source of knowledge and inspiration for my Remix journey_

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

Since I'm using Drizzle instead of Postgres, there's a few things we need to do differently in our setup scripts:

```shell
// package.json
"scripts": {
    "db:migrate:dev": "ts-node ./drizzle/migrate.ts",
    "db:migrate:test": "dotenv -e .env.test -- npx drizzle-kit push:pg"
    "test": "run-s db:migrate:test test:unit",
    "test:unit": "dotenv -e .env.test -- vitest --no-threads"
}
```

## Setting up Vitest with Istanbul for coverage reports

Now that everything is hooked up, we have to setup up a few additional configurations to get coverage reports. Start by installing the vitest/coverage-istanbul package from npm

```shell
npm install -D @vitest/coverage-istanbul
```

Then in our `vitest.config.ts` file we can add the following configurations:

```ts
    environment: "jsdom",
    setupFiles: ["./tests/setup/setup-test-env.ts"],
    coverage: {
      reporter: ["text", "lcov"],
      provider: "istanbul",
      include: ["app/**/*.{ts,tsx}"],
      exclude: ["app/entry.server.tsx", "app/root.tsx"],
      all: true,
    },
```

Don't forget to add the `include` and `exclude` according to your app and the files you'll wan't to see on the coverage report. You'll also need to tell vitest about any special aliases you might have setup in your project such as `~`, `@` or `#` as root for your `app` folder.

```ts
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
    },
  },
```

## Writing a test

Since this are integration tests we're going to be focusing on testing our Routes, Loaders and Actions.

The server part of Remix is not really special, since it's just a function running on a Nodejs server. We can test those directly by importing them in our test file and calling the route function directly assuming our app is running on `localhost:3000`.

For example, let's say we have a route that allows an authenticated user to see an Area and edit it at `localhost:3000/areas/:areaId ` and we want to test the loader.

```ts
// area-loader.server.test.ts
describe("Edit area loader", () => {
  test("returns the area", async () => {
    // Get a signed cookie to clear authentication
    const { cookie } = await setupAdmin()
    // Some function that creates an area on the test db.
    const newArea = await AreaFactory.create()

    let url = "http://localhost:3000/areas/" + newArea.id.toString()

    // Create a request object and pass it the cookie
    const request = new Request(url, {
      method: "GET",
      headers: { cookie },
    })

    const response = await loader({
      request,
      params: { areaId: newArea.id.toString() },
      context: {},
    })
    expect(response.status).toBe(200)

    const data = await response.json()

    // We would expect the loader to return the area with the id we passed
    expect(data.area.id).toBe(newArea.id)
  })
})
```

That's all there is to it. You might want to check additional properties on the response data, but that's good enough for now.

What about Actions? We can test those in a similar way with the knowledge that on a successful request, the action will redirect to a new route.

```ts
// area-action.server.test.ts
describe("Edit area action", () => {
  test("returns success with valid parameters", async () => {
    const { cookie } = await setupAdmin()
    const newArea = await AreaFactory.create()

    // We use FormData to simulate a request
    const formData = new FormData()
    formData.set("name", "Test name")

    let url = `http://localhost:3000/areas/${newArea.id.toString()}`

    // Create a request object and pass it the authentication cookie and FormData

    const request = new Request(url, {
      method: "POST",
      headers: { cookie },
      body: formData,
    })

    // We call the action with the request
    const response = await action({
      request,
      params: { areaId: newArea.id.toString() },
      context: {},
    })
    //  We expect the response to be a redirect to the areas list
    expect(response.status).toBe(302)
    expect(response.headers.get("Location")).toBe("/areas")
  })
})
```

And that's all for the server part! There's obviously more escenarios we can test, including failed submissions, invalid requests, etc. But the important bit is that we can import our loaders and actions and call them directly passing them a Request object.

## Testing the view layer

Since this is a React app a lot of the code we'll be writing is Components and we want to test those as well and include them in our coverage report.

For this we're using an special package called `@remix-run/testing` which provides a set of utilities to help us test Remix apps.
The idea is that we'll use a special `createRemixStub` function to create a RemixApp which will include the internal `contexts` and `hooks` so that we can render our routes by passing them as children in it.

We'll also use React Testing Library to render and interact with our route components.

```ts
// area-client.test.tsx
import { test, describe } from "vitest"
import AdminEditAreaRoute, { loader } from "./route"
import { render, screen, waitFor } from "@testing-library/react"
import { createRemixStub } from "@remix-run/testing"
import { AreaFactory } from "tests/factories/area"

describe("New template route", () => {
  test("it renders correctly", async () => {
    const area = await AreaFactory.create()

    const RemixStub = createRemixStub([
      {
        id: "root",
        path: "/",
        // We want to pass the cookie to check for authentication.
        loader: (args) => {
          args.request.headers.set("cookie", cookie)
          // This loader can actually just be a Mock or a fake
          return loader(args)
        },
        children: [
          {
            path: "/areas/:areaId",
            // Here we're passing the Route component as a child.
            Component: AdminEditAreaRoute,
            loader: async (args) => {
              args.request.headers.set("cookie", cookie)

              return loader(args)
            },
          },
        ],
      },
    ])

    // Initial entries we'll make it so that we don't have to navigate
    // to this route to test it.
    render(<RemixStub initialEntries={[`/admin/areas/${area.id}`]} />)

    // We test that the page is rendering correctly
    await waitFor(() =>
      screen.findByRole("heading", { name: `Edit area ${area.name}` })
    )
  })
})
```

This works fine for Route tests since they depend on Remix internals and contexts, for UI components I'd avoid this setup and just render them directly with React Testing Library.

Now that we have everything setup, we can run our test suite with the following command:

```shell
npm run testdotenv -e .env.test -- vitest --no-threads
# Or the shorthand defined in package.json
npm run test:unit
```

You might experiment with the `--no-threads` flag to see if it makes a difference in the speed of the test suite, but I've found it lead to flakyness and I'd rather wait a little bit longer than have false positives on my test runs.

## Generating a coverage report

If everytyhing goes well, you we can run the following command to generate a coverage report:

```json
"scripts": {
  "coverage": "dotenv -e .env.test -- vitest  run --coverage --no-threads"
}
```

This will run the test suite and generate a coverage report in the `coverage` folder.

![Vitest Coverage Report](/assets/img/articles/coverage.png)

As a bonus, since we also defined `lcov` as a reporter, we get a really nice html report that we can open in a browser to view an interactive version of the coverage report in our projets root folder.

![Vitest Coverage Report](/assets/img/articles/coverage-html.png)

## Conclusion

In this article we covered how to setup integration tests for a Remix app using Vitest, React Testing Library and Istanbul for coverage reports. It took me a while to figure out how to go about this, specially rendering the Routes with `createRemixStub`. Now that Remix works as a Vite plugin I'd imagine that setting up Playwright or Cypress with coverage is going to be more straightforward, but I haven't tried it myself and I still think there's good value in focusing on integration tests rather than e2e for some apps.
