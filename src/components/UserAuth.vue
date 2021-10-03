<template>
  <v-tabs centered>
    <v-tab>Login</v-tab>
    <v-tab>Register</v-tab>
    <v-tab-item>
      <Login class="mt-4"></Login>
    </v-tab-item>
    <v-tab-item>
      <Register class="mt-4"></Register>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";

export default {
  components: { Login, Register },
};
</script>
