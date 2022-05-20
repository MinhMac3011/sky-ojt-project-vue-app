<template>
  <div class="container">
    <h3>All Users</h3>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
           
            <th>ID</th>
            <th>Name</th>
            <th>Greeting</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
          
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.greeting }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import DataService from "../services/DataService";

export default {
  name: "ListView",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    retrieve() {
      DataService.getAll()
        .then(response => {
          this.users = response.data;
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
};
</script>

<style>
.table {
    margin-left: auto;
    margin-right: auto;
}
</style>