<template>
  <v-row>
    <v-col v-if="user">
      {{ user }}
    </v-col>
  </v-row>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";
import Vue from "vue";

export default {
  data() {
    return {
      user: null,
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const data = await UserRepository.findOne(to.params.id);
      data.posts.reverse();
      next((vm) => vm.setData(data));
    } catch (e) {
      Vue.$notify({
        text: e.response.data.message,
        type: "error",
      });
      setTimeout(() => next(-1), 2000);
    }
  },
  async beforeRouteUpdate(to, from, next) {
    try {
      this.user = null;
      const data = await UserRepository.findOne(to.params.id);
      data.posts.reverse();
      this.setData(data);
      next();
    } catch (e) {
      Vue.$notify({
        text: e.response.data.message,
        type: "error",
      });
      setTimeout(() => next(-1), 2000);
    }
  },
  methods: {
    setData(data) {
      this.user = data;
    },
  },
};
</script>
