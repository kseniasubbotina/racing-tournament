import fb from '@/firebase/config.js'

export default {
  methods: {
    submit() {
      if (this.isLoggedIn) {
        if (this.championship.data.selectedFile) {
          this.uploadImage(this.championship.data.info.name).then(() => {
            this.sendQuery()
          })
        } else {
          this.sendQuery()
        }
      }
    },
    sendQuery() {
      fb.champsCollection
        .doc()
        .set({
          admin: this.$store.getters.userData.username,
          approved: false,
          moderators: [],
          info: this.championship.data.info,
          settings: this.championship.settings,
          calendar: this.championship.calendar
        })
        .then(this.$router.push('/championships'))
    },
    uploadImage(id) {
      return new Promise(resolve => {
        var uploadTask = fb.storageRef
          .child('championship_images/' + id + '/' + id)
          .put(this.championship.data.selectedFile)
        uploadTask.on('state_changed', snapshot => {
          this.imageLoading = true
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        })
        uploadTask.then(snapshot => {
          this.imageLoading = false
          console.log('Uploaded a file!')
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.championship.data.info.champImage = downloadURL
            resolve(downloadURL)
          })
        })
      })
    }
  }
}
