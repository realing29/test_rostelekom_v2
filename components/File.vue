<template lang="pug">
  b-tr(
    v-on:dblclick="$emit('dbClickDir', dirOrFile.name)"
    v-on:click="select"
    :class="{active: dirOrFile.selected}"
    )
    b-th.file-ico(v-if="isFile") ico
    b-th.file-ico(v-else)
    b-th.file-name {{ dirOrFile.name }}
    b-th.file-size(v-if="dirOrFile.size") {{ size }}
    b-th.file-size(v-else)
    b-th.file-mtime {{ mtime }}
</template>

<script>
export default {
  data(){
    return {
      selected: false
    }
  },
  props: {
    dirOrFile: Object,
  },
  computed: {
    mtime() {
      let [date, time] = this.dirOrFile.mtime.split("T");
      time = time.slice(0, 5);
      time = time.split(":")
      time = time.join(":")
      date = date.split("-").reverse().join(".");
      return [date, time].join(" ");
    },
    isFile(){
      let regexp = /.+\..+/
      return this.size && regexp.test(this.dirOrFile.name)
    },
    size(){
      const size = this.dirOrFile.size
      let i = 0
      const units = ["Б", "КБ", "МБ", "ГБ", "ТБ", "ПБ", "ЭБ", "ЗБ", "ЙБ"]
      function roundUp(size) {
        if(size < 1024) {
          
          size = +size.toFixed(2) + ` ${units[i]}`
          return size
        }else{
          size /= 1024
          i++
          return roundUp(size)
        } 
      }
      return roundUp(size)
    }
  },
  methods: {
    select(){
      const {dirOrFile} = this
      this.$emit('fileSelected', dirOrFile)
    }
  }
};
</script>

<style lang="sass" scoped>
.file-name
  max-width: 217px
  overflow: hidden
  white-space: nowrap
.active, .active:hover
  background: gray
</style>