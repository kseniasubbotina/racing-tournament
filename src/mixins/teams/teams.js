import fb from '@/firebase/config.js'
import idGenerator from '@/mixins/generateId'

export default {
  methods: {
    addTeam() {
      this.$validator.validate().then(result => {
        if (result) {
          var id = this.teamData.name + '_' + idGenerator.generateId()
          if (this.selectedFile) {
            const upload = async id => {
              let upload = await this.uploadTeamLogo(
                this.teamData.name,
                this.selectedFile
              )
            }
            upload().then(() => {
              fb.teamsCollection
                .doc(id)
                .set({
                  name: this.teamData.name,
                  id: id,
                  seria: this.teamData.seria,
                  places: this.teamData.places,
                  teamLogo: this.teamData.teamLogo
                })
                .then(this.closeDialog(), this.$emit('updateTeams'))
            })
          } else {
            fb.teamsCollection
              .doc(id)
              .set({
                name: this.teamData.name,
                id: id,
                seria: this.teamData.seria,
                places: this.teamData.places,
                teamLogo: this.teamData.teamLogo
              })
              .then(this.closeDialog(), this.$emit('updateTeams'))
          }
        }
      })
    },
    updateTeam(teamData) {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFile) {
            const upload = async () => {
              let upload = await this.uploadTeamLogo(
                this.teamData.id,
                this.selectedFile
              )
            }
            upload().then(() => {
              fb.teamsCollection
                .doc(this.teamData.documentId)
                .update({
                  name: this.teamData.name,
                  seria: this.teamData.seria,
                  places: this.teamData.places,
                  teamLogo: this.teamData.teamLogo
                })
                .then(this.closeDialog(), this.$emit('updateTeams'))
            })
          } else {
            fb.teamsCollection
              .doc(teamData.documentId)
              .update({
                name: this.teamData.name,
                seria: this.teamData.seria,
                places: this.teamData.places,
                teamLogo: this.teamData.teamLogo
              })
              .then(this.closeDialog(), this.$emit('updateTeams'))
          }
        }
      })
    },
    uploadTeamLogo(id, file) {
      return new Promise(resolve => {
        var uploadTask = fb.storageRef
          .child('team_logos/' + id + '/' + id + '_logo')
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
            this.teamData.teamLogo = downloadURL
            resolve(downloadURL)
          })
        })
      })
    },
    deleteTeamLogo() {
      let teamData = this.teamData
      if (teamData.teamLogo) {
        teamData.teamLogo = ''
        fb.storageRef
          .child('team_logos/' + teamData.id + '/' + teamData.id + '_logo')
          .delete()
          .then(() => {
            this.$store.commit('setMessage', {
              type: 'success',
              text: 'The image has been deleted from server.'
            })
            this.updateTeam(teamData)
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
