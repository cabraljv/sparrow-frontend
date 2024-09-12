export default {
  namespaced: true,
  state: () => ({
    search: "",
  }),
  mutations: {
    setSearch(state, value) {
      state.search = value;
    },
  },

  actions: {
    setSearch({ commit }, value) {
      commit("setSearch", value);
    },
  },
  getters: {
    search: (state) => state.search,
  },
};
