<template>
  <div class="users-ingredients">
    <!--     <div class="header">
      <h4>{{ user.first_name }} {{ user.last_name }}'s Pantry</h4>
      <br />
      <h4>Ingredients on hand: {{ user.ingredients.length }}</h4>
    </div> -->
    <br />

    <div v-for="ingredient in ingredients">{{ ingredient.name }} | {{ ingredient.expiration }}</div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      ingredients: this.user.ingredients,
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      console.log(response.data);
      this.user = response.data;
      this.ingredients = response.data.ingredients;
    });
  },

  methods: {}
};
</script>
