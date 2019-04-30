import fb from '@/firebase/config.js'

export default {
  methods: {
    addResult(championship, stage, results) {
      this.isLoading = true
      fb.champsCollection
        .doc(championship.documentId)
        .update({
          results: results
        })
        .then(
          this.isLoading = false,
          console.log('updated'),
          this.closeWindow(),
          this.$router.push(
            '/championships/' + championship.info.name
          )
        ).catch(function (error) {
          console.log(error)
        })
    }
  }
}
