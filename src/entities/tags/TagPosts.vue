<template>
  <div class="my-container">
    <LoadSpinner v-if="loading"></LoadSpinner>
    <section v-if="posts" class="d-flex justify-center">
      <div class="box">
        <v-row class="title justify-center align-center mb-4">
          <v-col cols="3"></v-col>
          <v-col cols="4"><h1>Posts Related</h1></v-col>
          <v-col cols="3">
            <v-btn v-if="!isAdmin && isLogged" :to="{ name: 'PostCreate' }" color="primary">
              <v-icon>mdi-plus</v-icon>
              <span class="d-none d-md-flex ml-1">Create post</span>
            </v-btn>
          </v-col>
        </v-row>
        <PostCard v-for="post in posts" :key="post.id" :post="post" :author="post.author"></PostCard>
        <v-row v-if="posts.length == 0" class="justify-center"><span id="related">No posts related</span></v-row>
      </div>
    </section>
  </div>
</template>

<script>
import PostCard from "../post/PostCard.vue";
import PostRepository from "@/repositories/PostRepository";
import store from "@/common/store";
import LoadSpinner from "@/components/LoadSpinner";

export default {
  data() {
    return {
      posts: {},
      loading: false,
    };
  },
  computed: {
    isAdmin() {
      return store.state.user.authority == "ADMIN";
    },
    isLogged() {
      return store.state.user.logged;
    },
  },
  components: { PostCard, LoadSpinner },
  async mounted() {
    this.loading = true;
    try {
      this.posts = await PostRepository.findAllByTag(this.$route.params.id);
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
  }
}

#related {
  color: #383950;
}

.title {
  overflow-wrap: break-word;
}
</style>
