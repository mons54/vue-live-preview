import VueLivePreview from './Preview.vue'
import VueCodemirror, { codemirror } from 'vue-codemirror'

function install(Vue, options = {
    theme: 'material',
    tabSize: 2,
    lineNumbers: true,
    mode: 'text/x-vue',
  }) {
  Vue.use(VueCodemirror, options)
  Vue.component(VueLivePreview.name, VueLivePreview)
}

if (typeof Vue !== 'undefined') {
  Vue.use(install)
}

export { VueLivePreview, VueCodemirror, codemirror, install }
export default install