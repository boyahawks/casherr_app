<template>
  <div class="ListMenu">
    <div class="container">
      <div class="row">
        <h5 class="center">Manjiw Cafe</h5>
        <div class="line1">
          <div class="col-sm-8 col-12">
            <ul class="list-group">
              <div
                v-for="item in kategori"
                :id="item.id"
                :key="item.id"
                @click="getIdKategori(item.id_kategori)"
              >
                <div v-if="item.isActive == true">
                  <li class="list-group-item active">
                    <p>{{ item.nama_kategori }}</p>
                  </li>
                </div>
                <div v-else>
                  <li class="list-group-item">
                    <p>{{ item.nama_kategori }}</p>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div class="line2">
          <div class="col-sm-8 col-12">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="item in menuSelected"
                :id="item.id"
                :key="item.id"
                @click="selectMenu(item.id_menu, item.is_selected)"
              >
                <span class="checkboxX" v-if="item.is_selected == false">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onclick="return false;"
                  />
                </span>
                <span class="checkboxX" v-else>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onclick="return false;"
                    checked
                  />
                </span>

                <img :src="assetsConfig + item.gambar" alt="gambar produk" />
                <p>{{ item.nama_menu }}</p>
                <p>Rp {{ item.harga | formatNumber }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="sub1">
        <p class="jml-pesan">{{ jumlahPesanan }}</p>
        <button>
          <i
            class="fa fa-book"
            aria-hidden="true"
            @click="openDetailPemesanan"
          ></i>
        </button>
        <p>Pesanan Anda</p>
      </div>
    </div>
    <!-- Modal Pilih Menu -->
    <b-modal id="modalPilihMenu" button-size="sm" title="Pilih Menu">
      <div
        class="center"
        v-for="item in pilihMenu"
        :id="item.id"
        :key="item.id"
      >
        <p>{{ item.nama_menu }}</p>
        <p>Rp {{ item.harga | formatNumber }} / {{ item.satuan }}</p>
      </div>
      <b-row>
        <input id="qtyPesan" type="number" min="1" v-model="qtyPesan" />
      </b-row>

      <template #modal-footer="">
        <b-button
          class="styleButton"
          size="sm"
          variant="danger"
          @click="closeModal()"
        >
          Nanti dulu deh...
        </b-button>
        <b-button
          class="styleButton"
          size="sm"
          variant="success"
          @click="masukKeranjang()"
        >
          Pesan Menu
        </b-button>
      </template>
    </b-modal>
    <!-- Modal Gagal Pilih Menu -->
    <b-modal id="modalGagalPilih" button-size="sm" title="Hapus Menu">
      <div
        class="center"
        v-for="item in pilihMenu"
        :id="item.id"
        :key="item.id"
      >
        <div class="formQtyPesanan">
          <input
            id="detailQtyBeli"
            type="number"
            min="1"
            v-model="item.qty_beli"
          />
        </div>
        <img
          class="gambarDetailPemesanan"
          :src="assetsConfig + item.gambar"
          alt="gambar produk"
        />
        <p>{{ item.nama_menu }}</p>
        <p>Rp {{ item.harga | formatNumber }} / {{ item.satuan }}</p>
      </div>
      <template #modal-footer="">
        <b-button
          class="styleButton"
          size="sm"
          variant="danger"
          @click="closeModal2()"
        >
          Tutup
        </b-button>
        <b-button
          size="sm"
          class="styleButton"
          variant="success"
          v-for="item in pilihMenu"
          :id="item.id"
          :key="item.id"
          @click="editMenuTerpilih(item, 'modalGagal')"
        >
          Edit jumlah
        </b-button>
        <b-button
          size="sm"
          class="styleButton"
          variant="success"
          v-for="item in pilihMenu"
          :id="item.id"
          :key="item.id"
          @click="hapusMenuTerpilih(item, 'modalGagal')"
        >
          Iya, lain kali...
        </b-button>
      </template>
    </b-modal>
    <!-- Modal Detail Pemesanan  -->
    <b-modal id="modalDetailPemesanan" title="Detail Pemesanan">
      <div v-if="keranjang.length == 0">
        <p class="center">Belum ada menu yang kamu pilih...</p>
      </div>
      <div v-else>
        <div class="list-group3">
          <div
            class="list-group-item3"
            v-for="item in keranjang"
            :id="item.id"
            :key="item.id"
          >
            <div class="col-sm-12 col-12">
              <div class="formQtyPesanan">
                <input
                  id="detailQtyBeli"
                  type="number"
                  min="1"
                  v-model="item.qty_beli"
                />
              </div>
              <div class="wrapImage">
                <img
                  class="gambarDetailPemesanan"
                  :src="assetsConfig + item.gambar"
                  alt="gambar produk"
                />
              </div>

              <div class="decContent">
                <p>{{ item.nama_menu }}</p>
                <p>Rp {{ item.harga | formatNumber }}</p>
                <div class="row">
                  <div class="col-sm-12 col-12">
                    <button
                      class="btn btn-danger styleButton"
                      @click="hapusMenuTerpilih(item, 'modalKeranjang')"
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                      class="btn btn-success styleButton"
                      @click="editMenuTerpilih(item, 'modalKeranjang')"
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div id="totalDibayar">
          <p>Nama Pemesan</p>
          <input type="text" placeholder="Nama anda" v-model="nama_pemesan" />
          <p>Meja</p>
          <input type="text" placeholder="Nomor Meja" v-model="nomor_meja" />
          <p>Total : Rp{{ totalRpHarusDibayar | formatNumber }}</p>
          <button
            class="btn btn-success styleButton"
            @click="validasiPesanan()"
          >
            Pesan sekarang</button
          ><br /><br />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import controller from "./utils/list_menu";
import Swal from "sweetalert2";

export default {
  name: "ListMenu",
  components: {},
  data() {
    return {
      nama_pemesan: "",
      nomor_meja: "",
      menu: [],
      menuSelected: [],
      pilihMenu: [],
      kategori: [],
      keranjang: [],
      jumlahPesanan: 0,
      totalRpHarusDibayar: 0,
      qtyPesan: 1,
      assetsConfig: "http://192.168.100.61:3000/gambar_menu/",
      kategoriSelected: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // get menu
      this.menu = await controller.loadDataMenu();
      this.menuSelected = await controller.loadDataMenu();
      // get kategori
      this.kategori = await controller.loadDataKategori();
    },
    getIdKategori(id) {
      this.kategori.forEach((e) => {
        if (e["id_kategori"] == id) {
          e["isActive"] = true;
        } else {
          e["isActive"] = false;
        }
      });
      this.menuSelected = [];
      this.menu.forEach((e) => {
        if (e["id_kategori"] == id) {
          this.menuSelected.push(e);
          this.kategoriSelected = true;
        } else if (id == 0) {
          this.menuSelected.push(e);
          this.kategoriSelected = false;
        }
      });
    },
    selectMenu(id, selected) {
      this.pilihMenu = [];
      if (selected) {
        this.$bvModal.show("modalGagalPilih");
        this.keranjang.forEach((e) => {
          if (e["id_menu"] == id) {
            this.pilihMenu.push(e);
          }
        });
      } else {
        this.$bvModal.show("modalPilihMenu");
        this.menuSelected.forEach((e) => {
          if (e["id_menu"] == id) {
            this.pilihMenu.push(e);
          }
        });
      }
    },
    closeModal() {
      this.$bvModal.hide("modalPilihMenu");
    },
    closeModal2() {
      this.$bvModal.hide("modalGagalPilih");
    },
    masukKeranjang() {
      var id = this.pilihMenu[0]["id_menu"];
      this.menuSelected.forEach((e) => {
        if (e["id_menu"] == id) {
          e["is_selected"] = true;
        }
      });
      this.menu.forEach((e) => {
        if (e["id_menu"] == id) {
          e["is_selected"] = true;
        }
      });
      var hasilHitungTotal = 0;
      this.pilihMenu.forEach((e) => {
        var hitungTotal = e["harga"] * this.qtyPesan;
        hasilHitungTotal += hitungTotal;
        var data = {
          id_menu: e["id_menu"],
          id_kategori: e["id_kategori"],
          nama_menu: e["nama_menu"],
          deskripsi_menu: e["deskripsi_menu"],
          gambar: e["gambar"],
          harga: e["harga"],
          satuan: e["satuan"],
          status: e["status"],
          qty_beli: this.qtyPesan,
        };
        this.keranjang.push(data);
      });
      this.qtyPesan = 1;
      this.totalRpHarusDibayar = this.totalRpHarusDibayar + hasilHitungTotal;
      this.jumlahPesanan = this.keranjang.length;
      this.pilihMenu = [];
      this.$bvModal.hide("modalPilihMenu");
    },
    hapusMenuTerpilih(item, status) {
      this.menuSelected.forEach((e) => {
        if (e.id_menu == item.id_menu) {
          e.is_selected = false;
        }
      });
      this.menu.forEach((e) => {
        if (e.id_menu == item.id_menu) {
          e.is_selected = false;
        }
      });
      this.totalRpHarusDibayar = 0;
      this.keranjang = this.keranjang.filter((e) => e.id_menu != item.id_menu);
      this.jumlahPesanan = this.keranjang.length;
      var hitungTotal = 0;
      this.keranjang.forEach((e) => {
        var hitung1 = e.qty_beli * e.harga;
        hitungTotal += hitung1;
      });
      this.totalRpHarusDibayar = hitungTotal;
      this.pilihMenu = [];
      if (status == "modalGagal") {
        this.closeModal2();
      } else {
        console.log("berhasil hapus");
      }
    },
    openDetailPemesanan() {
      this.$bvModal.show("modalDetailPemesanan");
    },
    editMenuTerpilih(item, status) {
      console.log(item);
      this.totalRpHarusDibayar = 0;
      var hitungTotal = 0;
      this.keranjang.forEach((e) => {
        if (e.id_menu == item.id_menu) {
          e.qty_beli = item.qty_beli;
        }
        var hitung1 = e.qty_beli * e.harga;
        hitungTotal += hitung1;
      });
      this.totalRpHarusDibayar = hitungTotal;
      if (status == "modalGagal") {
        this.closeModal2();
      } else {
        console.log("modal keranjang berhasil di edit");
      }
    },
    validasiPesanan() {
      if (this.nama_pemesan == "" || this.nomor_meja == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Silahkan isi nama dan meja terlebih dahulu...!",
        });
      } else {
        console.log(this.keranjang);
        Swal.fire({
          title: "Pesanan anda sudah lengkap...?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Pesan Sekarang",
          denyButtonText: `Nanti Dulu`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.kirimSekarang();
          } else if (result.isDenied) {
            console.log("");
          }
        });
      }
    },
    async kirimSekarang() {
      var kirimPesananApi = await controller.kirimPesanan(
        this.keranjang,
        this.nama_pemesan,
        this.nomor_meja
      );
      if (kirimPesananApi.data.status == true) {
        Swal.fire(
          "Pesanan anda akan kami proses...\n Mohon di tunggu....",
          "",
          "success"
        );
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      } else {
        Swal.fire("Terjadi kesalahan!", "", "error");
        window.location.reload();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
