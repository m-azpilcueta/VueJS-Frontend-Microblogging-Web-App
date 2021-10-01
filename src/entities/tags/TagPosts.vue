<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="right-buttons-bar"></div>
        <h1>Blog Posts</h1>
      </v-col>
      <v-col cols="12" sm="6" lg="3" v-for="post in posts" :key="post.id">
        <PostCard :post="post" :author="post.author"></PostCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from "../post/PostCard.vue";
import PostRepository from "@/repositories/PostRepository";

export default {
  data() {
    return {
      posts: null,
    };
  },
  components: { PostCard },
  async mounted() {
    this.posts = await PostRepository.findAllByTag(this.$route.params.id);
    this.posts.reverse();
  },
};
</script>
