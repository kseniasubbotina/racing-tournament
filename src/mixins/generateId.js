export default {
  generateId() {
    var text = ''
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < 14; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  }
}
