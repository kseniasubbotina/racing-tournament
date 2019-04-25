import fb from '@/firebase/config.js'

export default {
  methods: {
    addResult(championship, stage, results) {
      this.isLoading = true
      fb.champsCollection
        .doc(championship.documentId)
        .update({
          results: {
            championshipInfo: championship.info,
            [stage.trackDocumentId]: results
          }
        })
        .then(
          this.isLoading = false,
          console.log('updated'),
          this.closeWindow()
        ).catch(function (error) {
          console.log(error)
        })
    }
  }
}