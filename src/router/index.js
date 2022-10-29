import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "../views/HomePage.vue";

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "Home",
      },
      component: HomePage,
      alias: "/",
      beforeEnter: (to, from, next) => {
        console.log("Global beforeEnter");
        const reference = localStorage.getItem("user");
        if (reference) {
          console.log(to, from);
          next();
        } else {
          next("/login");
        }
      },
    },
    // {
    //   path: "/users",
    //   name: "usersPage",
    //   meta: {
    //     title: "Users",
    //   },
    //   component: () => import("../views/users/UsersPage.vue"),
    // },
    {
      path: "/users/:id",
      name: "profile",
      meta: {
        title: "Profile",
      },
      beforeEnter: (to, from, next) => {
        console.log("Global beforeEnter");
        const reference = localStorage.getItem("user");
        if (reference) {
          console.log(to, from);
          next();
        } else {
          next("/login");
        }
      },
      component: () => import("../views/users/ProfilePage.vue"),
    },
    {
      path: "/Login",
      name: "login",
      meta: {
        title: "Login",
      },
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "Register",
      },
      component: () => import("../views/RegisterPage.vue"),
    },
    {
      path: "/:notFound(.*)",
      name: "errorPage",
      meta: {
        title: "Error 404",
      },
      component: () => import("../views/ErrorPage.vue"),
    },
  ],
});

export default router;
