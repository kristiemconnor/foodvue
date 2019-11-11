<template>
  <div class="users-ingredients">
      <h4>{{ user.first_name }} {{ user.last_name }}'s Pantry</h4>
        <h4>Ingredients on hand: {{ user.ingredients.length }}</h4>
      <br>
        <h4>Add an ingredient</h4>
        Name: <input type="text" v-model="newIngredientName"><br>
        Expiration: <input type="date" v-model="newIngredientExpiration"><br>
        <button v-on:click="addIngredient">Add</button>
        <br>
      <div class="sort">
        <button v-on:click="setSortAttribute('name')"> Sort Alphabetically</button>
        <button v-on:click="setSortAttribute('expiration')"> Sort by Expiration
          <span v-if="sortAttribute === 'name' && sortAscending === 1"></span></button>
      </div>
    <button v-on:click="findRecipes()">Find Recipes</button>
    <li v-for="ingredient in orderBy(ingredients, 'expiration')">
      <input type="checkbox" :id="ingredient.id" :value="ingredient.name" v-model="checkedIngredients">
      <label :for="ingredient.id">{{ ingredient.name }}</label>
       | Expires {{ relativeExpiration(ingredient.expiration) }} 
        <h4>Edit Ingredient</h4>
          <h5>Name: <input type="text" v-model="ingredient.name">
          Expiration: <input type="date" v-model="ingredient.expiration">
          <button v-on:click="updateIngredient(ingredient)">Edit</button>
          <button v-on:click="destroyIngredient(ingredient)">Delete</button></h5>
            <br>
      </li>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      user: {},
      ingredients: [],
      errors: [],
      newIngredientName: "",
      newIngredientExpiration: "",
      currentIngredient: "",
      checkedIngredients: [],
      sortAttribute: ""
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
      })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
    updateIngredient: function(ingredient) {
      console.log("edit");
      var params = {
        name: ingredient.name,
        expiration: ingredient.expiration
      };
      axios.patch("/api/ingredients/" + ingredient.id, params).then(response => {
        this.ingredient = {};
      })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        })
    },
    destroyIngredient: function(ingredient) {
      axios.delete("/api/ingredients/" + ingredient.id).then(response => {
        var index = this.ingredients.indexOf(ingredient);
        this.ingredients.splice(index, 1);
      })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);

        });
    },
    findRecipes: function() {
      var params = {
        i: this.checkedIngredients
      };
      this.$router.push({path: "/recipes", query: params});  
    },
    relativeExpiration: function(expiration) {
      var moment = require('moment');
      return moment(expiration).endOf('day').fromNow();
    },
    setSortAttribute: function(attribute) {
      if (this.sortAttribute === attribute) {
        this.sortAscending = this.sortAscending * -1;
      } else {
        this.sortAscending = 1;
        this.sortAttribute = attribute;
      }
    }
  },
};
</script>
