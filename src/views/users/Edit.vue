<template>
  <div id="users-edit">
    <!-- HERO-->
    <section class="module-hero color-white parallax bg-black-alfa-30 bg-module-3">
      <div class="hero-caption">
        <div class="hero-text">
          <div class="container">
            <div class="row">
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- END HERO-->
    <!-- CONTACT-->
    <section class="module" style="padding-top:15px">
      <div class="container">
        <div class="col-sm-6 col-sm-offset-3">
          <div class="module-header text-center">
            <h1>Edit User</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2">
            <form id="contact-form" method="post" novalidate></form>
            <div class="row">
              <div class="col-sm-6 form-group">  <form v-on:submit.prevent="submit(user)"></form>
                <input type="text" v-model="user.first_name" placeholder="First name" required="" class="form-control">
                
                <p class="help-block text-danger"></p>
              </div>
              <div class="col-sm-6 form-group">
                <input type="text" v-model="user.last_name" placeholder="Last name" required="" class="form-control">
                <p class="help-block text-danger"></p>
              </div>
              <div class="col-sm-6 form-group">
                <input type="email" v-model="user.email" placeholder="E-mail" required="" class="form-control">
                <p class="help-block text-danger"></p>
              </div>
              <div class="col-sm-6 form-grou"> <input type="text" v-model="user.password" placeholder="Password" class="form-control"><p class="help-block text-danger"></p>
              </div>
              <div class="col-sm-12 text-center">
                
                <button v-on:click="submit(user)" class="btn btn-brand">Submit</button> <div class="row" style="padding-bottom:15px"></div> <button v-on:click="destroyUser(user)" class="btn btn-warning">Delete Account</button>
              </div>
            </div>
          </div>                        
          <div id="contact-response" class="ajax-response text-center"></div>
        </div>
      </div>
    </section>
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
