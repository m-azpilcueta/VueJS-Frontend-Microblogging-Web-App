<template>
  <v-app>
    <!-- Notificaciones usando vue-notification -->
    <notifications :max="3" :width="400" position="top center" />

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" v-slot="{ navigate }" custom>
          <span @click="navigate" class="pointer">Microblogging</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn to="/posts" exact text>posts</v-btn>
        <v-btn to="/tags" exact text>tags</v-btn>
        <v-btn to="/users" exact text v-if="isAdmin">users</v-btn>
        <v-btn active-class="hide-active" icon to="/auth" v-if="!isLogged">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn :to="userProfileRoute" v-if="isLogged" depressed color="primary">
          <v-icon class="mr-1"> mdi-account </v-icon>
          <span>{{ user.login }}</span>
        </v-btn>
        <v-btn icon @click="logout()" v-if="isLogged">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary absolute>
      <v-list nav dense class="mx-2 my-4">
        <v-list-item class="d-flex align-center flex-column">
          <v-icon size="52" class="mb-2">mdi-account-circle</v-icon>
          <v-btn active-class="hide-active" to="/auth" v-if="!isLogged" exact text> Login / Register </v-btn>
          <v-btn :to="userProfileRoute" v-if="isLogged" icon>
            {{ user.login }}
          </v-btn>
          <v-btn icon @click="logout()" v-if="isLogged">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/posts" exact text>posts</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/tags" exact text>tags</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/users" exact text v-if="isAdmin">users</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import store from "@/common/store";
import auth from "@/common/auth";

export default {
  name: "App",
  data() {
    return {
      user: store.state.user,
      drawer: false,
    };
  },
  computed: {
    isLogged() {
      return this.user.logged;
    },
    userProfileRoute() {
      return "/user/" + this.user.id;
    },
    isAdmin() {
      return this.user.authority == "ADMIN";
    },
  },
  methods: {
    logout() {
      auth.logout();
      // Después de hacer logout nos vamos a home
      if (this.$router.currentRoute.name != "Home") {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style lang="scss" src="./App.scss"></style>
