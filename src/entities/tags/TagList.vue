<template>
  <div class="my-container">
    <section class="on-load d-flex justify-center align-center flex-column" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <span class="loading">Loading</span>
    </section>
    <section class="tag-section d-flex justify-center" v-if="tags">
      <div class="box">
        <div class="title-wrapper d-flex justify-center">
          <div class="left"></div>
          <div class="center">
            <h1>Tags</h1>
          </div>
          <div class="right d-flex justify-start align-center">
            <router-link :to="{ name: 'ManageTags' }" v-slot="{ navigate }" custom>
              <div v-if="isAdmin" @click="navigate" class="manage-wrapper d-flex justify-center pointer">
                <v-icon color="primary"> mdi-cog </v-icon>
                <span class="hidden-xs-only">Manage</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="tag-list d-flex justify-center flex-wrap">
          <TagCard v-for="tag in tags" :key="tag.id" :tag="tag"></TagCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TagRepository from "@/repositories/TagRepository";
import TagCard from "./TagCard.vue";
import store from "@/common/store";

export default {
  data() {
    return {
      tags: null,
      loading: false,
      user: store.state.user,
    };
  },
  components: { TagCard },
  computed: {
    isAdmin() {
      return this.user.authority == "ADMIN";
    },
  },
  async mounted() {
    this.loading = true;
    try {
      this.tags = await TagRepository.findAll();
    } catch (e) {
      this.$notify({
        text: e.response.data.message,
        type: "error",
      });
      setTimeout(() => this.$router.go(-1), 1500);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  width: 100%;
  height: 100%;

  .on-load {
    width: 100%;
    height: 100%;

    span {
      margin-top: 1em;
    }
  }

  .tag-section {
    width: 100%;

    .box {
      .title-wrapper {
        margin-bottom: 1.5em;

        .left {
          width: 30%;
        }

        .center {
          width: 40%;

          h1 {
            text-align: center;
            color: #383950;
          }
        }

        .right {
          width: 30%;
          span {
            margin-left: 0.5em;
            color: #383950;
          }
        }
      }
    }
  }
}
</style>
