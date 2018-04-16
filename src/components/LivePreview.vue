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
import cheerio from 'cheerio'
import babel from 'babel-standalone'

export default {
  Vue: null,
  data () {
    return {
      cheerio: cheerio,
      babel: babel,
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
      default: false,
    },
  },
  methods: {
    init (code) {
      this.model = code
      this.set(code)
    },
    onChange (code) {
      this.set(code)
    },
    set (code) {
      const content = this.cheerio.load(code)
      const template = content('template').html() || ''
      const script = content('script').html()
      const style = content('style').html()

      let exports = {}
      
      if (template !== this.template || script !== this.script) {
        this.template = template
        this.script = script

        let vue;

        vue = new this.Vue({
          el: '#component',
          template: `<div id="component"><div id="content"></div></div>`,
        })

        vue = new this.Vue(Object.assign({
          el: '#content',
          template: template.replace(/=""/g, ''),
        }, exports))
      }

      if (!this.elStyle) {
        const head = document.head || document.getElementsByTagName('head')[0]
        this.elStyle = document.createElement('style')
        this.elStyle.type = 'text/css'
        head.appendChild(this.elStyle)
      }
      this.elStyle.innerHTML = style
    },
  },
  mounted () {
    this.codemirror = this.showCode
    this.init(this.code)
  },
  watch: {
    showCode (value) {
      this.codemirror = value
    },
  },
}
</script>

<style scoped>
.test h1 {
  color: #40b883;
}
</style>
