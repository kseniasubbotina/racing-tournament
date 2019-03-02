<template>
  <v-autocomplete
    :disabled="_disabled"
    v-validate="'required'"
    type="text"
    name="Team"
    :error-messages="errors.collect('Team')"
    :items="teams"
    label="Team"
    v-model="team"
  ></v-autocomplete>
</template>

<script>
import fb from '@/firebase/config.js'

export default {
  name: 'TeamSelect',
  data: function() {
    return {
      team: '',
      keys: null,
      teams: []
    }
  },
  props: {
    _seria: String,
    _selectedTeam: String,
    _disabled: Boolean
  },
  created() {
    this.getTeams()
  },
  watch: {
    team(nextVal, prevVal) {
      if (nextVal) {
        if (this.keys) {
          const matchedTeam = this.keys.filter(item => item.name === nextVal)
          this.$emit('changeTeam', matchedTeam[0])
        }
      }
    },
    _selectedTeam(val) {
      if (!val) {
        this.team = this.teams[0]
      } else {
        this.team = val
      }
    }
  },
  methods: {
    getTeams() {
      let teamsArr = []
      let keys = []
      fb.teamsCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data()
          teamsArr.push(data.name)
          keys.push({ id: doc.id, name: data.name })
        })
        this.teams = teamsArr
        this.keys = keys
        if (!this._selectedTeam) {
          this.team = teamsArr[0]
        } else {
          this.team = this._selectedTeam
        }
      })
    }
  }
}
</script>
