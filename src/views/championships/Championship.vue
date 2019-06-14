<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-card flat :key="championship.documentId" v-else-if="championship">
      <v-container>
        <!-- <v-btn @click="queryTest">Query</v-btn> -->
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

        <v-layout align-center justify-space-between wrap>
          <v-flex xs10 lg7>
            <h1>{{championship.info.name}}</h1>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs2 shrink>
            <ChampionshipActions
              :_championship="championship"
              :_drivers="drivers"
              :_isAdmin="isAdmin"
              :_isParticipant="isParticipant"
              :_isAuthor="isAuthor"
              :_driversIds="driversIds"
            />
          </v-flex>
        </v-layout>
        <ChampionshipInfo :_championship="championship" :_drivers="drivers"/>
        <v-layout justify-center class="my-3">
          <v-btn v-if="!isParticipant" dark color="green" @click="selectTeam" depressed>
            <v-icon>assignment_turned_in</v-icon>Join championship
          </v-btn>
        </v-layout>
        <ChampionshipTabs
          :isAuthor="isAuthor"
          :isAdmin="isAdmin"
          :_results="results"
          :_drivers="drivers"
          :_championship="championship"
        />
        <v-dialog v-if="joinDialog" v-model="joinDialog" max-width="500">
          <component
            v-if="joinDialogComponent"
            :is="joinDialogComponent"
            :_drivers="drivers"
            :driversIds="driversIds"
            :_championship="championship"
            @close="joinDialog = false"
          ></component>
        </v-dialog>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import ChampionshipTabs from '@/components/championship/ChampionshipTabs'
import Login from '@/views/user/Login.vue'
import TeamSelectForm from '@/components/championship/TeamSelectForm.vue'
import ChampionshipInfo from '@/components/championship/ChampionshipInfo.vue'
import ChampionshipCalendar from '@/components/championship/ChampionshipCalendar.vue'
import ChampionshipActions from '@/components/championship/ChampionshipActions.vue'
import championship from '@/mixins/championship/championship.js'
export default {
  name: 'Championship',
  data() {
    return {
      championship: null,
      results: null,
      drivers: null,
      driversIds: null,
      joinDialog: false
    }
  },
  watch: {
    $route() {
      this.getChampionship()
    },
    isParticipant() {
      this.joinDialog = false
    }
  },
  created() {
    this.getChampionship()
  },
  computed: {
    isParticipant() {
      let userId = this.userId
      if (this.drivers && this.drivers[userId]) {
        return true
      } else {
        return false
      }
    },
    userId() {
      if (this.isLoggedIn) {
        return this.$store.getters.user.id
      }
    },
    joinDialogComponent() {
      let joinDialogComponent = this.isLoggedIn ? 'TeamSelectForm' : 'Login'
      return joinDialogComponent
    },
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
        return this.userId == this.championship.author.id
    },
    isApproved() {
      return this.championship ? this.championship.approved : false
    }
  },
  mixins: [championship],
  components: {
    Login,
    TeamSelectForm,
    ChampionshipActions,
    ChampionshipInfo,
    ChampionshipCalendar,
    ChampionshipTabs
  }
}
</script>