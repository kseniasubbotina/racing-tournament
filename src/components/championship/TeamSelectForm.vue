<template>
  <v-card>
    <v-card-title class="py-4 title">{{username}}, please select a team</v-card-title>
    <v-container>
      <v-form>
        <TeamSelect :_seria="_seria" @changeTeam="onChangeTeam"/>
      </v-form>
    </v-container>
    <v-alert type="info" :value="true">
      <div>You will not be able to change a team after joining the championship</div>
    </v-alert>
    <v-card-actions>
      <v-btn :disabled="isDisabled" @click="join">Confirm</v-btn>
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
      team: null
    }
  },
  props: {
    _seria: String,
    _championship: Object
  },
  computed: {
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
      let drivers = this._championship.drivers || {}
      drivers[userId] = {
        userId: userId,
        username: this.$store.getters.userData.username,
        team: team
      }
      fb.champsCollection.doc(this._championship.documentId).update({
        drivers: drivers
      }).then
      this.$router.push('/championships/' + this._championship.info.name)
    }
  },
  components: {
    TeamSelect
  }
}
</script>
