import fb from '@/firebase/config.js'
import idGenerator from '@/mixins/generateId.js'

export default {
  methods: {
    leaveChampionship(championship, userId) {
      delete championship.drivers[userId]
      fb.champsCollection
        .doc(championship.documentId)
        .update({
          drivers: championship.drivers
        })
        .then({
          //
        })
    },
    selectTeam() {
      this.joinDialog = true
    },
    realtimeUpdate() {
      fb.champsCollection.doc(this.championship.documentId).onSnapshot(doc => {
        let data = doc.data()
        if (data) {
          this.championship.approved = data.approved
          this.championship.rejectComment = data.rejectComment
          this.championship.drivers = data.drivers
        } else {
          return
        }
      })
    },
    getChampionship(name) {
      let champName = name ? name : this.$route.params.id
      this.$store.commit('set', { type: 'loading', val: true })
      fb.champsCollection
        .where('info.name', '==', champName)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              this.championship = doc.data()
              this.championship.documentId = doc.id
            })
            this.realtimeUpdate()
          } else {
            this.$router.push('/404')
          }
          this.$store.commit('set', { type: 'loading', val: false })
        })
    },
    submit(type, documentId) {
      if (this.isLoggedIn) {
        if (this.championship.data.selectedFile) {
          this.uploadImage(this.championship.data.info.name).then(() => {
            if (type === 'set') {
              this.setQuery()
            } else if (type === 'update') {
              this.updateQuery(documentId)
            }
          })
        } else {
          if (type === 'set') {
            this.setQuery()
          } else if (type === 'update') {
            this.updateQuery(documentId)
          }
        }
      }
    },
    setQuery() {
      fb.champsCollection
        .doc()
        .set({
          id: idGenerator.generateId(),
          author: {
            username: this.$store.getters.userData.username,
            id: this.$store.getters.user.id
          },
          approved: false,
          moderators: [],
          info: this.championship.data.info,
          externalInfo: this.championship.externalInfo,
          settings: this.championship.settings,
          calendar: this.championship.calendar
        })
        .then(this.$router.push('/championships'))
    },
    updateQuery(documentId) {
      fb.champsCollection
        .doc(documentId)
        .update({
          info: this.championship.data.info,
          externalInfo: this.championship.externalInfo,
          settings: this.championship.settings,
          calendar: this.championship.calendar
        })
        .then(() => {
          this.$router.push(
            '/championships/' + this.championship.data.info.name
          )
        })
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
    },
    approveChampionship(documentId) {
      fb.champsCollection
        .doc(documentId)
        .update({
          approved: true,
          rejectComment: ''
        })
        .then()
    },
    rejectChampionship(documentId, comment) {
      fb.champsCollection
        .doc(documentId)
        .update({
          approved: false,
          rejectComment: comment
        })
        .then((this.showRejectDialog = false))
    },
    deleteChampionship(championship) {
      fb.champsCollection
        .doc(championship.documentId)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
          this.$router.push('/championships')
          if (championship.champImage) {
            fb.storageRef
              .child(
                'championship_images/' + championship.id + '/' + championship.id
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
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    }
  }
}
