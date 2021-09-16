<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="right-buttons-bar">
          <v-btn :to="{ name: 'PostCreate' }" color="primary">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <h1>Blog Posts</h1>
        <div class="caption">Data fetched <span class="font-weight-bold">before</span> navigation</div>
      </v-col>
      <v-col cols="12" sm="6" lg="3" v-for="post in posts" :key="post.id">
        <PostCard :post="post"></PostCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from "./PostCard.vue";
import PostRepository from "@/repositories/PostRepository";

// Carga dinámica de datos antes de cargar la ruta:
// https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-before-navigation
export default {
  data() {
    return {
      posts: [],
    };
  },
  // beforeRouteUpdate(to, from, next) {
  // Este hook no hace falta porque la vista no tiene ningún parámetro, entonces nunca se actualiza.
  // },
  async beforeRouteEnter(to, from, next) {
    const posts = await PostRepository.findAll();
    next((vm) => vm.setData(posts));
  },
  components: { PostCard },
  methods: {
    setData(data) {
      this.posts = data;
    },
  },
};
</script>
