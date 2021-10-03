<template>
  <div class="my-container">
    <section class="d-flex justify-center">
      <div class="box">
        <v-row class="justify-center align-center mb-4">
          <v-col cols="3"></v-col>
          <v-col cols="4"><h1>Posts related</h1></v-col>
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

export default {
  data() {
    return {
      posts: {},
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
  components: { PostCard },
  async mounted() {
    this.posts = await PostRepository.findAllByTag(this.$route.params.id);
    this.posts.reverse();
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
</style>
