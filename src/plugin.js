import Plugin from './Plugin.vue'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/mode/vue/vue'

module.exports = {
  install: function (Vue, options = {
    theme: 'material',
    tabSize: 2,
    lineNumbers: true,
    mode: 'text/x-vue',
  }) {
    Vue.use(VueCodemirror, options)
    Vue.component('vue-live-preview', Plugin)
  }
}
