<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-card :key="championship.documentId" v-else-if="championship">
      <v-container>
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
            <h2>{{championship.info.name}}</h2>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs2 shrink>
            <ChampionshipActions
              :_championship="championship"
              :_isAdmin="isAdmin"
              :_isAuthor="isAuthor"
            />
          </v-flex>
          <v-flex shrink>
            <v-btn v-if="!isParticipant" dark color="green" @click="selectTeam" depressed>
              <v-icon>assignment_turned_in</v-icon>Join championship
            </v-btn>
          </v-flex>
        </v-layout>
        <ChampionshipInfo :_championship="championship"/>
        <!-- <ChampionshipCalendar :_championship="championship"/> -->
        <ChampionshipTabs :_championship="championship"/>
        <v-dialog v-model="joinDialog" max-width="500">
          <component
            v-if="joinDialogComponent"
            :is="joinDialogComponent"
            :_championship="championship"
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
    userId() {
      if (this.isLoggedIn) {
        return this.$store.getters.user.id
      }
    },
    isParticipant() {
      let userId = this.userId
      if (
        this.championship &&
        this.championship.drivers &&
        this.championship.drivers[userId]
      ) {
        return true
      } else {
        return false
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