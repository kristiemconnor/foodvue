<template>
  <div class="users-profile">
    <section class="module-hero color-white parallax bg-black-alfa-30 bg-contact">
      <div class="hero-caption">
        <div class="hero-text">
          <div class="container">
            <div class="row">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="module divider" style="padding-top:20px">
      <div class="container">
       <h4>{{ user.first_name }} {{ user.last_name }}</h4>
       <h4>{{ user.email }}</h4>
       <h4><router-link to="/users/me/edit">Edit User Info</router-link> | <router-link to="/ingredients/me">View Pantry</router-link></h4 >
     </div>
   </section>
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
