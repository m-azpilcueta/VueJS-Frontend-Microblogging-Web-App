<template>
  <router-link :to="{ name: 'TagPosts', params: { id: tag.id } }" v-slot="{ navigate }" custom>
    <button @click="navigate" class="accent">
      {{ tag.name }}
    </button>
  </router-link>
</template>

<script>
export default {
  name: "TagCard",
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
button {
  border-radius: 4px;
  border: none;
  color: #fff;
  text-align: center;
  padding: 0.5em 1em;
  margin: 1.5em;
  cursor: pointer;
  font-size: 1.2em;
}
</style>
