<template>
  <v-card>
    <v-card-title>
      <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" v-slot="{ navigate }" custom>
        <span @click="navigate" class="pointer">{{ post.title }}</span>
      </router-link>
      <v-spacer />
      <router-link v-if="author.login != null" :to="{ name: 'UserDetail', params: { id: author.id } }" v-slot="{ navigate }" custom>
        <span @click="navigate" class="pointer">by {{ author.login }}</span>
      </router-link>
    </v-card-title>
    <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" v-slot="{ navigate }" custom>
      <v-card-subtitle @click="navigate" class="pointer"> {{ dateAsString(post.timestamp) }} </v-card-subtitle>
    </router-link>
    <v-card-text v-if="post.tags.length > 0">
      Tags: <span class="tags">{{ tagsAsString(post.tags) }}</span>
    </v-card-text>
  </v-card>
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
</style>
