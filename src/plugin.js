import Plugin from './Plugin.vue'

function install(Vue, options) {
  Vue.component('live-preview', Plugin)
}

export default install;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}