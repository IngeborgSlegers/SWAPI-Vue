<script>
export default {
  props: ["character", "fetchDetailedInfo"],
  // mounted() {
  //   console.log("hey", this.character)
  // }
};
</script>
<template>
  <button
    @click="fetchDetailedInfo(this.character.url)"
    class="focus:text-violet-700"
  >
    <router-link
      :to="{
        path: `/${this.$route.path}`,
        params: { details: this.character.name || this.character.title },
        name: 'details',
      }"
    >
      {{ this.character.name ? this.character.name : this.character.title }}
    </router-link>
  </button>
</template>
