const fs = require('fs')

module.exports.directory = async (req, res) => {
  try {
    const path = req.params.path.split('|').join('/') + '/'
    const directoryIterable = await fs.promises.opendir(path);
    let itemsNameList = []

    for await (const name of directoryIterable) {
      itemsNameList.push({ ...name });
    }

    let promisesListStats = await Promise.allSettled(
      itemsNameList.map(item => {
        return fs.promises.lstat(path + item.name)
      }
      )
    )

    const itemsNameStats = []

    for (index in promisesListStats) {
      if (promisesListStats[index].status === 'fulfilled')
        itemsNameStats.push({
          ...promisesListStats[index].value,
          name: itemsNameList[index].name,
          isDirectory: promisesListStats[index].value.isDirectory()
        })
    }
    res.json(itemsNameStats)
  } catch (error) {
    res.status(500).json(error)
  }
}