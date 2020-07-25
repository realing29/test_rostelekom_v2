<template lang="pug">
  b-container
    b-row 
      h1.title browsing directories
    b-row
      Panel(
        v-for="panel in panels" 
        :key="panel.id" 
        :panel="panel"
      )
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  async fetch({store, params}){
    await store.dispatch("disks");
  },
  computed: mapGetters(['disks', 'panels']),
};
</script>

<style lang="sass">
body
  background-color: #eaeaea
.title
  margin: 0 auto 10px auto
</style>
