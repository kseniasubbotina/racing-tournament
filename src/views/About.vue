<template>
  <v-card flat class="text-xs-center">
    <v-layout justify-center>
      <v-card-title>
        <h1>Welcome to F1-esport.com</h1>
      </v-card-title>
    </v-layout>

    <v-card-text>
      <div class="subtitle">
        We are pleased to welcome you on f1-esport.com web-site.
        <br>We created this site to unite drivers from all of the world and collect their experience and achievements in one place.
        <br>Here you can create your own racing championships or take part in created ones, competing for the title of the best driver among all participants, not only in your championship. Your driver rating depends on success in the championships and is summarized in your profile so that you can then examine your own statistics and compete for higher positions in the site leaderboard.
        <br>We hope the project will be very useful to the organizers of the leagues, providing convenient tools for administering championships.
        <br>
        <br>In the future, we plan to introduce new features and actively develop the project.
        <br>Good luck in the race!
      </div>
    </v-card-text>
    <v-layout justify-center>
      <v-card-title>
        <h2>Meet the team</h2>
      </v-card-title>
    </v-layout>

    <v-card-text>
      <v-layout wrap>
        <v-flex xs12 md6 v-for="member in members" :key="member.name">
          <TeamMember :data="member"/>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import TeamMember from '@/components/about/TeamMember.vue'
export default {
  name: 'About',
  data () {
    return {
      members: [
        {
          name: 'Andrey Suvorkin',
          image: require('../assets/team/suvrokin.jpg'),
          email: 'andrejwest@mail.ru',
          about: 'Founder of f1-esport.com, creative director, frontend developer.',
          github: 'https://github.com/SUVORKIN',
          mail: 'formula1esport@gmail.com'
        },
        {
          name: 'Max Ivanov',
          image: require('../assets/team/ivanov.jpg'),
          email: '',
          about: 'Frontend developer.',
          github: 'https://github.com/splincool'
        }
      ]
    }
  },
  components: {
    TeamMember
  }
}
</script>
