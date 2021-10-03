<template>
  <div v-if="isVisible" class="d-flex justify-center align-center">
    <v-form ref="form" @submit.prevent="updateTag" class="d-flex align-center">
      <v-text-field class="mr-4" label="Edit" v-model="newTag" @input="changed = true" :rules="addRules"></v-text-field>
      <v-icon class="pointer" v-if="changed" @click="updateTag">mdi-check-circle</v-icon>
      <v-icon class="pointer" @click="removeTag">mdi-delete</v-icon>
    </v-form>
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
    addRules() {
      const rules = [(v) => !!v || "Field is required"];
      return rules;
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
      if (!this.$refs.form.validate()) {
        return;
      }
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
.v-icon {
  margin-right: 1em;
  color: #383950;
}
</style>
