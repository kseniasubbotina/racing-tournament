import fb from '@/firebase/config.js'

export default {
  methods: {
    addResult(championship, stage, results) {
      this.isLoading = true
      fb.resultsCollection
        .doc(championship.documentId)
        .update({
          info: championship.info,
          [stage.trackDocumentId]: results
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