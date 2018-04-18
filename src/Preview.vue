<template>
  <div class="row live-preview">
    <div v-if="show" v-bind:class="classCode">
      <codemirror v-model="model" @input="change"></codemirror>
      <hr>
    </div>
    <div v-bind:class="[classPrev, scope]">
      <div id="component"></div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import Babel from 'babel-standalone'

  export default {
    name: 'live-preview',
    data() {
      return {
        model: null,
        elStyle: null,
        show: this.showCode,
        scope: this.generateScope(),
      }
    },
    props: {
      code: {
        type: String,
        default: null,
        required: true,
      },
      scoped: {
        type: Boolean,
        default: true
      },
      showCode: {
        type: Boolean,
        default: true
      },
      classCode: {
        type: String,
        default: 'col-md-12'
      },
      classPrev: {
        type: String,
        default: 'col-md-12'
      }
    },
    methods: {
      init(code) {
        code = code.trim()
        this.model = code;
        this.change(code)
      },
      generateScope() {
        return  'v-xxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      scopeStyle (style) {
        return style.trim().replace(/(^|\})\s*([^{]+)/g, (m, g1, g2) => {
          return g1 ? `${g1} .${this.scope} ${g2}` : `.${this.scope} ${g2}`
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

          new this.vue({
            el: '#component',
            template: `<div id="component"><div id="content"></div></div>`,
          })

          new this.vue(Object.assign({
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
      },
    },
    mounted() {

      if (Vue) {
        this.vue = Vue
      } else if (window && window.Vue) {
        this.vue = window.Vue
      } else {
        this.vue = require('vue')
      }

      if (Babel) {
        this.babel = Babel
      } else if (window && window.Babel) {
        this.babel = window.Babel
      } else {
        this.babel = require('babel-standalone')
      }

      this.init(this.code);

      this.vue.config.errorHandler = (error) => console.warn(error)
      this.vue.config.warnHandler = (error) => console.warn(error)
    },
    watch: {
      showCode (value) {
        this.show = value;
      }
    },
  }
</script>