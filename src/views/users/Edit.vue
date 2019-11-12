<template> <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Edit</title>
        <section data-background="assets/images/module-9.jpg" class="module-hero color-white parallax bg-black-alfa-30"></section>
            <div class="hero-caption">
                <div class="hero-text">
                    <div class="container">
                        <div class="row">
                        </div>
                    </div>
                </div>
            </div>
          <section class="module">
            <div class="users-edit">
              <div class="col-sm-6 col-sm-offset-3">
                  <div class="module-header text-center">
          <h1>Edit User Information</h1> <p class="divider-line"></p>
          </div></div></div>

          <form v-on:submit.prevent="submit(user)">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul> 
            <div class="col-sm-6 form-group">
            Edit first name:
            <input type="text" v-model="user.first_name" class="form-control">
            <br />
            Edit last name:
            <input type="text" v-model="user.last_name" class="form-control">
            <br />

            Change Email:
            <input type="text" v-model="user.email" class="form-control">
            <br />
            Change Password:
            <input type="text" v-model="user.password" class="form-control">
            <br />
            <br />

            <input type="submit" value="Submit" class="btn btn-brand">
          </form></div>

          <button v-on:click="destroyUser(user)">Delete Account</button>
         </div></div>
        </section></head>
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
