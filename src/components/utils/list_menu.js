import axiosIns from "axios";
let config = "http://192.168.100.61:3000/";

export default {
  async loadDataMenu() {
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
      var dataMenu = response.data.data;
      var newVariabel = [];
      dataMenu.forEach((e) => {
        var data = {
          id_menu: e["id_menu"],
          id_kategori: e["id_kategori"],
          nama_menu: e["nama_menu"],
          deskripsi_menu: e["deskripsi_menu"],
          gambar: e["gambar"],
          harga: e["harga"],
          satuan: e["satuan"],
          status: e["status"],
          is_selected: false,
        };
        newVariabel.push(data);
      });
      return newVariabel;
    } catch (e) {
      console.log(e);
    }
  },

  async loadDataKategori() {
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
      var data = {
        id_kategori: 0,
        nama_kategori: "Semua",
        status: 1,
      };
      var addArray = response.data.data;
      addArray.unshift(data);
      var tampung = [];
      addArray.forEach((element) => {
        var data = {
          id_kategori: element["id_kategori"],
          nama_kategori: element["nama_kategori"],
          status: element["status"],
          isActive: false,
        };
        tampung.push(data);
      });
      tampung.forEach((e) => {
        if (e["id_kategori"] == 0) {
          e["isActive"] = true;
        }
      });
      return tampung;
    } catch (e) {
      console.log(e);
    }
  },

  async kirimPesanan(pesanan, nama_pemesan, nomor_meja) {
    let formData = {
        "list_pesanan" : pesanan,
        "nama_pemesan" : nama_pemesan,
        "nomor_meja" : nomor_meja,
    }

    try {
      const response = await axiosIns.post(config + "pesanan", formData , {
        auth: {
          username: "aplikasiCasher",
          password: "6289686113476@casherApp#90@",
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        }
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  },
};
