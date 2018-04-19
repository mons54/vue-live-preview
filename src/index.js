import VueLivePreview from './Preview.vue'
import VueCodemirror from 'vue-codemirror'

const defaultOptions = {
  theme: 'default',
  tabSize: 2,
  lineNumbers: true,
  mode: 'text/x-vue',
}

function install(Vue, options = {}) {
  options = Object.assign(defaultOptions, options)
  Vue.use(VueCodemirror, {
    options: options
  })
  Vue.component(VueLivePreview.name, VueLivePreview)
}

let _Vue
if (typeof window !== 'undefined') {
  _Vue = window.Vue
} else if (typeof global !== 'undefined') {
  _Vue = global.Vue
}
if (_Vue) {
  _Vue.use(install)
}

export { VueLivePreview, VueCodemirror }
export default install