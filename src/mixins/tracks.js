import fb from '@/firebase/config.js'

export default {
  methods: {
    addTrack() {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFiles.length) {
            Promise.all(
              this.selectedFiles.map(item =>
                this.uploadImage(this.trackData.id, item)
              )
            ).then(() => {
              fb.tracksCollection
                .doc(this.trackData.name)
                .set({
                  name: this.trackData.name,
                  country: this.trackData.country,
                  firstGP: this.trackData.firstGP,
                  length: this.trackData.length,
                  trackScheme: this.trackData.trackScheme,
                  trackPhoto: this.trackData.trackPhoto,
                  description: this.trackData.description
                })
                .then(this.closeWindow(), this.$emit('updateTracks'))
            })
          } else {
            fb.tracksCollection
              .doc(this.trackData.name)
              .set({
                name: this.trackData.name,
                country: this.trackData.country,
                firstGP: this.trackData.firstGP,
                length: this.trackData.length,
                description: this.trackData.description
              })
              .then(this.closeWindow(), this.$emit('updateTracks'))
          }
        }
      })
    },
    updateTrack(id) {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFiles.length) {
            Promise.all(
              this.selectedFiles.map(item =>
                this.uploadImage(this.trackData.id, item)
              )
            ).then(() => {
              fb.tracksCollection
                .doc(this.trackData.id)
                .update({
                  name: this.trackData.name,
                  country: this.trackData.country,
                  firstGP: this.trackData.firstGP,
                  length: this.trackData.length,
                  trackScheme: this.trackData.trackScheme,
                  trackPhoto: this.trackData.trackPhoto,
                  description: this.trackData.description
                })
                .then(this.closeWindow(), this.$emit('updateTracks'))
            })
          } else {
            if (this.selectedFile == null) {
              this.trackData.imageUrl = ''
            }
            fb.tracksCollection
              .doc(id)
              .update({
                name: this.trackData.name,
                country: this.trackData.country,
                firstGP: this.trackData.firstGP,
                length: this.trackData.length,
                trackScheme: this.trackData.trackScheme,
                trackPhoto: this.trackData.trackPhoto,
                description: this.trackData.description
              })
              .then(this.closeWindow())
          }
        }
      })
    },
    uploadImage(id, file) {
      return new Promise(resolve => {
        var uploadTask = fb.storageRef
          .child('tracks_images/' + id + '/' + id + '_' + file.trackImageType)
          .put(file)
        uploadTask.on('state_changed', snapshot => {
          this.imageLoading = true
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        })
        uploadTask.then(snapshot => {
          this.imageLoading = false
          console.log('Uploaded a file!')
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.trackData[file.trackImageType] = downloadURL
            resolve(downloadURL)
          })
        })
      })
    },
    deleteImage(type) {
      if (this.trackData[type]) {
        this.trackData[type] = ''
        fb.storageRef
          .child(
            'tracks_images/' +
              this.trackData.id +
              '/' +
              this.trackData.id +
              '_' +
              type
          )
          .delete()
          .then(() => {
            this.$store.commit('setMessage', {
              type: 'success',
              text: 'The image has been deleted from server.'
            })
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
}
