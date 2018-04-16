import Plugin from './Plugin.vue'

function install(Vue, options) {
  Plugin.props.Vue = Vue;
  Vue.component('live-preview', Plugin)
}

export default install;