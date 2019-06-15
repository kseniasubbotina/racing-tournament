import fb from '@/firebase/config.js'
import idGenerator from '@/mixins/generateId.js'
import convertDateTime from '@/mixins/convertDateTime.js'

export default {
  methods: {
    leaveChampionship(championship, drivers, userId) {
      delete drivers[userId]
      let driversIds = this._driversIds || []
      let indexToRemove = driversIds.indexOf(userId)
      driversIds.splice(indexToRemove, 1)
      fb.champsCollection
        .doc(championship.documentId)
        .update({
          drivers: drivers,
          driversIds: driversIds
        })
        .then(() => {
          this.$router.push('/championships/' + championship.info.name)
          // this.getChampionship()
        })
    },
    selectTeam() {
      this.joinDialog = true
    },
    realtimeUpdate() {
      fb.champsCollection.doc(this.championship.documentId).onSnapshot(doc => {
        let data = doc.data().championship
        let drivers = doc.data().drivers
        let driversIds = doc.data().driversIds
        if (data) {
          this.championship.approved = data.approved
          this.championship.rejectComment = data.rejectComment
          this.drivers = drivers
          this.driversIds = driversIds
        } else {
          return
        }
      })
    },
    queryTest() {
      // let userId = 'PwB8F0BqTvZ6qnVf7tCv1ES5uEX2'
      let champId = 'championship_yhRmKbmwnCFhsl'
      fb.champsCollection
        .doc(champId)
        .get()
        .then(doc => {
          console.log(doc.data())
          // querySnapshot.forEach(doc => {
          //   debugger
          // })
        })
    },
    getChampionship(name) {
      let champName = name ? name : this.$route.params.id
      this.$store.commit('set', { type: 'loading', val: true })
      fb.champsCollection
        .where('championship.info.name', '==', champName)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              let championship = doc.data().championship
              let drivers = doc.data().drivers
              let driversIds = doc.data().driversIds
              let results = doc.data().results
              championship.documentId = doc.id
              let calendar = championship.calendar
              for (let i in calendar) {
                let stage = calendar[i]
                championship.calendar[i].date = this.dateTimeToBrowser(stage.date, stage.time, 'date')
                championship.calendar[i].time = this.dateTimeToBrowser(stage.date, stage.time, 'time')
              }
              this.drivers = drivers
              this.driversIds = driversIds
              this.championship = championship || null
              this.results = results
            })
            this.realtimeUpdate()
          } else {
            this.$router.push('/404')
            this.$store.commit('set', { type: 'loading', val: false })
          }
          this.$store.commit('set', { type: 'loading', val: false })
        })
    },
    submit(type, documentId) {
      if (this.isLoggedIn) {
        let calendar = this.championship.calendar
        for (let i in calendar) {
          let stage = calendar[i]
          stage.date = this.dateTimeToUtc(stage.date, stage.time, 'date')
          stage.time = this.dateTimeToUtc(stage.date, stage.time, 'time')
        }
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
      var id = 'championship_' + idGenerator.generateId()
      fb.champsCollection
        .doc(id)
        .set({
          championship: {
            id: id,
            author: {
              username: this.$store.getters.userData.username,
              id: this.$store.getters.user.id
            },
            approved: false,
            status: 'In progress',
            moderators: [],
            info: this.championship.data.info,
            externalInfo: this.championship.externalInfo,
            settings: this.championship.settings,
            calendar: this.championship.calendar
          },
          results: {}
        })
        .then(this.$router.push('/championships'))
    },
    updateQuery(documentId) {
      fb.champsCollection
        .doc(documentId)
        .update({
          championship: {
            id: this.championship.id,
            author: {
              username: this.$store.getters.userData.username,
              id: this.$store.getters.user.id
            },
            approved: this.championship.approved,
            status: this.championship.status,
            moderators: this.championship.moderators,
            info: this.championship.data.info,
            externalInfo: this.championship.externalInfo,
            settings: this.championship.settings,
            calendar: this.championship.calendar
          }
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
    approveChampionship(championship) {
      this.$set(championship, 'approved', true)
      this.$set(championship, 'rejectComment', '')
      fb.champsCollection
        .doc(championship.documentId)
        .update({
          championship: championship
        })
        .then()
    },
    rejectChampionship(championship, comment) {
      this.$set(championship, 'approved', false)
      this.$set(championship, 'rejectComment', comment)
      fb.champsCollection
        .doc(championship.documentId)
        .update({
          championship: championship
        })
        .then((this.showRejectDialog = false))
    },
    deleteChampionship(championship) {
      fb.champsCollection
        .doc(championship.documentId)
        .update({
          championship: fb.firestore.FieldValue.delete()
        })
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
    },
    getResults() {
      this.$store.commit('set', { type: 'loading', val: true })
      fb.resultsCollection
        .doc(this.championship.id)
        .get()
        .then(doc => {
          this.$set(this.championship, 'results', doc.data())
          this.$store.commit('set', { type: 'loading', val: false })
        }).catch(error => {
          console.log('error with getting results')
          this.$store.commit('set', { type: 'loading', val: false })
        })
    }
  },
  mixins: [
    convertDateTime
  ]
}
