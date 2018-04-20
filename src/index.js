import VueLivePreview from './Preview.vue'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/mode/vue/vue.js'

function install(Vue, options = {}) {
  VueLivePreview.props.globalOptions.default = () => options
  Vue.use(VueCodemirror)
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