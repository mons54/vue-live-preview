# Vue Live Preview

<p align="center">
    <a href="https://bootstrap-vue.js.org">
        <img width="200px" src="https://vuejs.org/images/logo.png">
    </a>
    <br>
    Live preview component for Vue.js and Nuxt.js.
    <br>
    <br>
    <a href="https://vuejs.org">
        <img alt="" src="https://img.shields.io/badge/vue.js-2.x-green.svg">
    </a>
</p>

- 👀 [Examples](https://mons54.github.io/vue-live-preview/)
- 📘 [CodeMirror Docs](https://codemirror.net/doc/manual.html/)

## Installation

```js
npm i --save-dev vue-live-preview
```

## Vue.js

webpack.config.js
```js
resolve: {
  alias: {
    vue: 'vue/dist/vue.js'
  }
}
```

main.js
```js
import VueLivePreview from 'vue-live-preview'

// CodeMirror options
Vue.use(VueLivePreview, {
  theme: 'material',
  tabSize: 2,
  lineNumbers: true,
})
```

App.vue
```html
<template>
  <live-preview code="Your code here..."/>
</template>

<style lang="scss">
  @import 'codemirror/lib/codemirror.css'
  @import 'codemirror/theme/material.css'
</style>
```

### Nuxt.js

For nuxt, use the component out of server side rendering.

nuxt.config.js
```js
plugins: [
  { src: '~plugins/vue-live-preview', ssr: false },
],
```

plugins/vue-live-preview.js
```js
import Vue from 'vue'
import VueLivePreview from 'vue-live-preview'

// CodeMirror options
Vue.use(VueLivePreview, {
  theme: 'material',
  tabSize: 2,
  lineNumbers: true,
})
```

Vue.vue
```html
<template>
  <no-ssr>
    <live-preview :code="`Your monofile code here`"></live-preview>
  </no-ssr>
</temlate>

<style lang="scss">
  @import 'codemirror/lib/codemirror.css'
  @import 'codemirror/theme/material.css'
</style>
```

### Browser

```html
<head>
  <link rel="stylesheet" type="text/css" href="//unpkg.com/codemirror/lib/codemirror.css"></link>
  <link rel="stylesheet" type="text/css" href="//unpkg.com/codemirror/theme/material.css"></link>
</head>
<body>
  <div id="app">
    <live-preview :code="code"></live-preview>
  </div>

  <script src="//unpkg.com/vue/dist/vue.min.js"></script>
  <script src="//unpkg.com/axios/dist/axios.min.js"></script>
  <script src="//unpkg.com/vue-live-preview/dist/vue-live-preview.min.js"></script>

  <script>
    VueLivePreview.options = {
      theme: 'material'
    };

    Vue.use(VueLivePreview);

    new Vue({
      el: 'live-preview',
      data: {
        code: "Your code here..."
      }
    })
  </script>
</body>
```

### Style

```html
<style lang="scss">
  @import 'codemirror/lib/codemirror.css'
  /* 
  others css from codemirror
  @import 'codemirror/theme/material.css'
  ...
  */
</style>
```

### Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>code</td>
      <td>String</td>
      <td>null</td>
      <td>true</td>
      <td>Code of Single File Components</td>
    </tr>
    <tr>
      <td>options</td>
      <td>Object</td>
      <td>
        <code>{
          theme: 'default',
          tabSize: 2,
          lineNumbers: true,
          mode: 'text/x-vue',
          }</code>
      </td>
      <td></td>
      <td>CodeMirror options</td>
    </tr>
    <tr>
      <td>scoped</td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Apply css to elements of preview only</td>
    </tr>
    <tr>
      <td>showCode</td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Show element code (Used for toogle)</td>
    </tr>
    <tr>
      <td>classElem</td>
      <td>String</td>
      <td>row</td>
      <td></td>
      <td>Class css for this element</td>
    </tr>
    <tr>
      <td>classCode</td>
      <td>String</td>
      <td>col-md-12</td>
      <td></td>
      <td>Class css for element code (Used for bootstrap grid)</td>
    </tr>
    <tr>
      <td>classPrev</td>
      <td>String</td>
      <td>col-md-12</td>
      <td></td>
      <td>Class css for element preview (Used for bootstrap grid)</td>
    </tr>
  </tbody>
</table>
