
export let baseURL = "http://127.0.0.1";

// generate random number id
// return INT - Random Number between 1000000 to 9999999
export function generateId(){
	let min    = 1000000; 
	let max    = 9999999;
	let random = Math.floor(Math.random() * (+max + 1 - +min)) + +min; 
	return random;
}

// search for product name inside an array
// FORAMT TO SEARCH : PRODUCT_ID - PRODUCT_NAME
// return INT : i - product index
export function searchForProduct(data, products){
	let split_data = data.split("-");
	let i = 0;

	for(i; i < products.length; i++){
		console.log(products[i].product_id);
		if(split_data[0] == products[i].product_id + " "){
			break;
		}
	}
	
	return i;
}

export function getTodayDate(prefix="none") {
	var calender = new Date();
	var date = calender.getDate();
	var month = calender.getMonth();
	var year = calender.getFullYear();

	if(prefix == "none"){
		return date + "." + month + "." + year;
	}

	return date + prefix + month + prefix + year;
}

export function generatePdfFilename(type, id){
	return type + "_" + id + "_" + getTodayDate() + ".pdf"; 
}

