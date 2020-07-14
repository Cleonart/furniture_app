<template>
	<div>
		<base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
		</base-header>
		<div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <OrderTable title="Daftar Order Furniture"></OrderTable>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

  // Tables
  import OrderTable from './Dashboard/OrderTable.vue';

  export default {
    components: {
      OrderTable,
    }
  };
</script>