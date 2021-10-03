<template>
  <div class="my-container">
    <LoadSpinner v-if="loading"></LoadSpinner>
    <section v-if="users" class="d-flex justify-center">
      <div class="box">
        <h1>User List</h1>
        <div class="user-list">
          <UserCard v-for="user in users" :key="user.id" :user="user"></UserCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoadSpinner from "@/components/LoadSpinner";
import UserRepository from "@/repositories/UserRepository";
import UserCard from "./UserCard.vue";

export default {
  data() {
    return {
      loading: false,
      users: null,
    };
  },
  components: { LoadSpinner, UserCard },
  async mounted() {
    this.loading = true;
    try {
      this.users = await UserRepository.findAll();
    } catch (e) {
      this.$$notify({
        type: "error",
        text: e.response.data.message,
      });
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100%;

  h1 {
    text-align: center;
    margin-bottom: 2em;
    color: #383950;
  }
}
</style>
