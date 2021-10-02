<template>
  <div v-if="isVisible" class="d-flex justify-center align-center">
    <label for="name">Edit:</label>
    <input id="name" type="text" v-model="newTag" @change="changed = true" />
    <v-icon v-if="changed" @click="updateTag">mdi-check-circle</v-icon>
    <v-icon @click="removeTag">mdi-delete</v-icon>
  </div>
</template>

<script>
import TagRepository from "@/repositories/TagRepository";

export default {
  name: "TagModify",
  data() {
    return {
      visible: true,
      newTag: this.tag.name,
      changed: false,
    };
  },
  computed: {
    isVisible() {
      return this.visible;
    },
  },
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async removeTag() {
      await TagRepository.remove(this.tag.id);
      this.visible = false;
    },
    async updateTag() {
      try {
        await TagRepository.update({
          id: this.tag.id,
          name: this.newTag,
        });
      } catch (e) {
        this.$notify({
          text: e.response.data.message,
          type: "error",
        });
      } finally {
        this.changed = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  margin: 1em 1em 1em 1em;
}

.v-icon {
  margin-right: 1em;
}
</style>
