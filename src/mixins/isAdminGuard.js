import fb from './../firebase/config.js'

export default {
  data () {
    return {
      isAdmin: false
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      var currentUser = this.$store.getters.user
      if (currentUser) {
        fb.usersCollection.doc(currentUser.id).get().then(res => {
          let data = res.data()
          if (data.role === '1') {
            this.isAdmin = true
          } else {
            this.isAdmin = false
            this.$router.push('/')
          }
        }).catch(err => {
          this.isAdmin = false
          this.$store.commit('setMessage', { type: 'error', text: err.message })
        })
      } else {
        this.$router.push('/')
      }
    })
  }
}
