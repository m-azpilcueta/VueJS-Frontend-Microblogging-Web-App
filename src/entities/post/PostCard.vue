<template>
  <v-card>
    <v-card-title>
      <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" v-slot="{ navigate }" custom>
        <span @click="navigate" class="pointer">{{ post.title }}</span>
      </router-link>
      <v-spacer />
      <span>by {{ post.author.login }}</span>
    </v-card-title>
    <v-card-subtitle> {{ post.timestamp }} </v-card-subtitle>

    <v-card-text v-if="post.tags.length > 0">
      Tags: <span class="tags">{{ tagsAsString(post.tags) }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    tagsAsString(tags) {
      return tags.map((t) => t.name).join(", ");
    },
  },
};
</script>

<style scoped>
.tags {
  font-style: italic;
}
</style>
