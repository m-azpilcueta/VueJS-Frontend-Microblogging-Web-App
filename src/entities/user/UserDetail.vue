<template>
  <div class="my-container">
    <section v-if="user" class="d-flex justify-center">
      <div class="box d-flex flex-column align-center">
        <v-icon size="92">mdi-account-circle</v-icon>
        <h1>{{ user.login }}</h1>
        <span>Number of posts: {{ postNumber }}</span>
        <PostCard v-for="post in user.posts" :key="post.id" :post="post" :author="user"></PostCard>
      </div>
    </section>
  </div>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";
import Vue from "vue";
import PostCard from "@/entities/post/PostCard";

export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    postNumber() {
      return this.user.posts.length;
    },
  },
  components: { PostCard },
  async beforeRouteEnter(to, from, next) {
    try {
      const data = await UserRepository.findOne(to.params.id);
      data.posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
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
      data.posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
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

<style lang="scss" scoped>
.box {
  h1,
  span {
    text-align: center;
    color: #383950;
  }

  .v-icon {
    color: #383950;
  }
}
</style>
