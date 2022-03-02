<script>
import Insert from './Insert.vue'

export default {
  props: ["element"],
  data() {
    return {
      keys: Object.keys(this.element)
    };
  },
  mounted() {
    console.log(this.keys, this.element);
  },
  components: {
    Insert
  }
};
</script>

<template>
  <div class="card">
    <div v-for="key in keys" :key="key" class="insert">
      <Insert :data="{key: key, value: this.element[key]}"/>
      <!-- <p>{{ key }}:</p>
      <p v-if="typeof this.element[key] === 'string'">
        {{ this.element[key] }}
      </p>
      <li v-else v-for="arr in this.element[key]" :key="arr">{{ arr }}</li> -->
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
