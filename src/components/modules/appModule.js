const state = () => ({
  baseOptions: {},
  error: null,
  detailedInfo: {},
  swapiData: [],
  linksCache: {},
});

const mutations = {
  setBaseOptions(state, payload) {
    state.baseOptions = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setDetailedInfo(state, payload) {
    state.detailedInfo = payload;
  },
  setSwapiData(state, payload) {
    state.swapiData = payload;
  },
  setLinksCache(state, payload) {
    state.linksCache[payload.url] = payload;
  },
};

const actions = {
  /**
   * Gets called when the component first mounts. This method fetches and sets `this.baseOptions` and populates the buttons in the template.
   */
  async setBaseOptions({ commit }) {
    try {
      const response = await fetch(`https://swapi.dev/api/`);
      commit("setBaseOptions", await response.json());
    } catch (error) {
      commit("setError", error);
    }
  },
  /**
   * This method fetches the first 10 items from the link provided and sets `this.swapiData` with the data from the fetch.
   * @param {String} link One of the elements from `this.baseOptions`.
   */
  async setSwapiData({ commit }, link) {
    try {
      const response = await fetch(link);
      const data = await response.json();
      commit("setSwapiData", data.results);
    } catch (error) {
      commit("setError", error);
    }
  },
  /**
   * This method fetches more information on a specific character or item from the link provided and sets `this.moreInfo` with the data from the fetch.
   * @param {String} detailLink URL
   */
  async setDetailedInfo({ commit }, detailLink) {
    try {
      const response = await fetch(detailLink);
      commit("setDetailedInfo", await response.json());
    } catch (error) {
      commit("setError", error);
    }
  },
  /**
   * Iterates over `swapiData` and compares each object's url property against the list of urls in `linksCache`. If the comparison returns as false, the method creates a new property in `linksCache` and assigns it the object currently being iterated over in `swapiData`.
   */
  addToLinksCache({ commit, state }) {
    try {
      state.swapiData.map((element) => {
        if (element.url !== state.linksCache[element.url]) {
          commit("setLinksCache", element);
        }
      });
    } catch (error) {
      commit("setError", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations,
};
