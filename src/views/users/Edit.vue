<template>
  <div class="users-edit">
    <h1>Edit User Information</h1>

    <div class="current">Hello, {{ user.first_name }} {{ user.last_name }}.</div>
    <br />
    <br />
    <form v-on:submit.prevent="submit(user)">
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      Edit first name:
      <input type="text" v-model="user.first_name" />
      <br />
      Edit last name:
      <input type="text" v-model="user.last_name" />
      <br />

      Change Email:
      <input type="text" v-model="user.email" />
      <br />
      Change Password:
      <input type="text" v-model="user.password" />
      <br />
      <br />

      <input type="submit" value="Submit" />
    </form>

    <button v-on:click="destroyUser(user)">Delete Account</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      this.user = response.data;
    });
  },
  methods: {
    submit: function(user) {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password
      };
      axios
        .patch("/api/users/me", params)
        .then(response => {
          this.$router.push("/users/me/profile");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function(user) {
      axios.delete("/api/users/me").then(response => {
        console.log("Account successfully destroyed.", response.data);
        this.$router.push("/signup");
      });
    }
  }
};
</script>
