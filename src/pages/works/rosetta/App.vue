<template>
  <div id="app">
    <yky-nav></yky-nav>

    <div class="container">
      <div class="select-chapter">
        <v-radio-group :source="chapters" v-model="chapter" lnf="button"></v-radio-group>
      </div>

      <div class="select-section">
        <v-radio-group :source="sectionsSource" v-model="section" lnf="button"></v-radio-group>
      </div>

      <article class="blog">
        <ul>
          <li v-for="p of currentContent">{{p}}</li>
        </ul>
      </article>
    </div>

    <yky-footer></yky-footer>
  </div>
</template>

<script>
  import './app.less'
  import {$fetch} from 'lovue/dist/utils.esm'

  export default {
    name: 'App',
    data() {
      return {
        chapters: [],
        chapter: '',
        sections: {},
        section: '',
        contents: {}
      }
    },
    computed: {
      sectionsSource() {
        return this.sections[this.chapter] || []
      },
      currentContent() {
        return this.contents[this.section] || []
      }
    },
    watch: {
      sectionsSource(val) {
        if (!val.length) return

        this.section = val[0].name
      }
    },
    methods: {
      async getChapters() {
        const body = await $fetch.get('/js/data/rosetta.json').catch(this.error)
        if (body === undefined) return

        const chapters = [], sections = {}, contents = {}
        body.forEach((chapter, i) => {
          const chapterValue = `chapter${i + 1}`
          chapters.push({ name: chapter.name, value: chapterValue })

          const tempSections = []
          chapter.sections.forEach(section => {
            tempSections.push({ name: section.name, value: section.name })
            contents[section.name] = section.content
          })
          sections[chapterValue] = tempSections
        })
        this.chapters = chapters
        this.sections = sections
        this.contents = contents
      }
    },
    created() {
      this.getChapters()
    }
  }
</script>
