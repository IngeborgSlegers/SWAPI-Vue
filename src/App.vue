<script>
import Card from "./components/SWAPI/Card.vue";
import Name from "./components/SWAPI/Name.vue";
import Insert from "./components/SWAPI/Insert.vue";

export default {
  data() {
    return {
      swapiData: [],
      baseOptions: {},
      error: null,
      moreInfo: {}
    };
  },
  methods: {
    async fetchBase() {
      try {
        const response = await fetch(`https://swapi.dev/api/`);
        const data = await response.json();
        this.baseOptions = data;
      } catch (error) {
        this.error = error;
      }
    },
    async fetchSWAPIFromLink(link) {
      try {
        this.moreInfo = {};
        const response = await fetch(link);
        const data = await response.json();
        this.swapiData = data.results;
      } catch (error) {
        this.error = error;
      }
    },
    async fetchDetailedInfo(detailLink) {
      try {
        const response = await fetch(detailLink);
        const data = await response.json();
        this.moreInfo = data;
      } catch (error) {
        this.error = error;
      }
    },
    upperCaseKey(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  mounted() {
    this.fetchBase();
  },
  watch: {
    moreInfo: {
      handler(newState, oldState) {
        if(newState != oldState && oldState) {
          this.moreInfo = newState;
        }
      },
    }
  },
  components: {
    Card,
    Name,
    Insert
  }
};
</script>

<template>
  <div class="mt-6">
    <h1 class="text-6xl font-bold underline text-center">Star Wars API</h1>
    <div class="flex justify-evenly mt-6">
      <button
        v-for="(option, key) in baseOptions"
        :key="option"
        class="text-white text-2xl m-4 px-6 py-4 rounded-full bg-slate-500 hover:bg-sky-500/100"
        type="button"
        @click="fetchSWAPIFromLink(option)"
      >
        {{ this.upperCaseKey(key) }}
      </button>
    </div>
    <div class="flex flex-row flex-wrap justify-around">
      <div>
        <p v-for="element in swapiData" :key="element">
          <Name
            :character="element"
            :fetchDetailedInfo="this.fetchDetailedInfo"
          />
        </p>
      </div>
      <div  class="border border-black p-3 hover:shadow">
        <div v-for="(value, key) in moreInfo" :key="{key: value}">
          <Insert :data="{ key, value }" :upperCaseKey="this.upperCaseKey" />
        </div>
      </div>
    </div>
    <!-- <div class="flex flex-row flex-wrap justify-around">
      <div v-for="element in swapiData" :key="element" class="mb-4">
        <Card :element="element" />
        class="border border-black p-3 hover:shadow"
      </div>
    </div> -->
  </div>
</template>

<style>
@import "./assets/base.css";
.cards {
  /* border: black 1px solid; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
