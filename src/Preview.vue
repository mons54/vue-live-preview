<template>
  <div class="live-preview">
    <div v-if="show">
      <codemirror v-model="model" @input="change"></codemirror>
      <hr>
    </div>
    <div v-bind:class="scopedClass">
      <div id="component"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'live-preview',
    data() {
      return {
        show: false,
        model: null,
        elStyle: null,
      }
    },
    props: {
      code: {
        type: String,
        default: null,
        required: true,
      },
      showCode: {
        type: Boolean,
        default: true
      },
      scoped: {
        type: Boolean,
        default: true
      },
      scopedClass: {
        type: String,
        default: 'live-preview--scope'
      },
    },
    methods: {
      init(code) {
        code = code.trim()
        this.model = code;
        this.change(code)
      },
      scopeStyle (style) {
        return style.trim().replace(/(^|\})\s*([^{]+)/g, (m, g1, g2) => {
          return g1 ? `${g1} .${this.scopedClass} ${g2}` : `.${this.scopedClass} ${g2}`
        })
      },
      change(code) {

        const html = document.createElement('div')
        html.innerHTML = code
        let template = html.querySelector('template')
        let script = html.querySelector('script')
        let style = Array.prototype.slice.call(html.querySelectorAll('style')).map(n => n.innerHTML)

        template = template ? template.innerHTML : ''

        if (script) {
          script = script.innerHTML
        }

        style = style.join(' ')

        let data = {}

        if (typeof script === 'string') {
          try {
            let js = this.babel.transform(script, { presets: ['es2015'] }).code
            const exports = {}
            data = eval(js)
          } catch(e) {}
        }

        if (template !== this.template || script !== this.script) {

          this.template = template
          this.script = script

          new this.Vue({
            el: '#component',
            template: `<div id="component"><div id="content"></div></div>`,
          })

          new this.Vue(Object.assign({
            el: '#content',
            template: template.replace(/=""/g, ''),
          }, data))
        }

        if (!this.elStyle) {
          const head = document.head || document.getElementsByTagName('head')[0]
          this.elStyle = document.createElement('style')
          this.elStyle.type = 'text/css'
          head.appendChild(this.elStyle)
        }
        
        this.elStyle.innerHTML = this.scoped ? this.scopeStyle(style) : style
      }
    },
    mounted() {

      if (window && window.Vue) {
        this.Vue = window.Vue
      } else if (typeof Vue !== 'undefined') {
        this.Vue = Vue
      } else {
        this.Vue = require('vue')
      }

      this.babel = require('babel-standalone')

      this.show = this.showCode;
      this.init(this.code);

      this.Vue.config.errorHandler = (error) => console.warn(error)
      this.Vue.config.warnHandler = (error) => console.warn(error)
    },
    watch: {
      showCode (value) {
        this.show = value;
      }
    },
  }
</script>

<style scoped>
  .preview {
    display: block;
  }
</style>