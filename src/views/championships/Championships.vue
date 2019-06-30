<template>
  <div>
    <h3 class="my-3">Available Championships</h3>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>

    <v-layout v-else wrap>
      <v-layout wrap>
        <template v-if="championships.length">
          <template v-for="(champ, index) in championships">
            <v-flex
              v-if="champ.approved || champ.currentUserId == champ.author.id || isAdmin"
              xs12
              sm4
              md4
              pa-1
              :key="index"
            >
              <ChampionshipItem :_drivers="champ.drivers" :_championship="champ"/>
            </v-flex>
          </template>
        </template>
        <template v-else>
          <NoChampionships/>
        </template>
      </v-layout>
    </v-layout>

    <v-layout v-if="showAddButton">
      <v-flex sx12>
        <v-btn v-if="isLoggedIn" :to="'/create'" color="green" dark fixed bottom right fab>
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import ChampionshipForm from '@/components/championship/form/ChampionshipForm'
  import fb from '@/firebase/config.js'
  import ChampionshipItem from '@/components/championship/ChampionshipItem'
  import isAdmin from '@/mixins/isAdmin.js'
  import NoChampionships from '@/components/championship/NoChampionships.vue'

  export default {
  name: 'Championships',
  data() {
    return {
      championships: [],
      showCreateForm: false,
      drivers: {}
    }
  },
  props: {
    showAddButton: {
      default: true,
      type: Boolean
    }
  },
  created() {
    this.getChampionships()
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.user ? true : false
    },
    loading() {
      return this.$store.getters.loading
    },
    currentUserId() {
      return this.$store.getters.user.id
    },
  },
  methods: {
    getChampionships() {
      this.$store.commit('set', { type: 'loading', val: true })
      var championships = []
      var drivers = {}
      fb.champsCollection.where('championship.status', '==', 'Active').where('championship.approved', '==', true).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          drivers = doc.data().drivers
          var data = doc.data().championship
          if (data) {
            data.id = doc.id
            data.drivers = drivers
            championships.push(data)
          }
        })
        this.$store.commit('set', { type: 'loading', val: false })
        this.championships = championships
        // this.drivers = drivers
      })
    }
  },
  mixins: [isAdmin],
  components: {
    ChampionshipItem,
    ChampionshipForm,
    NoChampionships
  }
}
</script>
