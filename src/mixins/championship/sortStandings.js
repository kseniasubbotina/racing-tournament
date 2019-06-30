export default {
  methods: {
    sortStandings(results) {
      let resultsArr = Object.values(results)
      // sum all stages points and add it to the 'totalPts' property
      resultsArr.forEach(function (user) {
        let stagesArr = Object.values(user)
        let totalPts = 0
        let totalExp = 0
        stagesArr.forEach(function (stage) {
          if (stage.points) {
            totalPts += Number(stage.points)
          }
          if (stage.experience) {
            totalExp += Number(stage.experience)
          }
        })
        user.totalExp = totalExp
        user.totalPts = totalPts
      })
      resultsArr = resultsArr.filter(user => Object.values(user)[0].bestLapTime !== undefined)
      // sort by total pts
      resultsArr.sort(this.compare)

      return resultsArr
    },
    compare(a, b) {
      if (a.totalPts && b.totalPts) {
        if (a.totalPts > b.totalPts)
          return -1
        if (a.totalPts < b.totalPts)
          return 1
        return 0
      }
    }
  }
}