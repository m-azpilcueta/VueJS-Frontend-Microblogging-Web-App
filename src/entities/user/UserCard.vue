<template>
  <div v-if="isVisible">
    <v-row class="d-flex flex-column flex-sm-row">
      <v-col class="d-flex justify-center align-end">
        <v-icon size="100">mdi-account-circle</v-icon>
      </v-col>
      <v-col class="d-flex flex-column align-center align-sm-start">
        <h2>{{ updatedUser.login }}</h2>
        <p><strong>Active: </strong>{{ updatedUser.active }}</p>
        <div class="d-flex flex-row justify-start align-center">
          <button @click="deactivate" class="deactivate" v-if="isActive">Deactivate</button>
          <button @click="activate" class="activate" v-if="!isActive">Activate</button>
          <button @click="delete_user" class="remove">Remove</button>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";

export default {
  name: "UserCard",
  data() {
    return {
      visible: true,
      updatedUser: this.user,
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isVisible() {
      return this.visible;
    },
    isActive() {
      return this.updatedUser.active;
    },
  },
  methods: {
    async delete_user() {
      try {
        await UserRepository.delete(this.updatedUser.id);
      } catch (e) {
        this.$notify({
          type: "error",
          text: e.response.data.message,
        });
      } finally {
        this.visible = false;
      }
    },
    async activate() {
      try {
        this.updatedUser = await UserRepository.activate(this.updatedUser.id);
      } catch (e) {
        this.$notify({
          type: "error",
          text: e.response.data.message,
        });
      }
    },
    async deactivate() {
      try {
        this.updatedUser = await UserRepository.deactivate(this.updatedUser.id);
      } catch (e) {
        this.$notify({
          type: "error",
          text: e.response.data.message,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.activate,
.deactivate,
.remove {
  border: none;
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  margin-right: 0.8em;
  font-size: 0.85em;
}

.deactivate {
  background-color: #ff8200;
  color: #f3f3f5;
}

.activate {
  background-color: #12664f;
  color: #f3f3f5;
}

.remove {
  background-color: #ff0000;
  color: #f3f3f5;
}

.v-icon,
h2,
p {
  color: #383950;
}
</style>
