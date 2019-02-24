import fb from '@/firebase/config.js'

export default {
  watch: {
    $route() {
      this.getGame()
    }
  },
  methods: {
    addGame() {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFile) {
            const upload = async id => {
              let upload = await this.uploadImage(this.gameData.name)
            }
            upload().then(() => {
              this.setQuery()
            })
          } else {
            this.setQuery()
          }
        }
      })
    },
    updateGame(gameData) {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFile) {
            const upload = async () => {
              let upload = await this.uploadImage(gameData.id)
            }
            upload().then(() => {
              this.updateQuery(gameData)
            })
          } else {
            this.updateQuery(gameData)
          }
        }
      })
    },
    setQuery() {
      fb.gamesCollection
        .doc()
        .set({
          name: this.gameData.name,
          id: this.gameData.name,
          releaseDate: this.gameData.releaseDate,
          platforms: this.gameData.platforms,
          developer: this.gameData.developer,
          publisher: this.gameData.publisher,
          coverImageUrl: this.gameData.coverImageUrl,
          webSite: this.gameData.webSite
        })
        .then(this.closeWindow(), this.$emit('updateGames'))
    },
    updateQuery(gameData) {
      fb.gamesCollection
        .doc(gameData.documentId)
        .update({
          name: gameData.name,
          releaseDate: gameData.releaseDate,
          platforms: gameData.platforms,
          developer: gameData.developer,
          publisher: gameData.publisher,
          coverImageUrl: gameData.coverImageUrl,
          webSite: gameData.webSite
        })
        .then(() => {
          if (this.$route.params.id) {
            this.$router.push('/games/' + gameData.name)
          }
          this.closeWindow(), this.$emit('updateGames')
        })
    },
    uploadImage(id) {
      return new Promise(resolve => {
        var uploadTask = fb.storageRef
          .child('games_images/' + id)
          .put(this.selectedFile)
        uploadTask.on('state_changed', snapshot => {
          this.imageLoading = true
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        })
        uploadTask.then(snapshot => {
          this.imageLoading = false
          console.log('Uploaded a file!')
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.gameData.coverImageUrl = downloadURL
            resolve(downloadURL)
          })
        })
      })
    },
    deleteImage() {
      let gameData = this.gameData
      if (gameData.coverImageUrl) {
        gameData.coverImageUrl = ''
        fb.storageRef
          .child('games_images/' + gameData.id)
          .delete()
          .then(() => {
            this.$store.commit('setMessage', {
              type: 'success',
              text: 'The image has been deleted from server.'
            })
            this.updateGame(gameData)
            this.$emit('imageDeleted')
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
