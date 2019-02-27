<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-card :key="championship.documentId" v-else-if="championship">
      <v-alert
        class="black--text"
        v-if="!championship.approved && (isAdmin || isAuthor)"
        :value="championship"
        type="warning"
      >
        <div
          v-if="championship.rejectComment && !championship.approved"
        >{{championship.rejectComment}}</div>
        <div v-else>Waiting for moderation</div>
      </v-alert>
      <ChampionshipActions :_championship="championship" :_isAdmin="isAdmin" :_isAuthor="isAuthor"/>
      <v-container>
        <ChampionshipInfo :_championship="championship"/>
        <ChampionshipCalendar :_championship="championship"/>
        <v-btn dark color="green" @click="selectTeam" depressed>Join championship</v-btn>
        <v-dialog v-model="joinDialog" max-width="500">
          <component :is="joinDialogComponent"></component>
        </v-dialog>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Login from '@/views/user/Login.vue'
import TeamSelectForm from '@/components/championship/TeamSelectForm.vue'
import ChampionshipInfo from '@/components/championship/ChampionshipInfo.vue'
import ChampionshipCalendar from '@/components/championship/ChampionshipCalendar.vue'
import ChampionshipActions from '@/components/championship/ChampionshipActions.vue'
import championship from '@/mixins/championship/championship.js'
import fb from '@/firebase/config.js'
export default {
  name: 'Championship',
  data() {
    return {
      championship: null,
      joinDialog: false,
      joinDialogComponent: ''
    }
  },
  watch: {
    $route() {
      this.getChampionship()
    }
  },
  created() {
    this.getChampionship()
  },
  computed: {
    isLoggedIn() {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    },
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
    selectTeam() {
      this.joinDialog = true
      this.joinDialogComponent = this.isLoggedIn ? 'TeamSelectForm' : 'Login'
    }
  },
  mixins: [championship],
  components: {
    Login,
    TeamSelectForm,
    ChampionshipActions,
    ChampionshipInfo,
    ChampionshipCalendar
  }
}
</script>