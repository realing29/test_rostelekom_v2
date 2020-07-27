const rimraf = require("rimraf");

module.exports.deletion = async (req, res) => {
  const $set = req.body

  function callback(err) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json()
    }

  }

  for (item of $set.itemList) {
    rimraf(`${$set.path}/${item}`, callback)
  }

}