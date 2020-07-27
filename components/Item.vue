<template lang="pug">
b-tr.file(
  v-on:dblclick="$emit('openItem', item)",
  v-on:click="select",
  :class="{ active: item.selected }"
)
  b-th.file__ico
    b-icon(:icon="extension")
  b-th.file__name {{ item.name }}
  b-th.file__size {{ size }}
  b-th.file__mtime {{ mtime }}
</template>

<script>
export default {
  data() {
    return {
      selected: false,
    };
  },
  props: {
    item: Object,
  },
  computed: {
    mtime() {
      let [date, time] = this.item.mtime.split("T");

      time = time.slice(0, 5);
      time = time.split(":");
      time = time.join(":");
      date = date.split("-").reverse().join(".");
      return [date, time].join(" ");
    },
    extension() {
      const extensionDispatcher = {
        apt: "file-richtext",
        err: "file-richtext",
        log: "file-richtext",
        pwi: "file-richtext",
        sub: "file-richtext",
        ttf: "file-richtext",
        tex: "file-richtext",
        text: "file-richtext",
        txt: "file-richtext",
        doc: "file-richtext",
        docx: "file-richtext",
        _doc: "file-richtext",
        _docx: "file-richtext",
        docm: "file-richtext",
        xml: "file-richtext",
        html: "file-richtext",
        css: "file-richtext",
        js: "file-richtext",
        pdf: "file-richtext",
        jpg: "card-image",
        jpeg: "card-image",
        tif: "card-image",
        tiff: "card-image",
        png: "card-image",
        gif: "card-image",
        bmp: "card-image",
        dib: "card-image",
        jfif: "card-image",
        webp: "card-image",
        svg: "card-image",
        svgz: "card-image",
        eps: "card-image",
        wmf: "card-image",
        emf: "card-image",
        cdr: "card-image",
        cmx: "card-image",
        ai: "card-image",
        xar: "card-image",
        ico: "card-image",
        psd: "card-image",
        ecw: "card-image",
        ilbm: "card-image",
        tga: "card-image",
        ac3: "music-note",
        aif: "music-note",
        aiff: "music-note",
        amr: "music-note",
        aud: "music-note",
        flac: "music-note",
        iff: "music-note",
        m3u: "music-note",
        m3u8: "music-note",
        m4a: "music-note",
        m4a: "music-note",
        mid: "music-note",
        midi: "music-note",
        mod: "music-note",
        mp3: "music-note",
        mpa: "music-note",
        ogg: "music-note",
        ra: "music-note",
        ram: "music-note",
        sib: "music-note",
        wav: "music-note",
        wma: "music-note",
        "3g2": "film",
        "3gp": "film",
        asf: "film",
        asx: "film",
        avi: "film",
        bin: "film",
        dat: "film",
        f4v: "film",
        flv: "film",
        gtp: "film",
        m4v: "film",
        mkv: "film",
        mov: "film",
        mp4: "film",
        mpeg: "film",
        mpg: "film",
        mts: "film",
        rm: "film",
        rmvb: "film",
        srt: "film",
        swf: "film",
        ts: "film",
        vob: "film",
        webm: "film",
        wmv: "film",
        yuv: "film",
        apk: "terminal",
        bat: "terminal",
        cgi: "terminal",
        com: "terminal",
        exe: "terminal",
        gadget: "terminal",
        jar: "terminal",
        msi: "terminal",
        pif: "terminal",
        vb: "terminal",
        wsf: "terminal",
      };
      if (this.item.isDirectory) return "folder";
      return extensionDispatcher[this.item.extension];
    },
    size() {
      const size = this.item.size;

      if (!size) return "";

      const units = ["Б", "КБ", "МБ", "ГБ", "ТБ", "ПБ", "ЭБ", "ЗБ", "ЙБ"];
      let i = 0;

      function roundUp(size) {
        if (size < 1024) {
          size = +size.toFixed(2) + ` ${units[i]}`;
          return size;
        } else {
          size /= 1024;
          i++;
          return roundUp(size);
        }
      }
      return roundUp(size);
    },
  },
  methods: {
    select() {
      const { item } = this;

      this.$emit("itemSelected", item);
    },
  },
};
</script>

<style lang="sass" scoped>
.file
  cursor: pointer
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
.file__name
  max-width: 217px
  display: -webkit-box
  overflow: hidden
  line-clamp: 1
  -webkit-line-clamp: 1
  -webkit-box-orient: vertical
.file__ico, .file__name, .file__size, .file__mtime
  border: none
.active, .active:hover, 
  background: gray
</style>