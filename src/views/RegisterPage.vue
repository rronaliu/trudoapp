<template>
  <div class="login-page">
    <form @submit.prevent="register">
      <div class="form-group text-left">
        <label for="firstName">First Name</label>
        <b-input type="text"
                 id="firstName"
                 v-model="firstName" />
        <span v-if="error.firstName"
              class="text-danger">First Name{{error.firstName}}</span>
      </div>
      <div class="form-group text-left">
        <label for="lastName">Last Name</label>
        <b-input type="text"
                 id="lastName"
                 v-model="lastName" />
        <span v-if="error.lastName"
              class="text-danger">Last Name {{error.lastName}}</span>

      </div>
      <div class="form-group text-left">
        <label for="userName">User Name</label>
        <b-input type="text"
                 id="userName"
                 v-model="userName" />
        <span v-if="error.userName"
              class="text-danger">User Name {{error.userName}}</span>
      </div>
      <div class="form-group text-left">
        <label for="email">Email</label>
        <b-input type="email"
                 id="email"
                 v-model="email" />
        <span v-if="error.email"
              class="text-danger">Email {{error.email}}</span>
      </div>
      <div class="form-group text-left">
        <label for="password">Password</label>
        <b-input type="password"
                 id="password"
                 v-model="password" />
        <span v-if="error.password"
              class="text-danger">Password {{error.password}}</span>

      </div>
      <button type="submit"
              class="btn btn-primary d-flex ml-auto">Register</button>
    </form>
    <span v-if="showErrorMsgGeneral"
          class="text-danger">
      There has been a problem with your login. Please try again.
    </span>
    <span v-if="errorMsgUserExists"
          class="text-danger">
      User already exists. <b-link :to="{name: 'login'}">Sign in</b-link>
    </span>

  </div>
</template>

<script>
import REGEX_TEXT from "@/constants/REGEX";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      showErrorMsgGeneral: false,
      errorMsgUserExists: false,
      error: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validateText(type, value) {
      const testText = REGEX_TEXT.test(value);
      if (!testText) {
        this.error[type] =  ` is not valid`;
      } else {
        this.error[type] = "";
      }
      return true;
    },

    async register() {
      const validfirstName = this.validateText('firstName' ,this.firstName);
      const validlastName = this.validateText('lastName',this.lastName);
      const validuserName = this.validateText('userName',this.userName);
      const validemail = this.validateText('email',this.email);
      const validpassword = this.validateText('password',this.password);

      if (!validfirstName || !validlastName || !validuserName || !validemail || !validpassword) {
        return;
      }
      let res = null;
      try {
        res = await this.$store.dispatch("getUsers");
      } catch (error) {
        this.showErrorMsgGeneral = true;
      }

      const foundUser = res.data.find(
        (n) => n.email === this.email || n.userName === this.userName
      );
      if (foundUser) {
        this.errorMsgUserExists = true;
        this.error = {
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
        }
        return;
      } else {
        this.errorMsgUserExists = false;

      }

      await this.$store.dispatch("registerUser", {
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        email: this.email,
        password: this.password,
      });
      this.$router.push({ name: "login" });
      return true;
    },
  },
};
</script>

<style>
</style>