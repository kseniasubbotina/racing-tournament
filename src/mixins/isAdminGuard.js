import fb from './../firebase/config.js'

export default {
  data() {
    return {
      isAdmin: false
    }
  },
  created: function() {
    this.checkPermission()
  },
  // watch: {
  //   userRole() {
  //     this.checkPermission()
  //   }
  // },
  computed: {
    userRole() {
      if (this.$store.getters.userData) {
        return this.$store.getters.userData.role
      }
    }
  },
  methods: {
    checkPermission() {
      this.$store.commit('set', { type: 'loading', val: true })
      var currentUser = this.$store.getters.user
      var userData = this.$store.getters.userData
      if (currentUser) {
        fb.usersCollection
          .where('id', '==', currentUser.id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              let data = doc.data()
              if (data.role === '1') {
                this.isAdmin = true
                this.$store.commit('set', { type: 'loading', val: false })
              } else {
                this.isAdmin = false
                this.$router.push('/')
              }
            })
          })
          .catch(err => {
            this.isAdmin = false
            this.$store.commit('setMessage', {
              type: 'error',
              text: err.message
            })
          })
      } else {
        this.$router.push('/')
      }
    }
  }
}
