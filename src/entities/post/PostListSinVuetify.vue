<template>
  <div class="centrado">
    <div class="right-buttons-bar">
      <button @click="goToCreatePost()">+</button>
    </div>
    <h1>Blog Posts</h1>
    <div class="subtitulo">Data fetched <span class="negrita">after</span> navigation</div>
    <div class="contenedor">
      <div class="elemento" v-for="post in posts" :key="post.id">
        <div class="campo">
          <span class="etiqueta">Title:</span>
          <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" tag="span" class="pointer valor">{{ post.title }}</router-link>
        </div>
        <div class="campo">
          <span class="etiqueta">Autor:</span>
          <span class="valor">{{ post.author.login }}</span>
        </div>
        <div class="campo" v-if="post.timestamp">
          <span class="etiqueta">Timestamp:</span>
          <span class="valor">{{ post.timestamp }}</span>
        </div>
        <div class="campo" v-if="post.tags.length > 0">
          <span class="etiqueta">Tags:</span>
          <span class="valor">{{ post.tags.map((t) => t.name).join(", ") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";

export default {
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    this.posts = await PostRepository.findAll();
  },
  methods: {
    goToCreatePost() {
      this.$router.push("/posts/new");
    },
  },
};
</script>

<style scoped>
.centrado {
  text-align: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

.subtitulo {
  font-size: 0.75rem;
}

.negrita {
  font-weight: bolder;
}

.contenedor {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.elemento {
  flex: 0 0 50%;
  padding: 12px;
  border: 1px solid black;
}

@media (min-width: 1264px) {
  .elemento {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

.etiqueta {
  font-style: italic;
}

.valor {
  margin-left: 6px;
}

.pointer {
  text-decoration: underline;
}

button {
  padding: 0.5rem 1rem;
  background: #1976d2;
  color: #ffffff;
  font-size: 2rem;
  line-height: 1;
  transition: background 250ms ease-in-out, transform 150ms ease;
}

button:hover {
  background: #0053ba;
}
</style>
