<template>
  <div class="d-flex justify-center">
    <div class="box d-flex flex-column">
      <v-form ref="form" @submit.prevent="save">
        <div class="d-flex">
          <v-text-field class="f-title" v-model="post.title" label="Title" :rules="titleRules"></v-text-field>
          <v-text-field class="f-author" label="Author" disabled :value="author.login"></v-text-field>
        </div>
        <v-select v-model="post.tags" :items="tags" item-text="name" label="Tags" return-object multiple></v-select>
        <v-textarea v-model="post.body" label="Body" rows="7" :rules="bodyRules"></v-textarea>
        <div class="d-flex">
          <v-spacer />
          <v-btn color="primary" type="submit">Submit</v-btn>
          <v-btn @click="back()" class="ml-4">Back</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import TagRepository from "@/repositories/TagRepository";
import UserRepository from "@/repositories/UserRepository";
import store from "@/common/store";

export default {
  data() {
    return {
      post: {},
      tags: [],
      author: {},
    };
  },
  computed: {
    titleRules() {
      const rules = [(v) => (v || "").length <= 50 || `A maximum of 50 characters is allowed`];
      return rules;
    },
    bodyRules() {
      const rules = [(v) => !!v || "Field is required", (v) => (v || "").length <= 300 || `A maximum of 300 characters is allowed`];
      return rules;
    },
  },
  async created() {
    this.author = await UserRepository.findOne(store.state.user.id);
    this.tags = await TagRepository.findAll();

    if (this.$route.params.id) {
      this.post = await PostRepository.findOne(this.$route.params.id);
    } else {
      this.post = {};
    }
  },
  methods: {
    async save() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        if (this.post.title == null || this.post.title == "") {
          this.post.title = this.post.body.slice(0, 47);
          if (this.post.body.length > 47) {
            this.post.title = this.post.title.concat("...");
          }
        }
        if (this.post.author == null) {
          this.post.author = this.author;
        }
        const savedPost = await PostRepository.save(this.post);
        this.$router.replace({
          name: "PostDetail",
          params: { id: savedPost.id },
        });
      } catch (err) {
        this.$notify({
          text: err.response.data.message,
          type: "error",
        });
      }
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.f-title {
  margin-right: 0.5rem;
}

.f-author {
  margin-left: 0.5rem;
}
</style>
