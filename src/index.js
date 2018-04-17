/**
 * Live preview component for Vue.js and Nuxt.js
 *
 * @author Julien Simonet <j.mons54@gmail.com>
 * @repository git+https://github.com/mons54/vue-live-preview
 * @license  MIT
 */
import VueLivePreview from './Preview.vue'
import VueCodemirror, { codemirror } from 'vue-codemirror'

const defaultOptions = {
  theme: 'default',
  tabSize: 2,
  lineNumbers: true,
  mode: 'text/x-vue',
}

function install(Vue, options = {}) {
  Vue.use(VueCodemirror, {
    options: Object.assign(defaultOptions, options)
  })
  Vue.component(VueLivePreview.name, VueLivePreview)
}

if (typeof Vue !== 'undefined') {
  Vue.use(install)
}

export { VueLivePreview, VueCodemirror, codemirror, install }
export default install