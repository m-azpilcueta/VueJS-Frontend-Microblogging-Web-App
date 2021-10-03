<template>
  <div class="my-container">
    <LoadSpinner v-if="loading"></LoadSpinner>
    <section v-if="tags" class="d-flex justify-center align-center">
      <div class="box">
        <h1>Manage Tags</h1>
        <div class="add-wrapper d-flex justify-center">
          <v-form ref="form" @submit.prevent="addTag" class="d-flex align-center">
            <v-text-field class="mr-4" label="New tag" v-model="newTag" :rules="addRules"></v-text-field>
            <v-btn color="primary" type="submit">Add</v-btn>
          </v-form>
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
  computed: {
    addRules() {
      const rules = [(v) => !!v || "Field is required"];
      return rules;
    },
  },
  components: { LoadSpinner, TagModify },
  methods: {
    async addTag() {
      if (!this.$refs.form.validate()) {
        return;
      }
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
