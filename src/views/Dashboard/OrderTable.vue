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
            <base-input placeholder="Cari order disini..." addon-left-icon="ni ni-zoom-split-in"></base-input>
          </div>
          <div class="col-md-4 pl-1">
            <router-link to="/order/tambah">
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
          <th>Nama Order</th>
          <th>Status</th>
          <th>Produk</th>
          <th>Tenggat Waktu</th>
          <th>Completion</th>
          <th></th>
        </template>
        <template slot-scope="{row}">

          <td scope="row">
            <span class="name mb-0 text-sm"><strong>{{row.title}}</strong></span>
          </td>

          <!-- status -->
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>

          <!-- produk spk -->
          <td>
            <div class="avatar-group">
              <a v-for="data in row.product" :key="data" href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip">
                <img alt="Image placeholder" :src="data">
              </a>
            </div>
          </td>

          <!-- tenggat waktu -->
          <td>
            <span class="name mb-0 text-sm">12-02-2020</span>
          </td>

          <!-- persentase selesai -->
          <td>
            <div class="d-flex align-items-center">
              <span class="completion mr-2">{{row.completion}}%</span>
              <div>
                <base-progress :type="row.statusType"
                               :show-percentage="false"
                               class="pt-0"
                               :value="row.completion"/>
              </div>
            </div>
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>
              <template>
                <a class="dropdown-item" href="#">Buka order</a>
                <a class="dropdown-item" href="#">Printout</a>
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>

  </div>
</template>
<script>
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
        tableData: [
          {
            img: 'img/theme/bootstrap.jpg',
            title: 'John Doe - Jakarta',
            budget: '$2500 USD',
            status: 'terjadwal',
            statusType: 'info',
            product: [
              "img/theme/team-1-800x800.jpg",
              "img/theme/team-1-800x800.jpg",
              "img/theme/team-1-800x800.jpg",
            ],
            completion: 60
          },
          {
            img: 'img/theme/angular.jpg',
            title: 'Jane Doe - Bandung',
            budget: '$1800 USD',
            status: 'terjadwal',
            statusType: 'info',
            product: [
              "img/theme/angular.jpg",
              "img/theme/team-1-800x800.jpg",
              "img/theme/team-1-800x800.jpg",
            ],
            completion: 100
          }
        ]
      }
    }
  }
</script>
<style>
</style>
