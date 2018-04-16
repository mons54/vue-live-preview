# vue-live-preview

Live preview component for Vue.js and Nuxt.js.

This isn't particularly useful, it's used as a demo for how to publish Vue components to NPM!

## Installation

```js
npm i --save-dev vue-live-preview
```

### Browser

Include the script file, then install the component with `Vue.use(VueLivePreview);` e.g.:

```html
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-live-preview/dist/vue-live-preview.min.js"></script>
<script type="text/javascript">
  Vue.use(VueLivePreview);
</script>
```

### Module

```js
import VueLivePreview from 'vue-live-preview';
```

## Usage

Once installed, it can be used in a template as simply as:

```html
<vue-live-preview></vue-live-preview>
```
