<template>
  <div>
    <v-layout wrap>
      <v-spacer></v-spacer>
      <v-menu v-if="_isAdmin || _isParticipant">
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-if="_championship && _isAdmin && !approved"
            @click="approveChampionship(_championship)"
          >
            <v-list-tile-title>Approve</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-if="_isAdmin || _isAuthor" @click="showChampForm=true">
            <v-list-tile-title>Edit</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-if="_isAdmin && approved" @click="showRejectDialog = !showRejectDialog">
            <v-list-tile-title>Block</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-if="_isParticipant"
            @click="leaveChampionship(_championship, _drivers, userId)"
          >
            <v-list-tile-title>Leave</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-if="_isAdmin || _isAuthor" @click="openConfirmation">
            <v-list-tile-title>Delete</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-layout>

    <Confirmation
      @confirmed="deleteChampionship(_championship)"
      _message="Delete this championship?"
    />
    <v-dialog v-model="showRejectDialog" max-width="500px">
      <RejectChampionship @close="showRejectDialog=false" @sendReject="sendReject"/>
    </v-dialog>
    <v-dialog v-model="showChampForm" max-width="950px">
      <ChampionshipForm
        v-if="showChampForm"
        :_championship="_championship"
        @close="showChampForm=false"
      />
    </v-dialog>
  </div>
</template>

<script>
import ChampionshipForm from '@/components/championship/form/ChampionshipForm'
import RejectChampionship from '@/components/championship/RejectChampionship.vue'
import Confirmation from '@/components/Confirmation.vue'
import championship from '@/mixins/championship/championship.js'
export default {
  name: 'ChampionshipActions',
  data() {
    return {
      showRejectDialog: false,
      showChampForm: false,
      fab: false
    }
  },
  props: {
    _isAdmin: Boolean,
    _isAuthor: Boolean,
    _isParticipant: Boolean,
    _championship: Object,
    _drivers: Object
  },
  computed: {
    isLoggedIn() {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    },
    userId() {
      if (this.isLoggedIn) {
        return this.$store.getters.user.id
      }
    },
    approved() {
      return this._championship ? this._championship.approved : false
    }
  },
  methods: {
    sendReject(message) {
      this.rejectChampionship(this._championship, message)
    },
    openConfirmation() {
      this.$root.$emit('confirm')
    }
  },
  mixins: [championship],
  components: {
    Confirmation,
    RejectChampionship,
    ChampionshipForm
  }
}
</script>