<template>
  <div class="login">
    <section class="module-hero color-white parallax bg-black-alfa-30 bg-contact" style="padding-top:5px">
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
    <section class="module" style="padding-top:10px">
      <div class="container">
        <form v-on:submit.prevent="submit()">
          <h1>Login</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group" style="padding-top:1px">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <input type="submit" class="btn btn-brand" value="Submit" />
        </form>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/users/me/profile");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
