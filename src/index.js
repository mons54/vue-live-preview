import VueLivePreview from './Preview.vue'
import VueCodemirror from 'vue-codemirror'

function install(Vue, options = {
    options: { 
      theme: 'material',
      tabSize: 2,
      lineNumbers: true,
      mode: 'text/x-vue',
    },
  }) {
  Vue.use(VueCodemirror, options)
  Vue.component('live-preview', VueLivePreview)
}

if (typeof Vue !== 'undefined') {
  Vue.use(install)
}

export { VueLivePreview, VueCodemirror, install }
export default VueLivePreview