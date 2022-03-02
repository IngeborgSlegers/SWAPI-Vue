<script>
import Card from './components/SWAPI/Card.vue'

export default {
  data() {
    return {
      search: '',
      swapiData: [],
      error: null
    }
  },
  methods: {
    async fetchSWAPI() {
      try {
        const response = await fetch(`https://swapi.dev/api/${this.search}`)
        const data = await response.json()
        this.swapiData = data.results
        console.log(data.results)
      } catch (error) {
        this.error = error
      }
    },
    setSearchValue(value) {
      console.log(value)
      this.search = value
      if(this.search) {
        this.fetchSWAPI()
      }
    }
  },
  components: {
    Card
  }
}
</script>

<template>
  <div>
    <div>
      <button @click="setSearchValue('people')">People</button>
      <button @click="setSearchValue('planets')">Planets</button>
      <button @click="setSearchValue('species')">Species</button>
      <h1>{{this.search}}</h1>
    </div>
    <div class="cards">
      <div  v-for="element in swapiData" :key="element">
        <Card :element="element"/>
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
