function isFileType(file) {
  let fileExtension = file.name.match(/\.([^\.]+$)/)
  if (!fileExtension) return null
  fileExtension = fileExtension[1]
  return fileExtension
}

export const state = () => ({
  panels: [
    {
      id: 0,
      path: '',
      directory: [],
      fileSelectList: new Set()
    },
    {
      id: 1,
      path: '',
      directory: [],
      fileSelectList: new Set()
    }
  ],
  disks: []
})

export const actions = {
  async disks(ctx) {
    try {
      const buffer = await this.$axios.$get('/api/disks')
      const disksRegexp = /Caption=+(.*)/g
      const [...disksGroup] = buffer.matchAll(disksRegexp)
      const disks = []
      for (const disk of disksGroup) {
        disks.push(disk[1])
      }
      ctx.commit('updateDisks', disks)
    } catch (error) {
      console.log(error)
    }
  },
  async directory(ctx, { path, id }) {
    try {
      path = path.split("/").join("|")
      let directoryList = await this.$axios.$get(`/api/directory/${path}`)
      this.commit("clearFileSelectList", id)

      let i = 0
      directoryList = directoryList.map(item => {
        item.selected = false
        item.id = i++
        item.extension = isFileType(item)
        return { ...item }
      })
      ctx.commit('updateDirectory', { id, directoryList })
      path = path.split("|").join("/")
      ctx.commit('updatePath', { id, path })
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async copy(ctx, id) {
    const itemList = ctx.getters[`fileSelectedList${id}`]
    if (!itemList.size) throw new Error('файлы не выбраны')

    const oppositeId = id ? 0 : 1
    const pathTo = ctx.getters[`path${oppositeId}`]
    const path = ctx.getters[`path${id}`]

    try {
      const setConvertForJSON = { pathTo, path, itemList: [...itemList] }
      await this.$axios.$put(`/api/copy`, { data: setConvertForJSON })
    } catch (error) {
      console.log(error)
    }

  },
  async deletion(ctx, id) {
    try {
      const itemList = ctx.getters[`fileSelectedList${id}`]
      const path = ctx.getters[`path${id}`]
      const setConvertForJSON = { path, itemList: [...itemList] }
      await this.$axios.$delete(`/api/deletion`, { data: setConvertForJSON })
      this.commit("clearFileSelectList", id)
    } catch (error) {
      console.log(error)
    }

  }
}

export const mutations = {
  updateDirectory(state, { id, directoryList }) {
    state.panels[id].directory = directoryList
  },
  updateDisks(state, disks) {
    state.disks = disks
  },
  updatePath(state, { id, path }) {
    state.panels[id].path = path
  },
  updateItemSelectList(state, { id, file }) {
    const isFile = state.panels[id].fileSelectList.has(file.name)
    if (isFile) {
      state.panels[id].fileSelectList.delete(file.name)
      state.panels[id].directory[file.id].selected = false
    } else {
      state.panels[id].fileSelectList.add(file.name)
      state.panels[id].directory[file.id].selected = true
    }
  },
  clearFileSelectList(state, id) {
    state.panels[id].fileSelectList = new Set()
  }
}

export const getters = {
  panels: state => state.panels,
  panel0: state => state.panels[0],
  panel1: state => state.panels[1],
  directory0: (state) => state.panels[0].directory,
  directory1: state => state.panels[1].directory,
  path0: state => state.panels[0].path,
  path1: state => state.panels[1].path,
  fileSelectedList0: state => state.panels[0].fileSelectList,
  fileSelectedList1: state => state.panels[1].fileSelectList,
  disks: state => state.disks
}