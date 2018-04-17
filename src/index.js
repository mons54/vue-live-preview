import LivePreview from './LivePreview.vue'

var VuePlugin = {
  install: function install(Vue) {
    Vue.component('live-preview', LivePreview);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(VuePlugin);
}

export default VuePlugin;