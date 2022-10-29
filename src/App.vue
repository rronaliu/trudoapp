<template>
  <div id="app">
    <NavBar/>
    <span class="text-primary cursor-pointer d-flex m-4" @click="$router.go(-1)" v-if="$route.name=='profile' || $route.name=='errorPage'"> Go Back </span>
    <h1>{{$route.meta.title}}</h1>
    <div class="m-5">
    <RouterView />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    // Main
  },
  async created() {
    this.$store.commit('SET_IS_LOADING', true)
    await this.$store.dispatch('getLoggedInUser')
    this.$store.commit('SET_IS_LOADING', false)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style >
@import '@/assets/main.css';
</style>