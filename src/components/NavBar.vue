<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav class="w-100">
      <b-nav-item href="#" :to="{name: 'home'}" v-if="isLoggedIn">Home</b-nav-item>
      <b-nav-item href="#" :to="{name: 'profile', params: {id: this.loggedInUser.id} }" v-if="isLoggedIn" >Profile</b-nav-item>
      <b-nav-item href="#" class="ml-auto" v-if="isLoggedIn" @click="logout">Logout</b-nav-item>
      <b-nav-item href="#" class="ml-auto" v-if="!isLoggedIn" >Login</b-nav-item>
      <b-nav-item href="#" class="" v-if="!isLoggedIn" :to="{name: 'register'}">Register</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isUserLoggedIn
    },
    loggedInUser() {
      return this.$store.state.loggedInUser
    }
  },
  methods: {
    async logout() {
      await this.$store.commit("LOGOUT");
      this.$router.push("/login");
    },
  }
}
</script>

<style>

</style>