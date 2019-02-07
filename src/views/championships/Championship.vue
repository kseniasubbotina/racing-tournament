<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>

    <v-card>
      <v-container v-if="championship">
        <v-btn
          v-if="isAdmin || isAuthor"
          color="error"
          flat
          @click="openConfirmation(championship)"
        >
          <v-icon>delete</v-icon>Delete
        </v-btn>
        <v-btn
          v-if="isAdmin && !isApproved"
          color="success"
          flat
          @click="approveChampionship(championship.documentId)"
        >
          <v-icon>check</v-icon>Approve
        </v-btn>
        <v-btn v-if="isAdmin" color="yellow" flat>
          <v-icon>block</v-icon>Reject
        </v-btn>
        <v-layout>
          <v-flex>
            <h1>{{championship.info.name}}</h1>
            <v-spacer></v-spacer>
          </v-flex>
          <v-flex>Approved: {{championship.approved}}</v-flex>
        </v-layout>
        <v-layout column>
          <h3>{{championship.info.game}}</h3>
          {{championship.info.description}}
          Drivers: {{championship.drivers.length}}/{{championship.info.playersCount}}
        </v-layout>
        <div
          v-for="stage in championship.calendar"
          :key="stage.documentId"
        >{{stage.track}} - {{stage.date}} {{stage.time}}</div>
      </v-container>
    </v-card>
    <Confirmation
      @confirmed="deleteChampionship(championship)"
      _message="Delete this championship?"
    />
  </div>
</template>

<script>
import Confirmation from '@/components/Confirmation.vue'
import championship from '@/mixins/championship/championship.js'
import fb from '@/firebase/config.js'
export default {
  name: 'Championship',
  data() {
    return {
      championship: null
    }
  },
  created() {
    this.getChampionship()
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    isAdmin() {
      if (
        this.$store.getters.user &&
        this.$store.getters.userData.role == '1'
      ) {
        return true
      } else return false
    },
    isAuthor() {
      if (this.$store.getters.user)
        return this.$store.getters.user.id == this.championship.author.id
    },
    isApproved() {
      return this.championship.approved
    }
  },
  methods: {
    // subscribeForUpdates() {
    //   debugger
    //   fb.champsCollection
    //     .doc(this.championship.documentId)
    //     .onSnapshot(function(doc) {
    //       this.championship = doc.data()
    //     })
    // },
    openConfirmation(championship) {
      this.$root.$emit('confirm', championship)
    },
    getChampionship() {
      this.$store.commit('set', { type: 'loading', val: true })
      fb.champsCollection
        .where('info.name', '==', this.$route.params.id)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              this.championship = doc.data()
              this.championship.documentId = doc.id
            })
          } else {
            this.$router.push('/404')
          }
          this.$store.commit('set', { type: 'loading', val: false })
        })
    }
  },
  mixins: [championship],
  components: {
    Confirmation
  }
}
</script>