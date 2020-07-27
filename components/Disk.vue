<template lang="pug">
b-button.disk-button(v-on:click="$emit('selected-disk', disk)")
  .disk-button__container
    i.disk-button__img
    span.disk-button__name {{ disk }}
</template>

<script>
export default {
  props: {
    disk: String,
  },
};
</script>

<style lang="sass" scoped>
.disk-button
  background: inherit
  border: none
  &:hover
    background: #3072c4
    filter: grayscale(100%)
    -webkit-filter: grayscale(80%);
    transition: .3s
  &__container
    display: flex
    align-items: center
    color: white;
    cursor: pointer
  &__img
    width: 30px
    height: 30px
    background: url('/Removable.png') center 
    background-size: contain
    margin-right: 3px;
  &__name
    line-height: 30px
    height: 30px
    vertical-align: middle
</style>