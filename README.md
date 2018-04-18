# vue-live-preview

Live preview component for Vue.js and Nuxt.js.

## Installation

```js
npm i --save-dev vue-live-preview
```

### Vue.js

```js
import VueLivePreview from 'vue-live-preview'
import 'codemirror/mode/vue/vue'

// default codemirror options
Vue.use(VueLivePreview, {
  theme: 'default',
  tabSize: 2,
  lineNumbers: true,
  mode: 'text/x-vue',
})
```

## Usage

```html
<live-preview :code="`Your monofile code here`"></live-preview>
```

## Style

```html
<style>
  @import 'codemirror/lib/codemirror.css'
  /* 
  others css from codemirror
  @import 'codemirror/theme/material.css'
  ...
  */
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
import 'codemirror/mode/vue/vue'

// default codemirror options
Vue.use(VueLivePreview, {
  theme: 'default',
  tabSize: 2,
  lineNumbers: true,
  mode: 'text/x-vue',
})
```

Vue.vue
```html
<no-ssr>
  <live-preview :code="`Your monofile code here`"></live-preview>
</no-ssr>
```

### Browser

```html
<script type="text/javascript" src="//unpkg.com/vue@latest/dist/vue.min.js"></script>
<script type="text/javascript" src="//unpkg.com/vue-live-preview@latest/dist/vue-live-preview.min.js"></script>
<script type="text/javascript">
  Vue.use(VueLivePreview);
</script>
```
