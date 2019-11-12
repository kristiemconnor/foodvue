<template>
  <div class="signup">
    <div class="col-sm-8 col-sm-offset-2">
      <form v-on:submit.prevent="submit(user)">
        <h4>Create an account</h4>
        <br />
        <div class="row m-t-70">
          <div class="col-sm-8 col-sm-offset-2">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
              <form class="form-horizontal">
          <div class="form-group">
          <label>First name</label>
          <input type="text" class="form-control" v-model="first_name" />
          </div>
          <div class="form-group">
          <label>Last name</label>
          <input type="text" class="form-control" v-model="last_name" />
          </div>
          <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" />
          </div>
          <div class="form-group">
          <label>Password confirmation</label>
          <input type="password" class="form-control" v-model="passwordConfirmation" />
          </div>
          <input type="submit" class="btn btn-brand" value="Submit">
              </form>
          </div>
        </div>
      </form>
   </div>
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
          this.$router.push("/users/me/profile");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
