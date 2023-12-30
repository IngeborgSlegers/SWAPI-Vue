<template>
  <div class="flex justify-between w-full">
    <p class="font-bold">{{ this.upperCaseKey(this.data.key) }}:</p>
    <div class="text-right">
      <p v-if="typeof displayValue === 'string'">
        {{ this.displayValue }}
      </p>
      <p v-else v-for="arr in displayValue" :key="arr">{{ arr }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["data", "upperCaseKey", "searchCache", "addToCacheFromInsert"],
  computed: {
    ...mapState({
      displayValue: (state) => state.insertModule.displayValue,
    }),
  },
  methods: {
    ...mapActions({
      setDisplayValue: "insertModule/setDisplayValue",
      addToLinksCache: "appModule/addToLinksCache",
    }),
    async fetchLink(link) {
      try {
        const response = await fetch(link);
        const data = await response.json();
        this.addToCacheFromInsert(data);
      } catch (error) {
        this.error = error;
      }
    },
    newFunction(url) {
      let dataObject = this.searchCache(url);
      dataObject
        ? this.setDisplayValue(this.extractNameorTitle(url))
        : this.fetchLink(url);
    },
    extractNameorTitle(url) {
      let data = this.searchCache(url);
      return data.name ? data.name : data.title;
    },
    howDo() {
      if (typeof this.data.value === "string") {
        if (this.data.value.includes("http")) {
          this.newFunction(this.data.value);
        } else {
          this.setDisplayValue(this.data.value);
        }
      } else if (
        this.data.value instanceof Array &&
        this.data.value.length > 0
      ) {
        this.data.value.map((url) => {
          this.newFunction(url);
        });
      } else {
        this.setDisplayValue("hello");
        this.setDisplayValue("n/a");
      }
    },
  },
  mounted() {
    this.howDo();
  },
};
</script>

<style>
.box {
  /* border: black 1px solid; */
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
