import fb from '@/firebase/config.js'

export default {
  methods: {
    update(userId, username, country, avatarURL, role) {
      this.$store.commit('set', { type: 'loading', val: true })
      if (this.selectedFile) {
        var uploadTask = fb.storageRef
          .child('users_avatars/' + userId)
          .put(this.selectedFile)
        uploadTask.on('state_changed', snapshot => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          this.loadingProgress = progress
        })
        uploadTask.then(snapshot => {
          console.log('Uploaded a file!')
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.$store.dispatch('updateProfile', {
              userId: userId,
              country: country,
              username: username,
              avatarURL: downloadURL,
              role: role
            })
            this.$store.dispatch('fetchUserData')
            this.$store.commit('set', { type: 'loading', val: false })
          })
        })
      } else {
        this.$store.dispatch('updateProfile', {
          userId: userId,
          country: country,
          username: username,
          avatarURL: avatarURL,
          role: role
        })
        this.$store.dispatch('fetchUserData')
        this.$store.commit('set', { type: 'loading', val: false })
      }
    },
    deleteAvatar(userData) {
      fb.storageRef
        .child('users_avatars/' + userData.id)
        .delete()
        .then(() => {
          this.$store.commit('setMessage', {
            type: 'success',
            text: 'The image has been deleted from server.'
          })
          this.$emit('imageDeleted')
          this.update(
            userData.id,
            userData.username,
            userData.country,
            userData.avatarURL,
            userData.role
          )
        })
        .catch(error => {
          console.log(error)
          this.$store.commit('setMessage', {
            type: 'error',
            text: error.message
          })
        })
    }
  }
}
