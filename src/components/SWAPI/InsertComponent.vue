<script>
export default {
  props: ["data", "upperCaseKey"],
  data() {
    return {
      displayValue: undefined,
    };
  },
  methods: {
    async fetchLink(link) {
      try {
        const response = await fetch(link);
        const data = await response.json();
        return data.name ? data.name : data.title;
      } catch (error) {
        this.error = error;
      }
    },
  },
  mounted() {
    // console.log(this.data)
    if (typeof this.data.value === "string") {
      if (this.data.value.includes("http")) {
        this.fetchLink(this.data.value).then(
          (response) => (this.displayValue = response)
        );
      } else {
        this.displayValue = this.data.value;
      }
    } else if (this.data.value instanceof Array && this.data.value.length > 0) {
      this.displayValue = [];
      this.data.value.map((thing) => {
        this.fetchLink(thing).then((response) =>
          this.displayValue.push(response)
        );
      });
    } else {
      this.displayValue = "n/a";
    }
  },
};
</script>

<template>
  <div class="flex justify-between w-full">
    <p class="font-bold">{{ this.upperCaseKey(this.data.key) }}:</p>
    <p v-if="typeof this.displayValue === 'string'">
      {{ this.displayValue }}
    </p>
    <div v-else class="text-right">
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
