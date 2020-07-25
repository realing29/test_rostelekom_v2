const ncp = require('ncp').ncp;

module.exports.copy = async (req, res) => {
  const $set = req.body.data
  function callback(err) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json()
    }

  }

  for (file of $set.fileList) {
    ncp(`${$set.path}/${file}`, `${$set.pathTo}/${file}`, callback)
  }

}