# react-circle

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/react-circle
[downloads-image]:https://img.shields.io/npm/dm/@moxy/react-circle.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/react-circle.svg
[build-status-url]:https://github.com/moxystudio/react-circle/actions
[build-status-image]:https://img.shields.io/github/workflow/status/moxystudio/react-circle/Node%20CI/master
[codecov-url]:https://codecov.io/gh/moxystudio/react-circle
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/react-circle/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/react-circle
[david-dm-image]:https://img.shields.io/david/moxystudio/react-circle.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/react-circle?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/react-circle.svg

A React component to render a circle with a partially or fully drawn stroke.

## Installation

```sh
$ npm install @moxy/react-circle
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.

## Motivation

This package was implemented to tackle situations where you need to render a circle where only a percentage of the stroke is drawn (e.g. a loading indicator).

## Usage

```js
import React from 'react';
import Circle from '@moxy/react-circle';

const MyComponent = () => (
    <div>
        <Circle strokeWidth={ 2 } strokePercentage={ 0.7 } direction="clockwise" />
    <div>
);
```

## API

The following props are available to customize `react-circle`'s behavior.

#### strokeWidth

Type: `number` | Required: `false` | Default: `1.5`

The width of the circle's contour.

#### strokePercentage

Type: `number` | Required: `false` | Default: `1`

The percentage of the circle's contour that is drawn.

#### direction

Type: `string` | Required: `false` | Default: `clockwise`

The direction in which the contour is drawn, starting from the top of the circle.

The `direction` has one of the following values:
```js
direction: PropTypes.oneOf([
    'clockwise',
    'antiClockwise',
    'bothSides',
]),
```

### onTransitionEnd

Type: `function` | Required: `false`

A function that will be called when a transition between two circle contour lengths finishes.

#### classNames

Type: `string` | Required: `false`

A className to apply to the component.

## Styles

To import a stylesheet, one can import it on the project's entry CSS file:

```css
/* src/index.css */
@import "@moxy/react-circle/dist/index.css";
```

...or in the project's entry JavaScript file:

```js
/* src/index.js */
import "@moxy/react-circle/dist/index.css";
```

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```

## Demo

A demo [Next.js](https://nextjs.org/) project is available in the [`/demo`](./demo) folder so you can try out this component.

First, build the `react-circle` project with:

```sh
$ npm run build
```

To run the demo, do the following inside the demo's folder:

```sh
$ npm i
$ npm run dev
```

*Note: Everytime a change is made to the package a rebuild is required to reflect those changes on the demo.*

## FAQ

### I can't override the component's CSS, what's happening?

There is an ongoing [next.js issue](https://github.com/zeit/next.js/issues/10148) about the loading order of modules and global CSS in development mode. This has been fixed in [v9.3.6-canary.0](https://github.com/zeit/next.js/releases/tag/v9.3.6-canary.0), so you can either update `next.js` to a version higher than `v9.3.5`, or simply increase the CSS specificity when overriding component's classes, as we did in the [`demo`](./demo/pages/index.module.css), e.g. having the page or section CSS wrap the component's one.

## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
