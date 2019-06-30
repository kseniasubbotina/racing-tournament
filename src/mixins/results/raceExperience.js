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
  methods: {
    calcExperience() {
      var score = 0
      var teammateId = this.teammate ? this.teammate.userId : null
      var stageId = this._stage.trackDocumentId
      if (teammateId && this._results[teammateId]) {
        var teammateStart = this._results[teammateId][stageId] ? this._results[teammateId][stageId].start : 0
        var teammateFinish = this._results[teammateId][stageId] ? this._results[teammateId][stageId].finish : 0
      }
      const result = this._results[this._driver.userId] && this._results[this._driver.userId][stageId] ? this._results[this._driver.userId][stageId] : this.result

      var driverStart = result.start || 0
      var driverFinish = result.finish || 0
      var posDiff = result.posDiff || 0
      if (driverStart <= 10 && driverFinish <= 10) {
        score = score + this.qualyExperience[driverStart] + this.finishExperience[driverFinish]
      }
      if (this.isBestLap) {
        score = score + 5
      }

      if (teammateStart && driverStart < teammateStart) {
        score = score + 2
      }
      if (teammateFinish && teammateFinish < teammateFinish) {
        score = score + 3
      }
      if (!this.result.dq && !this.result.dnf && !this.result.dns && this.finish) {
        score = score + 1
      }

      if (posDiff <= 0) {
        if (Number(driverStart) <= 10) {
          if (posDiff < -5) {
            score = score - 10
          } else {
            score = score + posDiff * 2
          }
        } else {
          if (Number(driverStart) > 10) {
            if (posDiff < -5) {
              score = score - 5
            } else {
              score = score + posDiff
            }
          }
        }
      } else {
        if (posDiff > 5) {
          score = score + 10
        } else {
          score = score + posDiff * 2
        }
      }
      if (teammateId) {
        var teammateStart = this._results[teammateId] && this._results[teammateId][stageId] ? this._results[teammateId][stageId].start : 0
        var teammateFinish = this._results[teammateId][stageId] ? this._results[teammateId][stageId].finish : 0
      }

      if (driverStart <= 10 && driverFinish <= 10) {
        score = score + this.qualyExperience[driverStart] + this.finishExperience[driverFinish]
      }
      if (this.isBestLap) {
        score = score + 5
      }

      if (teammateStart && driverStart < teammateStart) {
        score = score + 2
      }
      if (teammateFinish && teammateFinish < teammateFinish) {
        score = score + 3
      }
      if (!this.result.dq && !this.result.dnf && !this.result.dns && this.finish) {
        score = score + 1
      }

      if (posDiff <= 0) {
        if (Number(driverStart) <= 10) {
          if (posDiff < -5) {
            score = score - 10
          } else {
            score = score + posDiff * 2
          }
        } else {
          if (Number(driverStart) > 10) {
            if (posDiff < -5) {
              score = score - 5
            } else {
              score = score + posDiff
            }
          }
        }
      } else {
        if (posDiff > 5) {
          score = score + 10
        } else {
          score = score + posDiff * 2
        }
      }
      return score
    }
  }
}