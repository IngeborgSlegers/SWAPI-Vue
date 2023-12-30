<template>
  <div class="mt-6">
    <h1 class="text-6xl font-bold underline text-center">Star Wars API</h1>
    <div class="flex justify-evenly mt-6">
      <button
        v-for="(option, key) in baseOptions"
        :key="option"
        class="text-white text-2xl m-4 px-6 py-4 rounded-full bg-slate-500 hover:bg-sky-500/100"
        type="button"
        @click="this.setSwapiData(option)"
      >
        <router-link
          :to="{ name: 'swapiValue', params: { swapiValue: key } }"
          >{{ this.upperCaseKey(key) }}</router-link
        >
      </button>
    </div>
    <div class="flex flex-row flex-wrap justify-around">
      <div>
        <p v-for="element in swapiData" :key="element">
          <Name
            :character="element"
            :fetchDetailedInfo="this.setDetailedInfo"
            :searchCache="this.searchCache"
          />
        </p>
      </div>
      <div class="border border-black p-3 hover:shadow">
        <div v-for="(value, key) in detailedInfo" :key="{ key: value }">
          <Insert
            :data="{ key, value }"
            :upperCaseKey="this.upperCaseKey"
            :searchCache="this.searchCache"
            :addToCacheFromInsert="this.addToCacheFromInsert"
            v-if="key !== 'url' && key !== 'created' && key !== 'edited'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Name from "./components/SWAPI/NameDisplayComponent.vue";
import Insert from "./components/SWAPI/InsertComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      moreInfo: {},
      linksList: {},
    };
  },
  computed: {
    ...mapState({
      baseOptions: (state) => state.appModule.baseOptions,
      error: (state) => state.appModule.error,
      swapiData: (state) => state.appModule.swapiData,
      detailedInfo: (state) => state.appModule.detailedInfo,
      linksCache: (state) => state.appModule.linksCache,
    }),
  },
  methods: {
    ...mapActions({
      setBaseOptions: "appModule/setBaseOptions",
      setSwapiData: "appModule/setSwapiData",
      setDetailedInfo: "appModule/setDetailedInfo",
      addToLinksCache: "appModule/addToLinksCache",
    }),
    /**
     * Gets called to uppercase the first letter of a given string.
     * @param {String} string
     */
    upperCaseKey(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    addToCacheFromInsert(dataObject) {
      this.linksList[dataObject.url] = dataObject;
    },
    searchCache(link) {
      let dataToBeDisplayed = this.linksList[link];
      return dataToBeDisplayed;
    },
  },
  mounted() {
    this.setBaseOptions();
  },
  watch: {
    moreInfo: {
      handler(newState, oldState) {
        if (newState != oldState && oldState) {
          this.setDetailedInfo(newState);
        }
      },
    },
    swapiData: {
      handler(newState, oldState) {
        if (newState != oldState) {
          this.addToLinksCache();
        }
      },
    },
  },
  created() {
    this.$watch(
      () => this.$route,
      (toRoute) => {
        if (toRoute.params.details) {
          this.setSwapiData(
            `https://swapi.dev/api/${toRoute.params.swapiValue}`
          ).then(() => {
            const filtered = this.swapiData.filter(
              (swap) =>
                swap.name == toRoute.params.details ||
                swap.title == toRoute.params.details
            );
            this.setDetailedInfo(filtered[0].url);
          });
        } else if (toRoute.params.swapiValue) {
          this.setSwapiData(
            `https://swapi.dev/api/${toRoute.params.swapiValue}`
          );
        }
      }
    );
  },
  components: {
    Name,
    Insert,
  },
};
</script>

<style>
@import "./assets/base.css";
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
