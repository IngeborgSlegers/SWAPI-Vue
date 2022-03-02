<script>
export default {
  props: ["data"]
};
</script>

<template>
  <div class="box">
    <p>{{ this.data.key }}:</p>
    <p v-if="typeof this.data.value === 'string'">
      {{ this.data.value }}
    </p>
    <ul v-else>
      <li v-for="arr in this.data.value" :key="arr">{{ arr }}</li>
    </ul>
  </div>
</template>

<style>
.box {
  /* border: black 1px solid; */
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
