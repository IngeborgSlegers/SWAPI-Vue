<script>
export default {
  props: ["character", "fetchDetailedInfo"]
  // mounted() {
  //   console.log("hey", this.character)
  // }
};
</script>
<template>
  <button @click="fetchDetailedInfo(this.character.url)" class="focus:text-violet-700">
    {{ this.character.name ? this.character.name : this.character.title }}
  </button>
</template>
