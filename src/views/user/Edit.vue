<template>
  <div class="user-edit">
    <h1>Edit User Information</h1>

    <div class="current">Hello, {{ user.first_name }}.</div>
    <br />
    <br />
    <form v-on:submit.prevent="submit()">
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      Edit first name:
      <input type="text" />
      <br />
      Edit last name:
      <input type="text" />
      <br />

      Change Email:
      <input type="text" />
      <br />
      Change Password:
      <input type="text" />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>

    <button v-on:click="destroyUser()">Delete Account</button>
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
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password
      };
      axios
        .patch("/api/users/" + this.user.id, params)
        .then(response => {
          this.$router.push("/users/" + this.user.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      axios.delete("/api/users/" + this.user.id).then(response => {
        console.log("Account successfully destroyed.", response.data);
        this.$router.push("/signup");
      });
    }
  }
};
</script>
