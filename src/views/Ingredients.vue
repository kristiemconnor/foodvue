<template>
  <div class="users-ingredients">
    <div class="header">
      <h4>{{ current_user.first_name }} {{ current_user.last_name }}'s Pantry</h4>
      <br />
      <h4>Ingredients on hand: {{ ingredients.length }}</h4>
    </div>
    <br />
    <div v-for="ingredient in ingredients">{{ ingredient.name }} | {{ ingredient.expiration }}</div>
  </div>
</template>

<style>
div.header {
  text-align: left;
}
</style>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      ingredients: this.user.ingredients,
      // firstName: this.user.first_name,
      // lastName: this.user.last_name,
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      this.ingredients = response.data;
      console.log(this.ingredients);
      console.log(this.user);
    });
  },
  methods: {}
};
</script>
