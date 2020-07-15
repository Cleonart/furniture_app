<template>
  <div class="card shadow" 
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center"> 
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col-lg-5 text-right p-0 pr-3 row" style="height:43px">
          <div class="col-md-8 pr-1">
            <base-input placeholder="Cari produk disini..." addon-left-icon="ni ni-zoom-split-in"></base-input>
          </div>
          <div class="col-md-4 pl-1">
            <router-link to="/product/tambah">
              <base-button class="w-100" type="primary" icon="ni ni-fat-add">Baru</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">

      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">

        <template slot="columns">
          <th>Nama Produk</th>
          <th>Dimensi</th>
          <th>Warna Tersedia</th>
          <th>Jenis Produk</th>
          <th></th>
        </template>

        <template slot-scope="{row}">

          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.product_img">
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.product_name}}</span>
              </div>
            </div>
          </th>

          <td>
            <span class="name mb-0 text-sm">{{row.product_dimension_length}} cm x {{row.product_dimension_wide}} cm x {{row.product_dimension_height}} cm</span>
          </td>

          <td>
            <badge pill type="danger" style="font-size:11px">Belum tersedia</badge>
          </td>
          
          <td>
            <span class="name mb-0 text-sm">{{row.product_type}}</span>
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>
              <template>
                <a class="dropdown-item" href="#">Buka produk</a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>

    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total=10></base-pagination>
    </div>

  </div>
</template>
<script>

  const axios = require('axios');

  export default {
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      
      getProduct : function(){
        var app = this;
        let url = "http://127.0.0.1/furniture_api/api/v1/product/get.php";
        axios.get(url)
             .then(function(response){
                app.tableData = response.data; 
                console.log(response);
             })
             .catch(function(error){
                console.log(error);
             })
      }

    },
    created(){
      this.getProduct();
    }
  }
</script>
<style>
</style>
