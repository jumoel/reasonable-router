# Reasonable Router

A reasonable (and reasonably simple) router for React.

## Installation

With [npm](https://www.npmjs.com/):

    $ npm install --save reasonable-router

Or with [yarn](https://yarnpkg.com/):

    $ yarn add reasonable-router 

Then you can use the library like you would with everything else (such as with webpack, babel or [create-react-app](https://github.com/facebookincubator/create-react-app)):

```js
import React, { Component } from 'react';

import { BrowserRouter, Link, RouterMountpoint } from 'reasonable-router';

const NotFound = () => <h1>Not found :(</h1>;
const routes = {
  '/': { component: () => <h1>Index</h1> },
  '/about': { component: () => <h1>About</h1> },
};

class App extends Component {
  render() {
    return (
      <BrowserRouter routes={routes} miss={NotFound}>
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

## Movable Parts

### `<BrowserRouter>`
The router to be used in ([modern](http://caniuse.com/#feat=history)) browsers.

Required props:

 * `routes`: 
   The routing object. See the section on [Route Configuration](#route-configuration).
 * `miss`: The component that will be rendered when no route matches
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
Where the matched route from the router will be rendered. This allows you to nest the target
in other components, i.e. in larger page containers. Allows you to have the router as the outermost
component, which in turn allows you to use `<Link>` and `<Fragment>` where you need it.

Doesn't accept props.

### `<Link>`
A simple wrapper around an `<a>`-tag that uses the
[pushState](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method)
API from the router.  

Required props:

 * `href`: The URL to navigate to
 * `children`: What the `<a>` tag will be wrapped around.

### `<Fragment>`
A way to add route specific fragments anywhere in your app. Similar to `<Match>` from
`react-router@v4` and `<Fragment>` from `redux-little-router`.

Required props:

 * `forRoute`: The URL for which the fragment should be rendered. Can contain [patterns](https://www.npmjs.com/package/route-parser)
 * `children`: What will be rendered if the route matches

## Route Configuration

The `routes` object used to render the proper component takes on the form of a map of strings to objects.
These objects must contain a `component` property. The `component` is what will be rendered when a route matches.

In Flow:

	{ [key: string]: { component: ReactClass } }

The keys of the object corresponds to the routes. The keys can be plain text (`/some-page`) or contain patterns (as described in the
[`route-parser` documentation](https://www.npmjs.com/package/route-parser)).

The first route that matches the current location will be rendered. So put the most specific routes first in the configuration.

If the route contains paramters (i.e. `/route/:param`), they will be passed to the rendered component in the `routeParams` prop.

The following is an example of a route config:

```js
const routes = {
	'/': { component: () => <h1>Frontpage</h1>) },
	'/about': { component: About },
	'/hello/:name': { component: ({ routeParams }) => <h1>Hello, { routeParams.name }</h1> }
};
```

## Goals
 * Simple to comprehend and understand
 * Single-pass server side rendering
 * 404 routes
 * Hot reloading that just works

### Maybe-Goals
 * Nested 404-routes
 * A controlled router (where i.e. Redux manages the router state completely)

### Non-Goals
 * Component based routing (`<Route ... />`)
 * Asynchronous routes
