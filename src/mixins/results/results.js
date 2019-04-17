import fb from '@/firebase/config.js'

export default {
  methods: {
    addResult(championship, stage, results) {
      debugger
      fb.resultsCollection
        .doc(championship.documentId)
        .set({
          [stage.trackDocumentId]: results
        })
        .then(console.log('updated'))
    }
  }
}