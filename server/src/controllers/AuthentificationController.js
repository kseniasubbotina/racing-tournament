module.exports = {
  register (req, res) {
    res.send({
      message: 'Hi ' + req.body.email + ' your password ' + req.body.password
    })
  }
}
