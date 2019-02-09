import fb from '@/firebase/config.js'
import idGenerator from '@/mixins/generateId.js'

export default {
  methods: {
    // realtimeUpdate() {
    //   debugger
    //   fb.champsCollection
    //     .doc(this.championship.documentId)
    //     .onSnapshot(function(doc) {
    //       this.championship = null
    //       this.championship = doc.data()
    //     })
    // },
    getChampionship() {
      this.$store.commit('set', { type: 'loading', val: true })
      fb.champsCollection
        .where('info.name', '==', this.$route.params.id)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              this.championship = doc.data()
              this.championship.documentId = doc.id
            })
            // this.realtimeUpdate()
          } else {
            this.$router.push('/404')
          }
          this.$store.commit('set', { type: 'loading', val: false })
        })
    },
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
          id: idGenerator.generateId(),
          author: {
            username: this.$store.getters.userData.username,
            id: this.$store.getters.user.id
          },
          drivers: [],
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
    },
    approveChampionship(documentId) {
      fb.champsCollection
        .doc(documentId)
        .update({
          approved: true,
          rejectComment: ''
        })
        .then(this.getChampionship())
    },
    rejectChampionship(documentId, comment) {
      fb.champsCollection
        .doc(documentId)
        .update({
          approved: false,
          rejectComment: comment
        })
        .then((this.showRejectDialog = false), this.getChampionship())
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
        .catch(function(error) {
          console.error('Error removing document: ', error)
        })
    }
  }
}
