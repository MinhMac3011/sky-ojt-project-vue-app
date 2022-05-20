<template>
  <div class="home">
  <h1>{{data}}</h1>
  </div>
</template>

<script>
import DataService from "../services/DataService";
export default {

  name: 'HomeView',
  components: {
    
  },
  data() {
    return {
      data: ""
    };
  },
  methods: {
    retrieve() {
      DataService.getInfo()
        .then(response => {
          this.data = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieve();
  }
}
</script>
