import axiosIns from "axios";
// import Vue from "vue";

let config = "http://192.168.100.61:3000/";

export default {
  namespaced: true,
  state: {
    allMenu: [],
    allKategori: [],
  },
  getters: {
    getAllMenu(state) {
      return state.allMenu;
    },
    getAllKategori(state) {
      return state.allKategori;
    },
  },
  mutations: {
    SET_MENU(state, allRows) {
      state.allMenu = allRows;
    },
    SET_KATEGORI(state, allRows) {
      state.allKategori = allRows;
    },
  },
  actions: {
    async loadDataMenu({ commit }) {
      try {
        const response = await axiosIns.get(config + "getMenu", {
          auth: {
            username: "aplikasiCasher",
            password: "6289686113476@casherApp#90@",
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        });
        commit("SET_MENU", response.data.data);
      } catch (e) {
        console.log(e);
      }
    },
    async loadDataKategori({ commit }) {
      try {
        const response = await axiosIns.get(config + "kategori", {
          auth: {
            username: "aplikasiCasher",
            password: "6289686113476@casherApp#90@",
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        });
        commit("SET_KATEGORI", response.data.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
