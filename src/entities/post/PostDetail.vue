<template>
  <div class="my-container">
    <LoadSpinner v-if="loading"></LoadSpinner>
    <section class="d-flex justify-center" v-if="post">
      <div class="box d-flex flex-column">
        <div class="d-flex px-4 pb-4">
          <v-icon size="52">mdi-account-circle</v-icon>
          <div class="titles d-flex flex-column ml-4">
            <h1>{{ post.title }}</h1>
            <span>
              <router-link v-if="post.author.login != null" :to="{ name: 'UserDetail', params: { id: post.author.id } }" v-slot="{ navigate }" custom>
                <span @click="navigate" class="pointer mr-1"
                  >by <strong>{{ post.author.login }}</strong></span
                >
              </router-link>
              <v-icon size="20">mdi-calendar-month</v-icon>
              <span> {{ dateAsString(post.timestamp) }} </span>
            </span>
            <span v-if="post.tags.length > 0">
              Tags: <span class="tags">{{ tagsAsString }}</span>
            </span>
          </div>
        </div>
        <v-divider />
        <div class="px-4 post">
          {{ post.body }}
        </div>
        <div class="action-buttons d-flex justify-end">
          <v-btn class="remove mr-3" @click="removePost" v-if="checkRemove"> Remove </v-btn>
          <v-btn @click="back()" color="primary"> Back </v-btn>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import moment from "moment";
import store from "@/common/store";
import LoadSpinner from "@/components/LoadSpinner";

export default {
  data() {
    return {
      loading: false,
      post: null,
      user: store.state.user,
    };
  },
  components: { LoadSpinner },
  async mounted() {
    this.loading = true;
    try {
      this.post = await PostRepository.findOne(this.$route.params.id);
    } catch (e) {
      this.$notify({
        text: e.response.data.message,
        type: "error",
      });
      setTimeout(() => this.back(), 2000);
    } finally {
      this.loading = false;
    }
  },
  computed: {
    tagsAsString() {
      return this.post.tags.map((t) => t.name).join(", ");
    },
    checkRemove() {
      return this.post.author.id == this.user.id;
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    dateAsString(date) {
      return moment(date).format("LLL");
    },
    async removePost() {
      try {
        await PostRepository.delete(this.$route.params.id);
        this.$router.push({ path: `/user/${this.user.id}` });
      } catch (e) {
        this.$notify({
          text: e.response.data.message,
          type: "error",
        });
        setTimeout(() => this.back(), 2000);
      }
    },
  },
};
</script>

<style scoped>
.tags {
  font-style: italic;
}
.post {
  padding: 30px 50px;
  color: #383950;
  font-size: larger;
}

.error {
  margin-top: 40px;
}

.remove {
  background-color: red !important;
  color: whitesmoke !important;
}

h1,
span,
.v-icon {
  color: #383950;
}
</style>
