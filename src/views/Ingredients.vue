<template>
  <div class="users-ingredients">
    <div class="header">
      <h4>{{ user.first_name }} {{ user.last_name }}'s Pantry</h4>
      <br />
      <h4>Ingredients on hand: {{ user.ingredients.length }}</h4>
    </div>
    <div v-for="ingredient in ingredients">{{ ingredient.name }} | {{ ingredient.expiration }}</div><br>
  <div class="new-ingredient">
    <h4>Add an ingredient</h4>
    <br>
    Name: <input type="text" v-model="newIngredientName"><br>
    Expiration: <input type="text" v-model="newIngredientExpiration"><br>
    <button v-on:click="addIngredient">Add</button>

  </div>
  <br>
  <div class="edit-ingredient">
    <h4>Edit an Ingredient</h4>
    <br>
    New Name: <input type="text" v-model="ingredient.name">
    <br>
    New Expiration: <input type="text" v-model="ingredient.expiration">
    <button v-on:click="updateIngredient(ingredient)">Update</button><button v-on:click="destroyIngredient(ingredient)">Delete</button>
  </div>

  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      ingredients: [],
      errors: [],
      newIngredientName: "",
      newIngredientExpiration: ""
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      console.log(response.data);
      this.user = response.data;
      this.ingredients = response.data.ingredients;
      console.log(this.ingredients);
    });
  },

  methods: {
    addIngredient: function() {
      var params = {
        name: this.newIngredientName,
        expiration: this.newIngredientExpiration
      };
      axios.post("/api/ingredients", params).then(response => {
        this.ingredients.push(response.data);
        this.newIngredientName = "";
        this.newIngredientExpiration = "";
      });
    },
    updateIngredient: function(ingredient) {
      var params = {
        name: this.ingredient.name,
        expiration: this.ingredient.expiration
      };
      axios.patch("api/ingredients/", ingredient.id, params).then(response => {
        this.ingredient = {};
      });
    },
    destroyIngredient: function(ingredient) {
      axios.delete("/api/ingredients/" + ingredient.id).then(response => {
        this.$router.push("/ingredients/");
      });
    }
  }
};
</script>
