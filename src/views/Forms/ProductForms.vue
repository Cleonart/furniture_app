<template>
	<div>
		<base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                 style="min-height: 400px; background-image: url(img/order.jpg); background-size: cover; background-position: center -100px;">
            <span class="mask bg-gradient-primary opacity-8"></span>
            <div class="container-fluid d-flex align-items-center" style="margin-top:-30px">
              <div class="row mb-4">
                <div class="col-lg-12 col-md-10">
                  <h1 class="display-2 text-white">Data Produk</h1>
                  <p class="text-white mt-0 mb-3">Kelola setiap produk dari laman ini</p>
                  <router-link to="/product"><base-button type="info" class="mr-3 mb-3">Daftar Produk</base-button>
                  </router-link>
                </div>
              </div>
            </div>
        </base-header>
		<div class="container-fluid mt--8">
			<form @submit.prevent class="container row">

				<div class="card col-md-6 pt-4 pb-4 pl-4 pr-4">

					<div class="row">
						
						<!-- nama produk -->
						<div class="col-md-12 mb-3">
							<h4>Info Dasar Produk</h4>
						</div>

						<!-- id produk -->
						<div class="col-md-12 mb--2">
							<base-input disabled 
										:value="'Kode Produk : ' + product.product_id"
										required></base-input>
						</div>

						<!-- nama produk -->
						<div class="col-md-12 mb--2">
							<base-input placeholder="Nama Produk" 
										v-model="product.product_name" 
										required
										:valid="forms_class.valid_name"></base-input>
						</div>

						<!-- jenis produk -->
						<div class="col-md-12 mb-3">
							<select v-model="product.product_type"
									:valid="forms_class.valid_type">
								<option selected=true disabled>Tipe Produk</option>
								<option>Meja</option>
								<option>Lemari</option>
							</select>
						</div>

						<!-- dimensi -->
						<div class="col-md-12">

							<div class="mb-2">
								<h5>Dimensi (cm)</h5>
							</div>

							<div class="row">
								<div class="col-md-4">
									<base-input type="number" 
												placeholder="Panjang(cm)" 
												:valid="forms_class.valid_length"
												v-model="product.product_dimension_length"></base-input>
								</div>

								<div class="col-md-4">
									<base-input type="number" 
												placeholder="Lebar(cm)" 
												:valid="forms_class.valid_wide"
												v-model="product.product_dimension_wide"></base-input>
								</div>

								<div class="col-md-4">
									<base-input type="number" 
												placeholder="Tinggi(cm)" 
												:valid="forms_class.valid_height"
												v-model="product.product_dimension_height"></base-input>
								</div>
							</div>

						</div>

						<div class="col-md-12">
							<base-button v-on:click="formsCheck()" type="primary">{{buttonText}}</base-button>
						</div>

					</div>

				</div>

				<div class="col-md-6">
					<div class="card pl-4 pr-4 pt-4">
						
						<!-- nama produk -->
						<div class="col-md-12 mb-3">
							<h4>Info Gambar Produk</h4>
						</div>

						
					</div>
				</div>

			</form>
			<file-pond
								:files="myFiles"
								server="http://127.0.0.1/pond/"
								name="test"
								ref="pond" 
								instantUpload="true"
								label-idle="Masukan file disini.."/>
        </div>
	</div>
</template>

<script>

	const axios = require('axios');

	// Import Vue FilePond
	import vueFilePond from 'vue-filepond';

	// Import FilePond styles
	import 'filepond/dist/filepond.min.css';

	// IMPORT FILEPOND PLUGINS
	//import FilePondPluginFileRename from 'filepond-plugin-file-rename/dist/filepond-plugin-file-rename.esm.js';
	//import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

	const FilePond = vueFilePond();

	export default {
		data(){
			return{
				product:{
					product_id:"",
					product_name:"",
					product_type:"Tipe Produk",
					product_img:"",
					product_dimension_length:'',
					product_dimension_wide:'',
					product_dimension_height:''
				},

				forms_class: {
					valid_name : 0,
					valid_type : 0,
					valid_length : 0,
					valid_wide : 0,
					valid_height: 0
				},
				buttonText : "Tambahkan",
				myFiles : []
			}
		},
		methods: {

			resetForms: function(){
				this.product.product_id = "";
				this.product.product_name = "";
				this.product.product_type = "Tipe Produk";
				this.product.product_img = "";
				this.product.product_dimension_length = "";
				this.product.product_dimension_wide = "";
				this.product.product_dimension_height = "";
			},

			getProduct : function(id){
				var app = this;
				let url = "http://127.0.0.1/furniture_api/api/v1/product/get.php?product_id=" + id;
				axios.get(url)
					.then(function(response){
						app.product = response.data[0];
						console.log(app.product);
					})
					.catch(function(error){
						console.log(error);
					})
				},

			checkFile: function(){
				console.log(this.$refs.pond);
				console.log(this.$refs.pond.getFile());
			},

			formsCheck: function(){

				// melakukan cek nama dari produk
				this.forms_class.valid_name = this.product.product_name == "" ? false : true;

				// melakukan cek tipe dari produk
				this.forms_class.valid_type = this.product.product_type == "Tipe Produk" ? false : true;

				// melakukan cek dimensi panjang dari produk
				this.forms_class.valid_length = this.product.product_dimension_length == "" ? false : true;

				// melakukan cek dimensi lebar dari produk
				this.forms_class.valid_wide = this.product.product_dimension_wide == "" ? false : true;

				// melakukan cek dimensi tinggi dari produk
				this.forms_class.valid_height = this.product.product_dimension_height == "" ? false : true;

				// melakukan cek jika semua form sudah terisi
				if(	this.forms_class.valid_name && 
					this.forms_class.valid_type &&
					this.forms_class.valid_length &&
					this.forms_class.valid_wide &&
					this.forms_class.valid_height){
					alert("done");
					return true;
				}

				// jika form tidak terisi
				else{
					alert("not done");
					return false
				}
				
			},

			addOrUpdateData: function(){

			},
			
			generateId: function(){
				let min    = 1000000; 
				let max    = 9999999;  
				let random = Math.floor(Math.random() * (+max + 1 - +min)) + +min; 
				return random;
			}
		},
		components: {
			FilePond
		},

		created(){

			if(this.$route.params.product_id == undefined){
				this.product.product_id = this.generateId();
			}

			else{
				this.getProduct(this.$route.params.product_id);
				this.buttonText = "Perbarui";
			}
		}
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