<template>
  <div class="on-load d-flex justify-center align-center flex-column">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
    <span class="loading">Loading</span>
  </div>
</template>

<script>
export default {
  name: "LoadSpinner",
};
</script>

<style lang="scss" scoped>
.on-load {
  width: 100%;
  height: 100%;

  span {
    margin-top: 1em;
  }
}
</style>
