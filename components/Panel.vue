<template lang="pug">
b-col.panel-container
  .panel 
    .header
      .field__disk
        Disk(
          v-for="disk in disks",
          :key="disk",
          :disk="disk",
          v-on:selected-disk="pathDisk"
        )
      .directory
        .parent-directory
          b-button(size="sm" v-on:click="pathParent")
            b-icon(icon="arrow-bar-up")
        .current-directory 
          span.path-string {{ path }}
    .list-file
      b-table-simple(v-if="directory.length" hover, small, caption-top, responsive, :sticky-header="tableHeigth")
        b-thead(head-variant="dark")
          b-tr.list-file
            b-th.list-file__icon Иконка
            b-th.list-file__name Имя
            b-th.list-file__size Размер
            b-th.list-file__modified-date Дата изменения
        b-tbody.list-file__body
          File.list-file__file.file(
            v-for="dirOrFile, index in directory"
            :dirOrFile="dirOrFile"
            :key="index"
            v-on:dbClickDir="openDir"
            v-on:fileSelected="fileSelected"
          )
      div.text-center(v-else-if="loading")
        b-spinner(variant="primary" label="Text Centered")
      div.alert-container(v-else)
        b-icon(icon="exclamation-circle" style="width: 120px; height: 120px;" variant="warning")
        b-alert(show variant="warning") Диск не доступен
    .footer
      b-button.button.copy(v-on:click="copy") Копировать
      b-button.button.move(v-on:click="move") Переместить
      b-button.button.delete(v-on:click="deletion") Удалить
</template>

<script>
import {mapGetters} from 'vuex'
import pth from 'path'
export default {
  async fetch(){
    const disks = this.$store.getters[`disks`]
    await this.$store.dispatch("directory", {path: disks[0], id: this.panel.id});
  },
  data(){
    return{
      clientHeight: '',
      fileSelectList: new Set(),
      loading: true
    }
  },
  props: {
    panel: Object
  },
  computed: {
    tableHeigth(){
      return `${(this.clientHeight * 0.8 - 200).toFixed()}px`
    },
    directory(){
      return this.$store.getters[`directory${this.panel.id}`]
    },
    path(){
      return this.$store.getters[`path${this.panel.id}`]
    },
    ...mapGetters(['disks'])
  },
  methods: {
    async pathDisk(disk) {
      try {
        await this.$store.dispatch("directory", {path: disk, id: this.panel.id});
      } catch (error) {
        console.log(error)
      }
    },
    async openDir(dirName){
      try {
        const path = `${this.path}/${dirName}`
        await this.$store.dispatch("directory", {path, id: this.panel.id});
      } catch (error) {
        console.log(error)
      }
    },
    async pathParent(){
      try {
        let path = this.path
        path = path.split("/")
        if(path.length > 1) path.pop()
        path = path.join("/")
        await this.$store.dispatch("directory", {path, id: this.panel.id});
      } catch (error) {
        console.log(error)
      }
    },
    fileSelected(file){
      this.$store.commit('updateFileSelectList', {id: this.panel.id, file})
    },
    async copy(){
      try {
        await this.$store.dispatch('copy', this.panel.id)
        const oppositeId = this.panel.id? 0 : 1
        const pathOpposite = this.$store.getters[`path${oppositeId}`]
        await this.$store.dispatch("directory", {path: pathOpposite, id: oppositeId})
      } catch (error) {
        console.log(error)
      }
    },
    async deletion(){
      await this.$store.dispatch('deletion', this.panel.id)
      await this.$store.dispatch("directory", {path: this.path, id: this.panel.id})
    },
    async move(ctx){
      const path0 = this.$store.getters[`path0`]
      const path1 = this.$store.getters[`path1`]
      const equalPaths = path0 === path1
      console.log(equalPaths)
      if(equalPaths) return
      await this.copy()
      await this.deletion()
    }
  },
  mounted(){
    this.clientHeight = document.documentElement.clientHeight
    window.addEventListener('resize', () => {
      this.clientHeight = document.documentElement.clientHeight
    })
  }
};
</script>

<style lang="sass" scoped>
.panel-container
  display: flex
  flex-direction: column
  align-items: stretch
  align-content: stretch
.panel
  flex-grow: 1
  flex-direction: column
  display: flex

div
  border: 1px dashed gray
  background: #e0e0e0
  padding: 5px
.field__disk
  display: flex
.directory
  display: flex
.current-directory
  display: flex
  align-items: center

.list-file
  flex-grow: 1
.list-file__body
  max-height: 800px
  overflow-y: scroll
.file
  cursor: pointer
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
.alert-container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  align-content: center
  height: 100%
  & .alert
    font-size: 35px

.footer
  display: flex
  .button
    margin-right: 10px
</style>