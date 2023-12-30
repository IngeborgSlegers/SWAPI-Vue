const state = () => ({
  displayValue: [],
});

const mutations = {
  goDisplayValue(state, payload) {
    state.displayValue = payload;
  },
};

const actions = {
  setDisplayValue({ commit }, displayValue) {
    commit("goDisplayValue", displayValue);
  },
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations,
};
