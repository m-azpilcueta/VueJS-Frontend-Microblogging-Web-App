<template>
  <button class="accent">
    {{ tag.name }}
  </button>
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
  padding: 1em 2em;
  margin: 1.5em;
  cursor: pointer;
  font-size: 1.2em;
}
</style>
