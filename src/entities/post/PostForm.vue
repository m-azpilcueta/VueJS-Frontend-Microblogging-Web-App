<template>
  <v-container class="text-center">
    <v-form ref="form" @submit.prevent="save">
      <v-card>
        <v-card-title>
          <v-text-field class="f-title" v-model="post.title" label="Title" :rules="titleRules"></v-text-field>
          <v-text-field class="f-author" label="Author" disabled :value="authorName"></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-select v-model="post.tags" :items="tags" item-text="name" label="Tags" return-object multiple></v-select>

          <v-textarea v-model="post.body" label="Body" rows="7" :rules="bodyRules"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" type="submit">Submit</v-btn>
          <v-btn @click="back()">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import TagRepository from "@/repositories/TagRepository";
import store from "@/common/store";

export default {
  data() {
    return {
      post: {},
      tags: [],
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
    authorName() {
      return store.state.user.login;
    },
  },
  async created() {
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
