<template>
  <v-container>
    <v-row>
      <v-col class="text-center"><h1 class="display-2 font-weight-bold">Welcome to the Vue Example!</h1></v-col>
      <v-col><v-img :src="require('../assets/udc.png')" contain height="100"></v-img></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  margin-top: 30px;
  margin-bottom: 60px;
  color: #383950;
}
</style>
