export default {
  methods: {
    dateTimeToUtc(date, time, type) {
      if (date && time) {
        let dateArr = date.split('-')
        let timeArr = time.split(':')
        let localStageDateTIme = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1])
        let year = localStageDateTIme.getUTCFullYear()
        let month = localStageDateTIme.getUTCMonth()
        let day = localStageDateTIme.getUTCDate()
        let hours = localStageDateTIme.getUTCHours()
        let minutes = localStageDateTIme.getUTCMinutes()
        if (minutes.toString().length == 1) {
          minutes = '0'.toString().concat(minutes.toString())
        }
        if (type == 'date') {
          return year + '-' + month + '-' + day
        } else if (type == 'time') {
          return hours + ':' + minutes
        }
      } else {
        return ''
      }
    },
    dateTimeToBrowser(date, time, type) {
      if (date && time) {
        let dateArr = date.split('-')
        let timeArr = time.split(':')
        let convertedDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1])
        let offset = new Date().getTimezoneOffset() / 60
        let hours = convertedDate.getHours()
        let browserDateTime = new Date(convertedDate.setHours(hours - offset))
        let year = browserDateTime.getFullYear()
        let month = browserDateTime.getMonth() + 1
        let day = browserDateTime.getDate()
        hours = browserDateTime.getHours()
        let minutes = browserDateTime.getMinutes()
        if (minutes.toString().length == 1) {
          minutes = '0'.toString().concat(minutes.toString())
        }
        if (type == 'date') {
          return year + '-' + month + '-' + day
        } else if (type == 'time') {
          return hours + ':' + minutes
        }
      } else {
        return ''
      }
    }
  }
}