<script>
export default {
  props: ["data", "upperCaseKey", "searchCache", "addToCacheFromInsert"],
  data() {
    return {
      displayValue: [],
    };
  },
  methods: {
    async fetchLink(link) {
      try {
        const response = await fetch(link);
        const data = await response.json();
        this.addToCacheFromInsert(data);
        // return data.name ? data.name : data.title;
      } catch (error) {
        this.error = error;
      }
    },
    newFunction(url) {
      let dataObject = this.searchCache(url);
      dataObject
        ? this.displayValue.push(this.extractNameorTitle(url))
        : this.fetchLink(url);
    },
    extractNameorTitle(url) {
      let data = this.searchCache(url);
      return data.name ? data.name : data.title;
    },
  },
  mounted() {
    if (typeof this.data.value === "string") {
      if (this.data.value.includes("http")) {
        this.newFunction(this.data.value);
      } else {
        this.displayValue.push(this.data.value);
      }
    } else if (this.data.value instanceof Array && this.data.value.length > 0) {
      this.displayValue = [];
      this.data.value.map((url) => {
        this.newFunction(url);
      });
    } else {
      this.displayValue.push("n/a");
    }
  },
};
</script>

<template>
  <div class="flex justify-between w-full">
    <p class="font-bold">{{ this.upperCaseKey(this.data.key) }}:</p>
    <!-- <p v-if="typeof this.displayValue === 'string'">
      {{ this.displayValue }}
    </p> -->
    <div class="text-right">
      <p v-for="arr in this.displayValue" :key="arr">{{ arr }}</p>
    </div>
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
