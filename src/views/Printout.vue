<template>
	<div>
		<p>Printout</p>
		<p>TEs</p>
	</div>
</template>

<script>

	import jsPDF from 'jspdf';
	import autoTable from 'jspdf-autotable';
	import {generatePdfFilename} from '../functions/universal.js';
	import {model_pdf_order, model_pdf_spk} from '../functions/pdf_data_model.js';

	export default {
		data(){
			return{
				pdf : '',

				// data
				order_data : {
					order_id : "10",
					order_name : "Mitha",
					order_location : "Manado"
				},

				// page control
				page_section_counter : 0,
			}
		},
		methods: {

			orderData: function() {
				this.pdf.setFontSize(18);
				this.pdf.text('Data Order', 14, 22);
				return model_pdf_order(this.pdf);
			},

			spkModelDataAutoTable : function () {
				return model_pdf_spk(this.pdf);
			}

		},

		created(){
			
			this.pdf = new jsPDF();
			let pdfName = "";

			if(this.$route.params.printout_type == "order"){
				alert("GENERATING ORDER");
				autoTable(this.pdf, this.orderData().order);
				autoTable(this.pdf, this.orderData().order_notes);
				autoTable(this.pdf, this.spkModelDataAutoTable());
				pdfName = generatePdfFilename("order", "123456");
			}

			else if(this.$route.params.printout_type == "spk"){
				alert("GENERATING SPK");
			}

			this.pdf.save(pdfName);
		}
	};
</script>