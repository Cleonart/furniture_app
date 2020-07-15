<template>
	<div>
		<base-header type="gradient-success" class="pb-4 pb-1 pt-5 pt-md-8">
			<h1 class="text-white">Order Baru</h1>
		</base-header>
		<div class="container col-8">
			
		</div>
	</div>
</template>
<script>

  export default {
    name: 'user-profile',
    data() {
      return {
        model: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
        }
      }
    },
    components: {
       
    }
  };
</script>