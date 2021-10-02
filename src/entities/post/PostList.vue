<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="right-buttons-bar">
          <v-btn v-if="!isAdmin" :to="{ name: 'PostCreate' }" color="primary">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <h1>Blog Posts</h1>
        <div class="caption">Data fetched <span class="font-weight-bold">after</span> navigation</div>
      </v-col>
      <v-col cols="12" sm="6" lg="3" v-for="post in posts" :key="post.id">
        <PostCard :post="post" :author="post.author"></PostCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from "./PostCard.vue";
import PostRepository from "@/repositories/PostRepository";
import store from "@/common/store";

export default {
  data() {
    return {
      posts: [],
    };
  },
  components: { PostCard },
  computed: {
    isAdmin() {
      return store.state.user.authority == "ADMIN";
    },
  },
  async mounted() {
    this.posts = await PostRepository.findAll();
    this.posts.reverse();
  },
};
</script>
