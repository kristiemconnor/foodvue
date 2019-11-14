<template>
  <div class="signup">
    <section class="module-hero color-white parallax bg-black-alfa bg-mod-za" style="padding-bottom:5px">
      <div class="hero-caption">
        <div class="hero-text">
          <div class="container">
            <div class="row">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="module" style="padding:10px">
      <div class="container">
      <form id="contact-form" v-on:submit.prevent="submit()">
        <div class="text-center">
          <h2>Create account</h2>  
          <div class="col-sm-8 col-sm-offset-2" style="padding:5px">
            <ul class="text-danger" v-for="error in errors">{{ error }}
            </ul>
            <div class="row"></div>
            <div class="col-sm-6 form-group">
              <input type="text" v-model="first_name" placeholder="First name" required="" class="form-control">
              <p class="help-block text-danger"></p>
            </div>
            <div class="col-sm-6 form-group">
              <input type="text" v-model="last_name" placeholder="Last name" required="" class="form-control">
              <p class="help-block text-danger text-center"></p>
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
            <div class="col-sm-12 text-center" style="padding-bottom:10px">
              <button type="submit" class="btn btn-brand">Submit</button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </form>

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
