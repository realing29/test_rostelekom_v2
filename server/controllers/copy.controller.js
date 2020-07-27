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

  for (item of $set.itemList) {
    ncp(`${$set.path}/${item}`, `${$set.pathTo}/${item}`, callback)
  }

}