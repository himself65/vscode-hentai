const content = require('./static/illusts')
module.exports = (req, res) => {
  res.status(200).json(content)
}
