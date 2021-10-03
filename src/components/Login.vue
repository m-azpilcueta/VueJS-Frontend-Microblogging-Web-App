<template>
  <div class="wrapper d-flex flex-column">
    <v-form @submit.prevent="userLogin">
      <v-text-field label="Login" name="login" prepend-icon="person" type="text" v-model="username"></v-text-field>

      <v-text-field v-model="password" label="Password" name="password" prepend-icon="lock" type="password"></v-text-field>

      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn type="submit" color="primary">Login</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import auth from "../common/auth";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    userLogin() {
      auth
        .login({
          login: this.username,
          password: this.password,
        })
        .then(() => {
          // vamos a la página anterior después de autenticarnos
          this.$router.go(-1);
        })
        .catch((err) => {
          this.$notify({
            text: err.response.data.message,
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 90%;
  max-width: 700px;
  background-color: #f3f3f5;
  padding: 2em 1em;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
