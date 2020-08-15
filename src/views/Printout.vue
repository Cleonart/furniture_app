<template>
	<div>
		<p>Printout</p>
	</div>
</template>

<script>
	const { jsPDF } = require("jspdf");

	export default {
		data(){
			return{
				pdf : '',

				// page control
				page_section_counter : 0,
			}
		},
		methods: {

			newSection:function(){
				
				let order_margin_y = this.page_section_counter;
				order_margin_y += 15;

				this.pdf.setFontSize(13);
				this.pdf.text("SPK Nagarey", 10, order_margin_y);
				order_margin_y += 7;

				// image 
				var image = new Image();
				image.src = "img/order.jpg";
				this.pdf.addImage(image, 'jpg', 10, order_margin_y, 50, 50)
				order_margin_y += 5;

				// product data
				this.pdf.setFontSize(13);
				this.pdf.text("Porto Side Table", 65, order_margin_y);
				order_margin_y += 7;

				// color data and quantity
				this.pdf.setFontSize(12);
				this.pdf.text("Warna : NATURAL | Jumlah : 2 PCS" , 65, order_margin_y);
				
				// team 1 deadline and work process
				
				// team 2 deadline and work process
				
				// team 3 deadline and work process
			},

			orderHeader: function(order_data){
				
				let order_margin_y = 15;

				// order id
				this.pdf.setFontSize(11);
				this.pdf.text("ID ORDER " + order_data.order_id, 10, order_margin_y);
				order_margin_y += 10;

				// order name
				this.pdf.setFontSize(11);
				this.pdf.text("Nama Order   : " + order_data.order_name, 10, order_margin_y);
				order_margin_y += 7;

				// order location 
				this.pdf.setFontSize(11);
				this.pdf.text("Lokasi Order  : " + order_data.order_name, 10, order_margin_y);

				this.page_section_counter += order_margin_y;
			}
		},

		created(){
			this.pdf = new jsPDF();
			let order_data = {
				order_id : "10",
				order_name : "Mitha",
				order_location : "Manado"
			}
			this.orderHeader(order_data);
			this.newSection();
			this.pdf.save("tes2.pdf");
		}
	};
</script>