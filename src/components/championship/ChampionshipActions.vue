<template>
  <v-layout>
    <v-spacer></v-spacer>
    <v-btn v-if="_isAdmin || _isAuthor" flat>
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
    <v-btn v-if="_isAdmin" color="orange" flat>
      <v-icon>block</v-icon>Reject
    </v-btn>
    <v-btn v-if="_isAdmin || _isAuthor" color="error" flat @click="openConfirmation(_championship)">
      <v-icon>delete</v-icon>Delete
    </v-btn>
    <Confirmation
      @confirmed="deleteChampionship(championship)"
      _message="Delete this championship?"
    />
  </v-layout>
</template>

<script>
import Confirmation from '@/components/Confirmation.vue'
import championship from '@/mixins/championship/championship.js'
export default {
  name: 'ChampionshipActions',
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
    openConfirmation(_championship) {
      this.$root.$emit('confirm', _championship)
    }
  },
  mixins: [championship],
  components: {
    Confirmation
  }
}
</script>