<template>
<div>
  <div v-if="codemirror">
    <codemirror v-model="model" @input="onChange"></codemirror>
    <hr>
  </div>
  <div id="component"></div>
</div>
</template>

<script>
  
import Vue from 'vue'
import Cheerio from 'cheerio'
import Babel from 'babel-standalone'

export default {
  data() {
    return {
      codemirror: false,
      model: null,
      elStyle: null,
    }
  },
  props: {
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
    set(code) {

      const content = Cheerio.load(code)

      const template = content('template').html() || ''
      const script = content('script').html()
      const style = content('style').html()

      let data = {}

      if (typeof script === 'string') {
        try {
          let js = Babel.transform(script, { presets: ['es2015'] }).code
          const exports = {}
          data = eval(js)
        } catch(e) {}
      }

      if (template !== this.template || script !== this.script) {

        this.template = template
        this.script = script

        new Vue({
          el: '#component',
          template: `<div id="component"><div id="content"></div></div>`,
        })

        new Vue(Object.assign({
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
    this.codemirror = this.showCode;
    this.init(this.code);
  },
  watch: {
    showCode (value) {
      this.codemirror = value;
    }
  },
}
</script>