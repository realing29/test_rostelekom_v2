const fs = require('fs')

module.exports.directory = async (req, res) => {
  try {
    const path = req.params.path.split('|').join('/') + '/'
    const dirIterable = await fs.promises.opendir(path);
    let dirName = []
    for await (const dirent of dirIterable) {
      dirName.push({ ...dirent });
    }
    let promisesStats = await Promise.allSettled(dirName.map(dir => {
      return fs.promises.lstat(path + dir.name)
    }))
    const dirNameStats = []
    for (index in promisesStats) {
      if (promisesStats[index].status === 'fulfilled')
        dirNameStats.push({ ...promisesStats[index].value, name: dirName[index].name })
    }
    res.json(dirNameStats)
  } catch (error) {
    res.status(500).json(error)
  }
}