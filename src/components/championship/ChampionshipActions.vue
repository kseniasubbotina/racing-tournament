<template>
  <div>
    <v-layout>
      <v-spacer></v-spacer>
      <v-btn @click.stop="showChampForm=true" v-if="_isAdmin || _isAuthor" flat>
        <v-icon>edit</v-icon>Edit
      </v-btn>
      <v-btn
        v-if="_championship && _isAdmin && !approved"
        color="success"
        flat
        @click="approveChampionship(_championship.documentId)"
      >
        <v-icon>check</v-icon>Approve
      </v-btn>
      <v-btn @click="showRejectDialog = !showRejectDialog" v-if="_isAdmin" color="orange" flat>
        <v-icon>block</v-icon>Block
      </v-btn>
      <v-btn v-if="_isAdmin || _isAuthor" color="error" flat @click="openConfirmation">
        <v-icon>delete</v-icon>Delete
      </v-btn>
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
      showChampForm: false
    }
  },
  props: {
    _isAdmin: Boolean,
    _isAuthor: Boolean,
    _championship: Object
  },
  computed: {
    approved() {
      return this._championship ? this._championship.approved : false
    }
  },
  methods: {
    sendReject(message) {
      this.rejectChampionship(this._championship.documentId, message)
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