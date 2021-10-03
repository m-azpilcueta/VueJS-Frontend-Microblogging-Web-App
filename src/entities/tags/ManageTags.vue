<template>
  <div class="my-container">
    <LoadSpinner v-if="loading"></LoadSpinner>
    <section v-if="tags" class="d-flex justify-center align-center">
      <div class="box">
        <h1>Manage Tags</h1>
        <div class="add-wrapper d-flex justify-center">
          <input type="text" placeholder="New tag" v-model="newTag" />
          <button @click="addTag()" type="submit">Add</button>
        </div>
        <div class="tag-list">
          <TagModify v-for="tag in tags" :key="tag.id" :tag="tag"></TagModify>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoadSpinner from "@/components/LoadSpinner.vue";
import TagRepository from "@/repositories/TagRepository.js";
import TagModify from "@/entities/tags/TagModify.vue";

export default {
  data() {
    return {
      tags: null,
      loading: false,
      newTag: "",
    };
  },
  components: { LoadSpinner, TagModify },
  methods: {
    async addTag() {
      await TagRepository.create({
        name: this.newTag,
      });
      this.tags.push({ name: this.newTag });
    },
  },
  async mounted() {
    this.loading = true;
    try {
      this.tags = await TagRepository.findAll();
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
.my-container {
  width: 100%;
  height: 100%;

  section {
    width: 100%;

    h1 {
      text-align: center;
      color: #383950;
    }

    input::placeholder {
      color: #383950;
    }

    input {
      color: #383950;
      padding: 0.3rem 0.7rem;
      border-radius: 0.2rem;
      background-color: #e2e5ed;
      border: none;
      width: 40%;
      min-width: 150px;
      display: block;
      border-bottom: 0.3rem solid transparent;
      margin-right: 1em;
    }

    button {
      border: none;
      background-color: #383950;
      color: #f3f3f5;
      border-radius: 5px;
      padding: 0.5rem 1rem;
    }

    .add-wrapper {
      margin-top: 2em;
    }

    .tag-list {
      margin: 2em;
    }
  }
}
</style>
