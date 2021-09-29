<template>
  <v-row>
    <v-col v-if="loading" class="loading"> Loading... </v-col>
    <v-col v-if="user">
      {{ user }}
    </v-col>
  </v-row>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";

export default {
  data() {
    return {
      loading: false,
      user: null,
    };
  },
  async mounted() {
    this.loading = true;
    try {
      this.user = await UserRepository.findOne(this.$route.params.id);
      this.user.posts.reverse();
    } catch (e) {
      this.$notify({
        text: e.response.data.message,
        type: "error",
      });
      setTimeout(() => this.back(), 2000);
    } finally {
      this.loading = false;
    }
  },
};
</script>
