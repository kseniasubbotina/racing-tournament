export default {
  computed: {
    isAdmin() {
      let getters = this.$store.getters
      return getters.user && getters.userData.role == '1' ? true : false
    }
  }
}