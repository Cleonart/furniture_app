<template>
	<div>
		<base-header	class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
						style="'min-height: 400px; background-image: url(img/order.jpg); background-size: cover; background-position: center -150px;'">
            <span class="mask bg-gradient-primary opacity-8"></span>
            <div class="container-fluid d-flex align-items-center" style="margin-top:-30px">
              <div class="row mb-4">
                <div class="col-lg-12 col-md-10">
                  <h1 class="display-2 text-white">Data Order</h1>
                  <p class="text-white mt-0 mb-3">Kelola setiap order dan spk di laman ini</p>
                  <router-link to="/order"><base-button type="info" class="mr-3 mb-3">Daftar Order</base-button></router-link>
                </div>
              </div>
            </div>
        </base-header>

		<div class="container-fluid mt--8">
			<form @submit.prevent class="container row">
				<card class="card col-md-12 pt-1 pb-2 pl-4 pr-4">
					<div slot="header" class="bg-white border-0">
						<div class="row align-items-center">
							<div class="col-8">
								<h3 class="mb-0">Detail Data Order</h3>
							</div>
						</div>
                    </div>

					<div class="row">

						<!-- id order -->
						<div class="col-md-12 mb--2">
							<base-input disabled 
										:value="'Kode Order : ' + order.order_id"
										required></base-input>
						</div>

						<!-- nama order -->
						<div class="col-md-12 mb--2">
							<base-input placeholder="Nama Order" 
										v-model="order.order_name" 
										required
										label="Nama Order"
										:valid="forms_class.valid_name"></base-input>
						</div>

						<!-- lokasi order  -->
						<div class="col-md-12 mb--2">
							<base-input placeholder="Lokasi Order" 
										v-model="order.order_location" 
										required
										label="Lokasi Order"
										:valid="forms_class.valid_location"></base-input>
						</div>

						<base-input class="col-md-12 mb-3"
									v-model="order.valid_note" 
									label="Catatan Order"
									alternative="">
									<textarea   rows="4" 
												class="form-control" 
												placeholder="Catatan order..."></textarea>
						</base-input>
					</div>
				</card>

				<!-- form tambah spk -->
				<div class="card shadow col-md-12 mt-3 pt-5 pb-4 pl-5 pr-5"> 
					<h3 class="col mb-4">Tambah SPK Baru</h3>
					<div class="row">
						<div class="col">
							<div class="col-12">
								<base-input placeholder="Nama SPK" 
											v-model="spk_forms.spk_name"
											required
											label="Nama SPK"
											:valid="forms_class.valid_location"></base-input>
							</div>

							<div class="col-12">
								<select v-model="spk_forms.spk_product_id">
									<option default disabled selected>Pilih Produk</option>
									<option v-for="product in products"
											:key="product.product_id">{{product.product_id}} - {{product.product_name}}</option>
								</select>
							</div>

							<div class="col-12 mt-3">
								<base-input	label="Catatan Order"
											alternative="">
											<textarea 	rows="2" 
														class="form-control" 
														placeholder="Catatan SPK..."
														v-model="spk_forms.spk_note"
														style="height:70px"></textarea>
								</base-input>
							</div>

							<div class="col-12">
								<base-button @click="addSPK()" style="width:150px" class="mb-4" type="primary">Tambah SPK</base-button>
							</div>
						</div>

						<div class="col">

							<div class="col-12">
								<h5 class="mb-2">Tenggat Waktu Tim 1</h5>
								<base-input addon-left-icon="ni ni-calendar-grid-58">
									<flat-picker 	slot-scope="{focus, blur}"
													@on-open="focus"
													@on-close="blur"
													:config="{allowInput: true}"
													class="form-control datepicker"
													v-model="spk_forms.spk_deadline_team_1">
									</flat-picker>
								</base-input>
							</div>

							<div class="col">
								<h5 class="mb-2">Tenggat Waktu Tim 2</h5>
								<base-input addon-left-icon="ni ni-calendar-grid-58">
									<flat-picker 	slot-scope="{focus, blur}"
													@on-open="focus"
													@on-close="blur"
													:config="{allowInput: true}"
													class="form-control datepicker"
													v-model="spk_forms.spk_deadline_team_2">
									</flat-picker>
								</base-input>
							</div>

							<div class="col">
								<h5 class="mb-2">Tenggat Waktu Tim 3</h5>
								<base-input addon-left-icon="ni ni-calendar-grid-58">
									<flat-picker 	slot-scope="{focus, blur}"
													@on-open="focus"
													@on-close="blur"
													:config="{allowInput: true}"
													class="form-control datepicker"
													v-model="spk_forms.spk_deadline_team_3">
									</flat-picker>
								</base-input>
							</div>
						</div>
					</div>
				</div>

				<!-- tabel detail spk -->
				<div class="card shadow col-md-12 mt-3 pb-4">

					<div class="card-header border-0 bg-transparent">
						<div class="row align-items-center"> 
							<div class="col">
								<h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
									Detail SPK
								</h3>
							</div>
						</div>
					</div>

					<div class="table-responsive">
						<base-table class="table align-items-center table-flush"
									thead-classes="thead-light"
									tbody-classes="list"
									:data="spk">

							<template slot="columns">
								<th>Nama SPK</th>
								<th>Nama Produk</th>
								<th>Tenggat Tim 1</th>
								<th>Tenggat Tim 2</th>
								<th>Tenggat Tim 3</th>
								<th></th>
							</template>
							<template slot-scope="{row}">
								<td>
									<span class="name mb-0 text-sm">{{row.spk_id}} | {{row.spk_name}}</span>
								</td>

								<th scope="row">
									<div class="media align-items-center">
										<a :href="'#/product/detail/' + row.product_id"  class="avatar rounded-circle mr-3">
											<div :style="'width:100%;height:100%;border-radius:100%;background:url(http://127.0.0.1' + row.product_img + ';background-size:cover;background-position:center'">
											</div>
										</a>
										<div class="media-body">
											<span class="name mb-0 text-sm">{{row.product_name}}</span>
										</div>
									</div>
								</th>
								
								<td>
									<span class="name mb-0 text-sm">{{row.spk_deadline_team_1}}</span>
								</td>

								<td>
									<span class="name mb-0 text-sm">{{row.spk_deadline_team_2}}</span>
								</td>

								<td>
									<span class="name mb-0 text-sm">{{row.spk_deadline_team_3}}</span>
								</td>

								<td class="text-right">
									<base-dropdown 	class="dropdown"
													position="right">
										<a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<i class="fas fa-ellipsis-v"></i>
										</a>
										<template>
											<a class="dropdown-item" :href="'#/product/detail/' + row.product_id" >Buka produk</a>
											<span v-on:click="deleteSPK(row.spk_id)" class="dropdown-item">Hapus SPK</span>
										</template>
									</base-dropdown>
								</td>
							</template>
						</base-table>
					</div>
					<h4 v-if="spk.length == 0" class="mt-4 text-gray" style="text-align:center;width:100%">Tidak ada SPK</h4>
				</div>
				
				<div class="card shadow col-md-12 mt-3 pt-3 pb-3">
					<div class="col-md-12">
						<base-button v-on:click="formsCheck()" type="primary">Selesai</base-button>
						</div>
				</div>

			</form>
        </div>
	</div>
</template>

<script>

	import flatPicker from "vue-flatpickr-component";
	import "flatpickr/dist/flatpickr.css";

	const axios = require('axios');

	export default {
		data(){
			return{
				order:{
					order_id:"",
					order_name:"",
					order_location:"",
					order_note: ""
				},

				spk_forms : {
					spk_id: "",
					spk_name : "",
					spk_product_id : "Pilih Produk",
					spk_note : "",
					spk_deadline_team_1 : "",
					spk_deadline_team_2 : "",
					spk_deadline_team_3 : ""
				},
				spk: [],
				products: [],
				forms_class: {
					valid_name : 0,
					valid_location : 0,
					valid_note : 0
				},

				buttonText : "Tambahkan"
			}
		},
		methods: {

			getProduct : function(id){
				var app = this;
				let url = "http://127.0.0.1/furniture_api/api/v1/order/get.php?order_id=" + id;
				axios.get(url)
					.then(function(response){
						app.products = response.data.product;
						console.log(response.data);
					})
					.catch(function(error){
						console.log(error);
					})
			},
			
			addSPK: function(){
				let spk_id = this.generateId();
				let spk_name = this.spk_forms.spk_name;
				let spk_deadline_team_1 = this.spk_forms.spk_deadline_team_1;
				let spk_deadline_team_2 = this.spk_forms.spk_deadline_team_2;
				let spk_deadline_team_3 = this.spk_forms.spk_deadline_team_3;

				if(	this.spk_forms.spk_name != "" &&
					this.spk_forms.spk_product_id != "Pilih Produk" &&
					this.spk_forms.spk_deadline_team_1 != "" &&
					this.spk_forms.spk_deadline_team_2 != "" &&
					this.spk_forms.spk_deadline_team_3 != ""){
					
					let i = this.searchForProduct(this.spk_forms.spk_product_id);
					let product_id   = this.products[i].product_id;
					let product_name = this.products[i].product_name;
					let product_img  = this.products[i].product_img;
					this.spk.push({spk_id, spk_name,product_id,product_name,product_img, spk_deadline_team_1, spk_deadline_team_2, spk_deadline_team_3});
					this.$swal("Penambahan SPK Berhasil", "Penambahan data berhasil", "success");
					this.resetSpkForms();
				}
				else{
					this.$swal('Penambahan SPK Gagal', "Anda harus melengkapi semua kotak yang tersedia", "error");
				}
				
			},
			
			deleteSPK: function(spk_id){
				for(let i=0;i < this.spk.length;i++){
					if(spk_id == this.spk[i].spk_id){
						this.spk.splice(i,1);
					}
				}
			},

			searchForProduct: function(data){
				let split_data = data.split("-");
				console.log(split_data);
				let i = 0;
				for(i; i < this.products.length; i++){
					console.log(this.products[i].product_id);
					if(split_data[0] == this.products[i].product_id + " "){
						break;
					}
				}
				return i;
			},

			resetSpkForms: function(){
				this.spk_forms.spk_id= "";
				this.spk_forms.spk_name = "";
				this.spk_forms.spk_product_id = "Pilih Produk";
				this.spk_forms.spk_note = "";
				this.spk_forms.spk_deadline_team_1 = "";
				this.spk_forms.spk_deadline_team_2 = "";
				this.spk_forms.spk_deadline_team_3 = "";
			},

			uploadSpkToServer: function(){

			},

			generateId: function(){
				let min    = 1000000; 
				let max    = 9999999;  
				let random = Math.floor(Math.random() * (+max + 1 - +min)) + +min; 
				return random;
			}
		},

		created(){
			
			if(this.$route.params.order_id == undefined){
				this.order.order_id = this.generateId();
			}

			this.getProduct(this.$route.params.order_id);

		},
		components: {flatPicker}
	};
</script>

<style>

	select{
		display: block;
		width: 100%;
		height: calc(1.5em + 1.25rem + 2px);
		padding: 0.625rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1.5;
		color: #8898aa;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #cad1d7;
		border-radius: 0.375rem;
		-webkit-box-shadow: none;
		box-shadow: none;
		-webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

</style>