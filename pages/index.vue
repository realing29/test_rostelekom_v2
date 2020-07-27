<template lang="pug">
b-container.main-container(fluid="md")
  b-row.panels-wraper
    Panel(v-for="panel in panels", :key="panel.id", :panel="panel")
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async fetch({ store, params }) {
    await store.dispatch("disks");
  },
  computed: mapGetters(["disks", "panels"]),
};
</script>

<style lang="sass">
*
  box-size: border-box
body
  background-color: #eaeaea
.main-container
  padding-top: 3%
.panels-wraper
  box-shadow: 0 1px 14px 0 rgba(0,0,0,.16)
  background: #e0e0e0
</style>
