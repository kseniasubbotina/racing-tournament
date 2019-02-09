<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-card v-else>
      <ChampionshipActions :_championship="championship" :_isAdmin="isAdmin" :_isAuthor="isAuthor"/>
      <v-container v-if="championship">
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
  </div>
</template>

<script>
import ChampionshipActions from '@/components/championship/ChampionshipActions.vue'
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
  watch: {
    championship: {
      handler: function(newValue) {
        this.championship = newValue
      },
      deep: true
    }
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
      if (this.$store.getters.user && this.championship)
        return this.$store.getters.user.id == this.championship.author.id
    },
    isApproved() {
      return this.championship ? this.championship.approved : false
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
  },
  mixins: [championship],
  components: {
    ChampionshipActions
  }
}
</script>