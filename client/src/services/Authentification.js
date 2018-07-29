import Api from '@/services/Api.js'

export default {
  register () {
    return Api().get('races')
  }
}
