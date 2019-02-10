<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-card :key="championship.documentId" v-else-if="championship">
      <v-alert
        v-if="championship && championship.rejectComment && (isAdmin || isAuthor)"
        :value="championship.rejectComment"
        type="warning"
      >{{championship.rejectComment}}</v-alert>
      <ChampionshipActions :_championship="championship" :_isAdmin="isAdmin" :_isAuthor="isAuthor"/>
      <v-container>
        <ChampionshipInfo :_championship="championship"/>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import ChampionshipInfo from '@/components/championship/ChampionshipInfo.vue'
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
  mixins: [championship],
  components: {
    ChampionshipActions,
    ChampionshipInfo
  }
}
</script>