<template>
  <v-container>
    <div class="headline">Frequently Asked Questions</div>
    <v-layout wrap>
      <v-flex class="my-3" v-for="(theme, i) in themes" :key="i" xs12>
        <div class="title my-3">{{theme.name}}</div>
        <v-layout wrap>
          <v-flex xs12 class="px-2" v-for="(question, j) in theme.questions" :key="j">
            <div class="subheading font-weight-bold my-2">{{question.question}}</div>
            <div>{{question.answer}}</div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'FAQ',
  data () {
    return {
      themes: [
        {
          name: 'Signing up',
          questions: [
            {
              question: 'How do I sign up to f1-esport.com?',
              answer: 'Just create an account by clicking Sign Up in the top right corner. Once you have your account, you can take a part in championships and create your ones.'
            }
          ]
        },
        {
          name: 'Championships',
          questions: [
            {
              question: 'How can i join a championship?',
              answer: 'Go to "Championships" page, click on the championship you interested in. When you are on the championship page, click Join championship button, select a team and be ready to go. See the calendar of races on the results tab. Race time will adjust to your local time, so do not worry to miss a race.'
            },
            {
              question: 'How can i leave a championship?',
              answer: 'Go to the championship page you want to leave, click the button on the rigt-top corner, in a menu select Leave championship option.'
            },
            {
              question: 'Can I create my own championship?',
              answer: 'Yes! Go to Championships page, click the green "+" button on the bottom of the page and fill the form.'
            }
          ]
        },
        {
          name: 'More',
          questions: [
            {
              question: 'Contact us',
              answer: 'For issues related to signing up, logging in or with your account or any issues or suggestions related to the f1-esport, please email: formula1esport@gmail.com'
            }
          ]
        }
      ]
    }
  }
}
</script>
