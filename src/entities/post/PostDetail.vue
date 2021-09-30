<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="loading" class="loading">Loading...</v-col>
      <v-col cols="8" offset="2" v-if="post">
        <v-card>
          <v-card-title>
            <span>{{ post.title }}</span>
            <v-spacer />
            <router-link v-if="post.author.login != null" :to="{ name: 'UserDetail', params: { id: post.author.id } }" v-slot="{ navigate }" custom>
              <span @click="navigate" class="pointer">by {{ post.author.login }}</span>
            </router-link>
          </v-card-title>
          <v-card-subtitle> {{ dateAsString(post.timestamp) }} </v-card-subtitle>

          <v-card-text>
            <div>
              Tags: <span class="tags">{{ tagsAsString }}</span>
            </div>
            <v-divider />
            <div class="post">
              {{ post.body }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn :to="{ name: 'PostUpdate', params: { id: post.id } }" color="primary"> Edit </v-btn>
            <v-btn class="remove" @click="removePost" v-if="checkRemove"> Remove </v-btn>
            <v-btn @click="back()"> Back </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import moment from "moment";
import store from "@/common/store";

export default {
  data() {
    return {
      loading: false,
      post: null,
      user: store.state.user,
    };
  },
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
  color: rgba(0, 0, 0, 0.87);
  font-size: larger;
}

.error {
  margin-top: 40px;
}

.remove {
  background-color: red !important;
  color: whitesmoke !important;
}
</style>
