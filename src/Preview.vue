<template>
  <div class="row live-preview">
    <div v-if="show" v-bind:class="classCode">
      <codemirror v-model="model" @input="change" :options="defaultOptions"></codemirror>
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
        show: this.showCode,
        scope: this.generateScope(),
        defaultOptions: {
          theme: 'default',
          tabSize: 2,
          lineNumbers: true,
          mode: 'text/x-vue',
        }
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
      },
      globalOptions: {
        type: Object,
        default: {}
      },
      options: {
        type: Object,
        default: null
      }
    },
    methods: {
      init (code) {
        code = code.trim()
        this.model = code;
        this.change(code)
      },
      generateScope () {
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
      change (code) {

        const html = document.createElement('div')
        html.innerHTML = code

        let template, script, style, monofile = true

        template = html.querySelector('template')

        if (!template) {
          monofile = false
        }

        script = html.querySelector('script')
        style = html.querySelectorAll('style')

        if (!monofile) {
          if (script) {
            html.querySelector('script').remove()
          }
          Array.prototype.slice.call(html.querySelectorAll('style')).forEach(n => n.remove())
          template = html
        }

        template = template ? template.innerHTML : ''
        style = Array.prototype.slice.call(style).map(n => n.innerHTML)

        if (script) {
          script = script.innerHTML
        }

        style = style.join(' ')

        let data = {}

        if (monofile && typeof script === 'string') {
          try {
            let js = this.Babel.transform(script, { presets: ['es2015'] }).code
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

          if (monofile) {
            new this.Vue(Object.assign({
              el: '#content',
              template: template,
            }, data))
          } else {
            document.getElementById('content').innerHTML = template
            try {
              eval(script.replace(/Vue\(/g, 'this.Vue(').replace(/Vue\./g, 'this.Vue.'))
            } catch(e) {}
          }
        }

        if (!this.elStyle) {
          const head = document.head || document.getElementsByTagName('head')[0]
          this.elStyle = document.createElement('style')
          this.elStyle.type = 'text/css'
          head.appendChild(this.elStyle)
        }
        
        this.elStyle.innerHTML = this.scoped ? this.scopeStyle(style) : style
      },
      setDefaultOptions(options) {
        this.defaultOptions = Object.assign(this.defaultOptions, options)
      }
    },
    mounted() {

      if (this.options) {
        this.setDefaultOptions(this.options)
      } else if (window.VueLivePreview && window.VueLivePreview.options) {
        this.setDefaultOptions(window.VueLivePreview.options)
      } else if (this.globalOptions) {
        this.setDefaultOptions(this.globalOptions)
      }

      if (window && window.Vue) {
        this.Vue = window.Vue
      } else {
        this.Vue = Vue
      }

      if (Babel) {
        this.Babel = Babel
      } else {
        this.Babel = require('babel-standalone')
      }

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