import fb from '@/firebase/config.js'

export default {
  watch: {
    $route() {
      this.getTrack()
    }
  },
  methods: {
    getTrack() {
      this.$store.commit('set', { type: 'loading', val: true })
      fb.tracksCollection
        .where('name', '==', this.$route.params.id)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              this.trackData = doc.data()
              this.trackData.documentId = doc.id
            })
          } else {
            this.$router.push('/404')
          }
          this.$store.commit('set', { type: 'loading', val: false })
        })
    },
    addTrack() {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFiles.length) {
            Promise.all(
              this.selectedFiles.map(item =>
                this.uploadImage(this.trackData.name, item)
              )
            ).then(() => {
              this.setQuery()
            })
          } else {
            this.setQuery()
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
              this.updateQuery(id)
            })
          } else {
            this.updateQuery(id)
          }
        }
      })
    },
    setQuery() {
      fb.tracksCollection
        .doc()
        .set({
          name: this.trackData.name,
          id: this.trackData.name,
          country: this.trackData.country,
          firstGP: this.trackData.firstGP,
          length: this.trackData.length,
          trackScheme: this.trackData.trackScheme,
          trackPhoto: this.trackData.trackPhoto,
          description: this.trackData.description
        })
        .then(this.closeWindow(), this.$emit('updateTracks'))
    },
    updateQuery(id) {
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
        .then(() => {
          if (this.$route.params.id) {
            this.$router.push('/tracks/circuit_' + this.trackData.name)
          }
          this.closeWindow(), this.$emit('updateTracks')
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
      let trackData = this.trackData
      if (trackData[type]) {
        trackData[type] = ''
        fb.storageRef
          .child(
            'tracks_images/' + trackData.id + '/' + trackData.id + '_' + type
          )
          .delete()
          .then(() => {
            this.$store.commit('setMessage', {
              type: 'success',
              text: 'The image has been deleted from server.'
            })
            this.updateTrack(trackData.documentId)
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
