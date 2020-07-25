<template lang="pug">
  .disk(v-on:click="$emit('selected-disk', disk)")
    i.disk__img
    span.disk__name {{disk}}
</template>

<script>
export default {
  props: {
    disk: String
  }
};
</script>

<style lang="sass" scoped>
.disk
  display: flex
  align-items: center
  &__img
    width: 30px
    height: 30px
    background: url('/Removable.png') center 
    background-size: contain
  &__name
    line-height: 30px
    height: 30px
    vertical-align: middle
</style>