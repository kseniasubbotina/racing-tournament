import fb from './../firebase/config.js'

export default {
  data () {
    return {
      isAdmin: false
    }
  },
  created: function () {
    this.checkPermission()
  },
  watch: {
    userRole () {
      this.checkPermission()
    }
  },
  computed: {
    userRole () {
      if (this.$store.getters.userData) {
        return this.$store.getters.userData.role
      }
    }
  },
  methods: {
    checkPermission () {
      this.$store.commit('set', { type: 'loading', val: true })
      var currentUser = this.$store.getters.user
      if (currentUser) {
        fb.usersCollection.doc(currentUser.id).get().then(res => {
          let data = res.data()
          if (data.role === '1') {
            this.isAdmin = true
            this.$store.commit('set', { type: 'loading', val: false })
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
    }
  }
}
