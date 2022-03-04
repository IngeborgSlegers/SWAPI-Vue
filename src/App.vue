<script>
import Card from "./components/SWAPI/Card.vue";

export default {
  data() {
    return {
      search: "",
      swapiData: [],
      error: null
    };
  },
  methods: {
    async fetchSWAPI() {
      try {
        const response = await fetch(`https://swapi.dev/api/${this.search}`);
        const data = await response.json();
        this.swapiData = data.results;
      } catch (error) {
        this.error = error;
      }
    },
    setSearchValue(value) {
      this.search = value;
      if (this.search) {
        this.fetchSWAPI();
      }
    }
  },
  components: {
    Card
  }
};
</script>

<template>
  <div class="mt-6">
    <h1 class="text-6xl font-bold underline text-center">Star Wars API</h1>
    <div class="flex justify-evenly mt-6">
      <button
        class="text-white text-5xl m-4 px-6 py-4 rounded-full bg-slate-500 hover:bg-sky-500/100"
        type="button"
        @click="setSearchValue('people')"
      >
        People
      </button>
      <button
        class="text-white text-5xl m-4 px-6 py-4 rounded-full bg-slate-500 hover:bg-sky-500/100"
        type="button"
        @click="setSearchValue('planets')"
      >
        Planets
      </button>
      <button
        class="text-white text-5xl m-4 px-6 py-4 rounded-full bg-slate-500 hover:bg-sky-500/100"
        type="button"
        @click="setSearchValue('species')"
      >
        Species
      </button>
      <!-- <h1>{{this.search}}</h1> -->
    </div>
    <div class="flex flex-row flex-wrap justify-around">
      <div v-for="element in swapiData" :key="element" class="mb-4">
        <Card :element="element" />
      </div>
    </div>
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
