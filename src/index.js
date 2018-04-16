import LivePreview from './LivePreview.vue'

var VuePlugin = {
  install: function install(Vue) {
    Vue.component('live-preview', LivePreview);
  }
};

vueUse(VuePlugin);

export default VuePlugin;