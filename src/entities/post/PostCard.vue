<template>
  <div class="post-card d-flex flex-column">
    <div class="d-flex flex-column flex-sm-row pa-2">
      <v-icon v-if="post.author != null" size="56">mdi-account-circle</v-icon>
      <div class="titles d-flex flex-column ma-2">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" v-slot="{ navigate }" custom>
          <strong @click="navigate" class="pointer">{{ post.title }}</strong>
        </router-link>
        <span>
          <router-link v-if="author.login != null" :to="{ name: 'UserDetail', params: { id: author.id } }" v-slot="{ navigate }" custom>
            <span @click="navigate" class="pointer mr-1"
              >by <strong>{{ author.login }}</strong></span
            >
          </router-link>
          <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" v-slot="{ navigate }" custom>
            <v-icon size="20">mdi-calendar-month</v-icon>
            <span @click="navigate" class="pointer"> {{ dateAsString(post.timestamp) }} </span>
          </router-link>
        </span>
        <span v-if="post.tags.length > 0">
          Tags: <span class="tags">{{ tagsAsString(post.tags) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  methods: {
    tagsAsString(tags) {
      return tags.map((t) => t.name).join(", ");
    },
    dateAsString(date) {
      return moment(date).format("LLL");
    },
  },
};
</script>

<style scoped>
.tags {
  font-style: italic;
}

.titles {
  width: 80%;
  overflow-wrap: break-word;
}

.post-card {
  width: 80%;
  margin-left: 10%;
}

.v-icon,
strong,
span {
  color: #383950;
}
</style>
