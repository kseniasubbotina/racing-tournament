<template>
  <div style="margin: 0 5px">
    <v-avatar :size="width">
      <div :style="avatarStyles"></div>
    </v-avatar>
  </div>
</template>
<script>
export default {
  name: 'UserAvatar',
  props: {
    userData: Object,
    width: Number
  },
  computed: {
    avatarStyles() {
      let imageUrl = this.userData && this.userData.avatarURL ? this.userData.avatarURL : require('@/assets/user/user-avatar.png')
      return {
        'border-radius': '100px',
        backgroundImage: 'url(' + imageUrl + ')',
        height: this.width + 'px',
        width: this.width + 'px',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }
    }
  }
}
</script>

