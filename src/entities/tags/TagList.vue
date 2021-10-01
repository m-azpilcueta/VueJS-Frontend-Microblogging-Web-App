<template>
  <div class="my-container">
    <section class="on-load d-flex justify-center align-center flex-column" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <span class="loading">Loading</span>
    </section>
    <section class="tag-section d-flex align-center" v-if="tags">
      <div class="tag-box">
        <div class="title-wrapper d-flex justify-center">
          <div class="left"></div>
          <div class="center">
            <h1>Tags</h1>
          </div>
          <div class="right d-flex justify-start align-center pointer">
            <div v-if="isAdmin" class="manage-wrapper d-flex justify-center">
              <v-icon color="primary"> mdi-cog </v-icon>
              <span class="hidden-xs-only">Manage</span>
            </div>
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
    height: 100%;

    .tag-box {
      width: 70%;
      background-color: whitesmoke;
      padding: 3.5em 1em;
      margin: 0 auto;
      border-radius: 3px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

      h1 {
        text-align: center;
      }

      .title-wrapper {
        margin-bottom: 1.5em;

        .left {
          width: 30%;
        }

        .center {
          width: 40%;

          h1 {
            font-size: xx-large;
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
