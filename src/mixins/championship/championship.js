import fb from '@/firebase/config.js'

export default {
  methods: {
    submit() {
      if (this.championship.data.selectedFile) {
        this.uploadImage(this.championship.data.info.name).then(() => {
          fb.champsCollection
            .doc(this.championship.data.info.name)
            .set({
              info: this.championship.data.info,
              settings: this.championship.settings,
              calendar: this.championship.calendar
            })
            .then(this.$router.push('/championships'))
        })
      } else {
        fb.champsCollection()
          .doc(this.championship.data.info.name)
          .set({
            name: this.championship.data.info.name
          })
          .then()
      }
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
            this.championship.data.info.imageUrl = downloadURL
            resolve(downloadURL)
          })
        })
      })
    }
  }
}
