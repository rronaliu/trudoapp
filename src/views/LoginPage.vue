<template>
  <div class="login-page">
      <form @submit.prevent="login">
        <div class="form-group text-left">
          <label for="email">Email</label>
          <b-input type="email" id="email" v-model="email" />
        </div>
        <div class="form-group text-left">
          <label for="password">Password</label>
          <b-input type="password" id="password" v-model="password" />
        </div>
        <button type="submit" class="btn btn-primary d-flex ml-auto" >Log in</button>
      </form>
      <span v-if="showErrorMsgGeneral" class="text-danger">
        There has been a problem with your login. Please try again.
      </span>
      <span v-if="showErrorMsgNoUser" class="text-danger">
        There's no user with that email and password. Please try again or <b-link :to="{name: 'register'}">Register</b-link>
      </span>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showErrorMsgGeneral: false,
      showErrorMsgNoUser: false,
    };
  },
  methods: {
    async login() {
      const res = await this.$store.dispatch('getUsers')
      let foundUser = null
      if(res.data) {
        foundUser = res.data.find(user => user.email === this.email && user.password === this.password)
      } else {
        this.showErrorMsgGeneral = true
      }

      if(foundUser) {
          this.$store.commit('SET_LOGGED_USER', foundUser)
          this.$store.commit('SET_IS_LOGGED_IN', true)
          localStorage.setItem("user", JSON.stringify(foundUser))
          this.$router.push('/')
      }
          else {
            this.$store.commit('INIT_USER')
            this.showErrorMsgNoUser =  true

          }
    }
  }
};
</script>
