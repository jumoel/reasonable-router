# Reasonable Router

[![CircleCI](https://circleci.com/gh/jumoel/reasonable-router.svg?style=shield)](https://circleci.com/gh/jumoel/reasonable-router)
[![Coverage Status](https://img.shields.io/coveralls/jumoel/reasonable-router.svg)](https://coveralls.io/github/jumoel/reasonable-router?branch=master)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Project is mainted](https://img.shields.io/badge/Maintained-yes-brightgreen.svg)
[![Greenkeeper enabled](https://badges.greenkeeper.io/jumoel/reasonable-router.svg)](https://greenkeeper.io/)

A reasonable (and reasonably simple) router for React.

`resonable-router` is pretty old-fashioned, because it is built upon the idea
that a single URL corresponds to a specific view. This works well with server rendering,
where that statement holds true. If you don't need server rendering and you are feeling modern,
something like [Junctions](https://jamesknelson.github.io/junctions/) might be worth a look.

The route of development is driven by a set of [goals](#goals) and [non-goals](#non-goals). 

## Installation

With [npm](https://www.npmjs.com/):

    $ npm install --save reasonable-router

Or with [yarn](https://yarnpkg.com/):

    $ yarn add reasonable-router 

Then you can use the library like you would with everything else (such as with webpack, babel or [create-react-app](https://github.com/facebookincubator/create-react-app)):

```js
import React, { Component } from 'react';

import { BrowserRouter, Link, RouterMountpoint } from 'reasonable-router';

const NotFound = ;
const routeConfig = {
	routes: {
		'/': { component: () => <h1>Index</h1> },
		'/about': { component: () => <h1>About</h1> },
	}
	miss: () => <h1>Not found :(</h1>
};

class App extends Component {
  render() {
    return (
      <BrowserRouter routeConfig={routeConfig}>
        <div>
          <Link href='/'>Index</Link> | <Link href='/about'>About</Link>
          <RouterMountpoint />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
```

### Goals
 * Reasonably simple to comprehend and understand
 * Single-pass server side rendering
 * 404 routes
 * Hot reloading that just works

### Maybe-Goals
 * Nested routes
 * Nested 404-routes
 * A controlled router (where i.e. Redux manages the router state completely)
 * Asynchronous fetching of route components

### Non-Goals
 * Component based routing (`<Route ... />`)
 * Asynchronous routes


## Movable Parts

### `<BrowserRouter>`

The router to be used in ([modern](http://caniuse.com/#feat=history)) browsers.

Required props:

 * `routeConfig`: 
   The route configuration object. See the section on [Route Configuration](#route-configuration).
 * `children`: What will ultimately be rendered by the router. Should probably contain a `<RouterMountpoint />` somewhere.

### `<ServerRouter>`
The router to be used on the server.

Required props, in addition to the ones from `<BrowserRouter>`:

 * `location`: The location to be rendered. From `req.originalUrl`
   (if using [Express](http://expressjs.com/)) or something similar.

Optional props:

 * `onMiss`: A callback that will be called if no route matches. Can be used to communicate
   with the server renderer to return the proper HTTP status code.

### `<RouterMountpoint>`

Where the matched route from the router will be rendered. This allows you to
nest the target in other components, i.e. in larger page containers. Allows you
to have the router as the outermost component, which in turn allows you to use
`<Link>` and `<Fragment>` where you need it.

Doesn't accept props.

### `<Link>`
A simple wrapper around an `<a>`-tag that uses the
[pushState](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method)
API from the router.  

Required props:

 * Either `href` or `to`: The target to navigate to.
   `href` is a static link target that we know and love from regular `<a>` tags.
	 `to` is a name of a route to link to. 
 * `children`: What the `<a>` tag will be wrapped around.

### `<Fragment>`

A way to add route specific fragments anywhere in your app. Similar to `<Match>`
from `react-router@v4` and `<Fragment>` from `redux-little-router`.

Required props:

 * `forRoute`: The URL for which the fragment should be rendered. Can contain
   [patterns](https://www.npmjs.com/package/route-parser).
 * `children`: What will be rendered if the route matches.

## Route Configuration

The `routes` object used to render the proper component takes on the form of a
map of strings to objects. These objects must contain a `component` property.
The `component` is what will be rendered when a route matches.

The keys of the `routes` property corresponds to the routes. The keys can be
plain text (`/some-page`) or contain patterns (as described in the
[`route-parser` documentation](https://www.npmjs.com/package/route-parser)).

The `miss` property is the component that will be rendered if no route matches.

The first route that matches the current location will be rendered. So put the
most specific routes first in the configuration.

If the route contains paramters (i.e. `/route/:param`), they will be passed to
the rendered component in the `params` prop.

The following is an example of a route config:

```js
const routeConfig = {
	routes: {
		'/': { component: () => <h1>Frontpage</h1>) },
		'/about': { component: About },
		'/hello/:name': { component: ({ params }) => <h1>Hello, { params.name }</h1> }
	},
	miss: () => <h1>Not found</h1>,
};
```

## Contributions

Contributions are very welcome!

I feel some parts of the code are in need of refactoring, in particular the parameterized route
matching and passing of parameters, that is currently taking place in both `<Router>` and `<Fragment>`.

Additionally, testing both needs the chore of setup as well as writing of specifications.
