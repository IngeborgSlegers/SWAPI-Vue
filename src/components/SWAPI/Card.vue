<script>
import Insert from './Insert.vue'

export default {
  props: ["element"],
  data() {
    return {
      keys: Object.keys(this.element).filter(key => key !== "created" && key !== "edited" && key !== "url")
    };
  },
  components: {
    Insert
  },
  mounted() {
    console.log(element)
  }
};
</script>

<template>
  <div class="border border-black p-3 hover:shadow">
    <div v-for="key in keys" :key="key" class="insert">
      <Insert :data="{key: key, value: this.element[key]}"/>
    </div>
  </div>
</template>

<style>
.card {
  border: black 1px solid;
  padding: 2em;
  /* display: flex;
  flex-direction: row; */
}
.insert {
  display: flex;
}
</style>
