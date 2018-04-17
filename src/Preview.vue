<template>
  <div>
    <div v-if="show">
      <codemirror v-model="model" @input="onChange"></codemirror>
      <hr>
    </div>
    <div id="component"></div>
  </div>
</template>

<script>
  export default {
    name: 'live-preview',
    data() {
      return {
        renderer: this.vue,
        parser: this.cheerio,
        compiler: this.babel,
        show: false,
        model: null,
        elStyle: null,
      }
    },
    props: {
      vue: {
        type: Function,
        default: null,
      },
      cheerio: {
        type: Function,
        default: null,
      },
      babel: {
        type: Function,
        default: null,
      },
      code: {
        type: String,
        default: null,
        require: true,
      },
      showCode: {
        type: Boolean,
        default: false
      }, 
    },
    methods: {
      init(code) {
        this.model = code;
        this.set(code)
      },
      onChange(code) {
        this.set(code)
      },
      render(data) {
        return new this.renderer(data)
      },
      parse(code) {
        const content = this.parser.load(code)
        const template = content('template').html() || ''
        const script = content('script').html()
        const style = content('style').html()
        return {
          template,
          script,
          style
        }
      },
      compile(script) {
        return this.compiler.transform(script, { presets: ['es2015'] }).code;
      },
      set(code) {

        const content = this.parse(code)
        const template = content.template
        const script = content.script
        const style = content.style

        let data = {}

        if (typeof script === 'string') {
          try {
            let js = this.compile(script)
            const exports = {}
            data = eval(js)
          } catch(e) {}
        }

        if (template !== this.template || script !== this.script) {

          this.template = template
          this.script = script

          this.render({
            el: '#component',
            template: `<div id="component"><div id="content"></div></div>`,
          })

          this.render(Object.assign({
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
        
        this.elStyle.innerHTML = style
      }
    },
    mounted() {
      if (!this.renderer) {
        this.renderer = require('vue')
      }
      if (!this.parser) {
        this.parser = require('cheerio')
      }
      if (!this.compiler) {
        this.compiler = require('babel-standalone')
      }
      this.show = this.showCode;
      this.init(this.code);
    },
    watch: {
      showCode (value) {
        this.show = value;
      }
    },
  }
</script>