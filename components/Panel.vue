<template lang="pug">
b-col.panel-container
  .panel 
    .panel__header
      .panel__disk-container
        Disk(
          v-for="disk in disks",
          :key="disk",
          :disk="disk",
          v-on:selected-disk="openDisk"
        )
      .panel__directory
        .panel__parent-directory
          b-button.panel__button-parent(size="sm", v-on:click="openParent")
            b-icon(icon="arrow-bar-up")
        .panel__path
          span {{ path }}
    .panel__list-item
      b-table-simple(
        v-if="directory.length",
        hover,
        small,
        caption-top,
        responsive,
        :sticky-header="tableHeigth",
        no-border-collapse
      )
        b-thead(head-variant="dark")
          b-tr
            b-th 
            b-th Имя
            b-th Размер
            b-th Дата изменения
        b-tbody.panel__list-item-body
          Item(
            v-for="item in directory",
            :item="item",
            :key="item.id",
            v-on:openItem="openItem",
            v-on:itemSelected="itemSelected"
          )
      .alert-container(v-else)
        b-alert.text-center(show, variant="light") Пусто
    .panel__footer
      b-button.panel__footer-button(v-on:click="copy", size="sm") Копировать
      b-button.panel__footer-button(v-on:click="move", size="sm") Переместить
      b-button.panel__footer-button(v-on:click="deletion", size="sm") Удалить
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async fetch() {
    const disks = this.$store.getters[`disks`];
    await this.$store.dispatch("directory", {
      path: disks[0],
      id: this.panel.id,
    });
  },
  data() {
    return {
      clientHeight: "",
      loading: true,
    };
  },
  props: {
    panel: Object,
  },
  computed: {
    tableHeigth() {
      return `${(this.clientHeight * 0.8 - 200).toFixed()}px`;
    },
    directory() {
      return this.$store.getters[`directory${this.panel.id}`];
    },
    path() {
      return this.$store.getters[`path${this.panel.id}`];
    },
    ...mapGetters(["disks"]),
  },
  methods: {
    async openDisk(disk) {
      try {
        await this.$store.dispatch("directory", {
          path: disk,
          id: this.panel.id,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async openItem({ name: dirName, isDirectory }) {
      if (!isDirectory) return;
      try {
        const path = `${this.path}/${dirName}`;

        await this.$store.dispatch("directory", { path, id: this.panel.id });
      } catch (error) {
        console.log(error);
      }
    },
    async openParent() {
      try {
        let path = this.path;
        path = path.split("/");
        if (path.length > 1) path.pop();
        path = path.join("/");
        await this.$store.dispatch("directory", { path, id: this.panel.id });
      } catch (error) {
        console.log(error);
      }
    },
    itemSelected(file) {
      this.$store.commit("updateItemSelectList", { id: this.panel.id, file });
    },
    async copy() {
      try {
        await this.$store.dispatch("copy", this.panel.id);

        const oppositeId = this.panel.id ? 0 : 1;
        const pathOpposite = this.$store.getters[`path${oppositeId}`];
        await this.$store.dispatch("directory", {
          path: pathOpposite,
          id: oppositeId,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deletion() {
      await this.$store.dispatch("deletion", this.panel.id);
      await this.$store.dispatch("directory", {
        path: this.path,
        id: this.panel.id,
      });
    },
    async move(ctx) {
      const path0 = this.$store.getters[`path0`];
      const path1 = this.$store.getters[`path1`];
      const equalPaths = path0 === path1;
      if (equalPaths) return;
      await this.copy();
      await this.deletion();
    },
  },
  mounted() {
    this.clientHeight = document.documentElement.clientHeight;
    window.addEventListener("resize", () => {
      this.clientHeight = document.documentElement.clientHeight;
    });
  },
};
</script>

<style lang="sass" scoped>
.panel-container
  display: flex
  flex-direction: column
  align-items: stretch
  align-content: stretch
  padding: 0
  min-width: 320px  
  &:not(:last-child)
    border-right: 5px solid gray 
.panel
  flex-grow: 1
  flex-direction: column
  display: flex
  padding: 0
  background: #eaeaea
  &__header
    background: #3072c4
  &__header, &__footer, &__directory
    padding: 5px
  &__disk-container
    display: flex
  &__directory
    display: flex
  &__path
    background: #e0e0e0
    flex-grow: 1
    padding-left: 3px
    margin: 4px 0

  &__button-parent
    margin-right: 3px

  &__list-item
    flex-grow: 1
    background: white
  &__list-item-body
    overflow-y: scroll
    background: white

  &__footer
    display: flex
    flex-wrap: wrap
    background: #eaeaea
  &__footer-button
    margin: 5px
</style>