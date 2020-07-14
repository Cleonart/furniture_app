<template>
	<div>
		<base-header type="gradient-success" class="pb-4 pb-1 pt-5 pt-md-8">
			<h1 class="text-white">Order Baru</h1>
		</base-header>
	</div>
</template>
<script>

// Import Vue FilePond
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

const FilePond = vueFilePond();

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
        FilePond
    }
  };
</script>