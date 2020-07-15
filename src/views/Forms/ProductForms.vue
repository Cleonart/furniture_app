<template>
	<div>
		<base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                 style="min-height: 400px; background-image: url(img/order.jpg); background-size: cover; background-position: center -100px;">
            <span class="mask bg-gradient-success opacity-8"></span>
            <div class="container-fluid d-flex align-items-center" style="margin-top:-30px">
              <div class="row mb-4">
                <div class="col-lg-12 col-md-10">
                  <h1 class="display-2 text-white">Produk</h1>
                  <p class="text-white mt-0 mb-3">Kelola setiap order dan SPK dari laman ini</p>
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
							<base-input disabled v-model="product.product_id" required></base-input>
						</div>

						<!-- nama produk -->
						<div class="col-md-12 mb--2">
							<base-input placeholder="Nama Produk" v-model="product.product_name" required></base-input>
						</div>

						<!-- jenis produk -->
						<div class="col-md-12 mb-3">
							<select v-model="product.product_type">
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
												v-model="product.product_dimension_length"></base-input>
								</div>

								<div class="col-md-4">
									<base-input type="number" 
												placeholder="Lebar(cm)" 
												v-model="product.product_dimension_wide"></base-input>
								</div>

								<div class="col-md-4">
									<base-input type="number" 
												placeholder="Tinggi(cm)" 
												v-model="product.product_dimension_height"></base-input>
								</div>
							</div>

						</div>

						<div class="col-md-12">
							<base-button v-on:click="checkFile()" type="primary">Tambahkan</base-button>
						</div>

					</div>

				</div>

				<div class="col-md-6">
					<div class="card pl-4 pr-4 pt-4">
						
						<!-- nama produk -->
						<div class="col-md-12 mb-3">
							<h4>Info Gambar Produk</h4>
						</div>

						<file-pond
								:files="myFiles"
								server="http://127.0.0.1/pond/"
								name="test"
								ref="pond" 
								instantUpload="true"
								label-idle="Masukan file disini.."/>
					</div>
				</div>

			</form>
        </div>
	</div>
</template>

<script>
	// Import Vue FilePond
	import vueFilePond from 'vue-filepond';

	// Import FilePond styles
	import 'filepond/dist/filepond.min.css';

	// IMPORT FILEPOND PLUGINS
	//import FilePondPluginFileRename from 'filepond-plugin-file-rename/dist/filepond-plugin-file-rename.esm.js';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

	const FilePond = vueFilePond(FilePondPluginImagePreview);

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

			checkFile: function(){
				console.log(this.$refs.pond);
				console.log(this.$refs.pond.getFile());
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
			this.product.product_id = this.generateId();
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