<template>
    <div class="users-profile">
        <br />
        <h3>{{ user.first_name }} {{ user.last_name }}</h3>
        <h3>{{ user.email }}</h3>
        <br />

        <router-link to="/users/me/edit">Edit User Info</router-link>
        |
        <router-link to="/ingredients/me">View Pantry</router-link>
        <br />
        <br />
    </div>
</template>
<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      console.log(response.data);
      this.user = response.data;
      console.log(this.user.ingredients);
    });
  }
};
</script>
