export default {
  data() {
    return {
      finishExperience: {
        '1': 25,
        '2': 18,
        '3': 15,
        '4': 12,
        '5': 10,
        '6': 8,
        '7': 6,
        '8': 4,
        '9': 2,
        '10': 1
      },
      qualyExperience: {
        '1': 10,
        '2': 9,
        '3': 8,
        '4': 7,
        '5': 6,
        '6': 5,
        '7': 4,
        '8': 3,
        '9': 2,
        '10': 1
      }
    }
  },
  computed: {
    raceExperience() {
      var experience = 0
      var teammateId = this.teammate ? this.teammate.userId : null
      var stageId = this._stage.trackDocumentId
      if (teammateId && this._results[teammateId]) {
        var teammateStart = this._results[teammateId][stageId] ? Number(this._results[teammateId][stageId].start) : 0
        var teammateFinish = this._results[teammateId][stageId] ? Number(this._results[teammateId][stageId].finish) : 0
      }
      const result = this._results[this._driver.userId] && this._results[this._driver.userId][stageId] ? this._results[this._driver.userId][stageId] : this.result

      var driverStart = Number(result.start) || 0
      var driverFinish = Number(result.finish) || 0
      var posDiff = result.posDiff || 0
      // points for qualy
      if (driverStart && driverStart <= 10) {
        experience = experience + this.qualyExperience[driverStart]
      }
      // points for race
      if (driverStart && driverFinish) {
        experience = experience + 1
        if (driverFinish <= 10) {
          experience = experience + this.finishExperience[driverFinish]
        }
      }
      // points for fastest lap
      if (this.isBestLap) {
        experience = experience + 5
      }
      // ahead of a teammate in q
      if (teammateStart && driverStart && driverStart < teammateStart) {
        experience = experience + 2
      }
      // ahead of a teammate in race
      if (teammateFinish && driverFinish < teammateFinish) {
        experience = experience + 3
      }
      // 1 point for finished a race 
      if (!this.result.dq && !this.result.dnf && !this.result.dns && this.finish) {
        experience = experience + 1
      }
      // points for lost positions
      if (posDiff <= 0) {
        if (Number(driverStart) <= 10) {
          if (posDiff < -5) {
            experience = experience - 10
          } else {
            experience = experience + posDiff * 2
          }
        } else {
          if (Number(driverStart) > 10) {
            if (posDiff < -5) {
              experience = experience - 5
            } else {
              experience = experience + posDiff
            }
          }
        }
        // points for gain positions
      } else {
        if (posDiff > 5) {
          experience = experience + 10
        } else {
          experience = experience + posDiff * 2
        }
      }
      // this.$emit('experienceChanged', experience)
      return experience
    }
  }
}