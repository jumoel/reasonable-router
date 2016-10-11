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
The router to be used in (modern) browsers.

Required props:

 * `routes`: 
   The routing object. A map of strings to objects that contain a `component` property.
	 The `component` is what will be rendered when a route matches. In Flow: `{ [key: string]: { component: ReactClass } }`.
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

 * `forRoute`: The URL for which the fragment should be rendered
 * `children`: What will be rendered if the route matches

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
