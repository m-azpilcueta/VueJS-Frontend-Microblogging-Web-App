<template>
  <div class="my-container">
    <LoadSpinner v-if="loading"></LoadSpinner>
    <section v-if="posts" class="d-flex justify-center">
      <div class="box">
        <v-row class="title justify-center align-center mb-4">
          <v-col cols="3"></v-col>
          <v-col cols="4"><h1>Blog Posts</h1></v-col>
          <v-col cols="3">
            <v-btn v-if="!isAdmin && isLogged" :to="{ name: 'PostCreate' }" color="primary">
              <v-icon>mdi-plus</v-icon>
              <span class="d-none d-md-flex ml-1">Create post</span>
            </v-btn>
          </v-col>
        </v-row>
        <PostCard v-for="post in posts" :key="post.id" :post="post" :author="post.author"></PostCard>
      </div>
    </section>
  </div>
</template>

<script>
import PostCard from "./PostCard.vue";
import PostRepository from "@/repositories/PostRepository";
import store from "@/common/store";
import LoadSpinner from "@/components/LoadSpinner.vue";

export default {
  data() {
    return {
      posts: null,
      loading: false,
    };
  },
  components: { PostCard, LoadSpinner },
  computed: {
    isAdmin() {
      return store.state.user.authority == "ADMIN";
    },
    isLogged() {
      return store.state.user.logged;
    },
  },
  async mounted() {
    this.loading = true;
    try {
      this.posts = await PostRepository.findAll();
      this.posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (e) {
      this.$notify({
        text: e.response.data.message,
        type: "error",
      });
      setTimeout(() => this.$router.go(-1), 1500);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  h1 {
    text-align: center;
    color: #383950;
    font-size: 1.5em !important;
  }
}

.title {
  overflow-wrap: break-word;
  font-family: "Fira Sans", sans-serif !important;
}
</style>
