<template>
  <div class="signup">

    <section class="module">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <div class="module-header text-center">
              <h1>Register</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2">
            <form id="contact-form" v-on:submit.prevent="submit()">
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <div class="row">
                <div class="col-sm-6 form-group">
                  <input type="text" v-model="first_name" placeholder="First Name" required="" class="form-control">
                  <p class="help-block text-danger"></p>
                </div>
                <div class="col-sm-6 form-group">
                  <input type="text" v-model="last_name" placeholder="Last Name" required="" class="form-control">
                  <p class="help-block text-danger"></p>
                </div>
                <div class="col-sm-12 form-group">
                  <input type="email" v-model="email" placeholder="E-mail" required="" class="form-control">
                  <p class="help-block text-danger"></p>
                </div>
                <div class="col-sm-12 form-group">
                  <input type="password" v-model="password" placeholder="Password" required="" class="form-control">
                  <p class="help-block text-danger"></p>
                </div>
                <div class="col-sm-12 form-group">
                  <input type="password" v-model="passwordConfirmation" placeholder="Password confirmation" required="" class="form-control">
                  <p class="help-block text-danger"></p>
                </div>
                <div class="col-sm-12 text-center">
                  <button type="submit" class="btn btn-brand">Submit</button>
                </div>
              </div>
            </form>
            <!-- Ajax response-->
            <div id="contact-response" class="ajax-response text-center"></div>
          </div>
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
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
