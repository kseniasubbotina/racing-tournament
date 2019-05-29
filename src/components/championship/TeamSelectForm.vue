<template>
  <v-card>
    <v-card-title class="py-4 title">{{username}}, please select a team</v-card-title>
    <v-card-text>
      <!-- {{selectedTeamDrivers}} -->
      <!-- <div class="title mb-3">Drivers in</div> -->
      <v-layout align-center justify-center>
        <v-flex class="pl-3">
          <v-layout column class="mb-3">
            <div class="caption">Drivers: {{selectedTeamDrivers.length}}/{{team.places}}</div>
            <v-flex v-for="(teamDriver, index) in selectedTeamDrivers" :key="teamDriver.id">
              <div class="subheading">{{index+1}} - {{teamDriver.username}}</div>
            </v-flex>
            <div v-if="!selectedTeamDrivers.length">No drivers yet</div>
          </v-layout>
        </v-flex>
        <v-flex>
          <img v-if="team" :src="team.teamLogo" width="150" alt>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-alert v-if="isteamFulfilled" type="error" :value="true">
      <div>There are no places in this team</div>
    </v-alert>
    <v-container>
      <v-form>
        <TeamSelect :_seria="_seria" @changeTeam="onChangeTeam"/>
      </v-form>
    </v-container>
    <!-- <v-alert type="info" :value="true">
      <div>You will not be able to change a team after joining the championship</div>
    </v-alert>-->
    <v-card-actions>
      <v-btn flat color="error" @click="$emit('close')">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="isteamFulfilled" @click="join">Confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import fb from '@/firebase/config.js'
import TeamSelect from '@/components/form-elements/TeamSelect'
export default {
  name: 'TeamSelectForm',
  data() {
    return {
      team: {}
    }
  },
  props: {
    _seria: String,
    _championship: Object,
    _drivers: Object,
    driversIds: Array
  },
  computed: {
    isteamFulfilled () {
      if(this.team) {
        if(this.selectedTeamDrivers.length < this.team.places) {
          return false
        } else {
          return true
        }
      }
    },
    selectedTeamDrivers () {
      if(this.team) {
        let drivers = Object.values(this._drivers)
        let selectedTeamDrivers = drivers.filter(driver => driver.team.name === this.team.name)
        return selectedTeamDrivers
      }
    },
    username() {
      return this.$store.getters.userData.username
    },
    userId() {
      return this.$store.getters.user.id
    },
    isDisabled () {
      return this.team ? false : true
    }
  },
  methods: {
    onChangeTeam(team) {
      this.team = team
    },
    join() {
      let username = this.$store.getters.userData.username
      let team = this.team
      let userId = this.userId
      let drivers = this._drivers || {}
      let driversIds = this.driversIds || []
      
      const matchedUser = driversIds.filter(driver => driver.indexOf(userId) > -1)
      if(!matchedUser.length) {
        driversIds.push(userId)
      }

      drivers[userId] = {
        userId: userId,
        username: this.$store.getters.userData.username,
        team: team
      }
      fb.champsCollection.doc(this._championship.documentId).update({
        drivers: drivers,
        driversIds: driversIds
      }).then(() => {
        this.$router.push('/championships/' + this._championship.info.name)
      })
    }
  },
  components: {
    TeamSelect
  }
}
</script>
