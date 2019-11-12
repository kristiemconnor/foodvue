<template>
  <section class="module divider">
  <div class="users-ingredients">
    <h4>{{ user.first_name }}'s Pantry</h4>
        <h4>Ingredients on hand: {{ user.ingredients.length }}</h4>
      <br>
        <p><h5>Select up to three ingredients, then click "find recipe" to search our recipe database.</h5> 
        </p>
      <h4>Add an ingredient</h4>
        Name: <input type="text" v-model="newIngredientName"><br>
        Expiration: <input type="date" v-model="newIngredientExpiration"><br>
        <button v-on:click="addIngredient" class="btn-sm">Add</button>
        <br>
      <div class="sort">
        <h5>Search ingredients by name: <input type="text" v-model="titleFilter" list="names">
          <datalist id="names">
            <option v-for="ingredient in ingredients">{{ ingredient.name }}</option>
          </datalist></h5>
        <button v-on:click="setSortAttribute('name')" class="btn-sm"> Sort Alphabetically</button>
        <button v-on:click="setSortAttribute('expiration')" class="btn-sm"> Sort by Expiration</button>
      </div>
    <button v-on:click="findRecipes()" class="btn-sm">Find Recipes</button>
    <li v-for="ingredient in orderBy(filterBy(ingredients, nameFilter, 'name'), sortAttribute)">
      <input type="checkbox" :id="ingredient.id" :value="ingredient.name" v-model="checkedIngredients">
      <label :for="ingredient.id">{{ ingredient.name }}</label>
       : will expire {{ relativeExpiration(ingredient.expiration) }} 
        <h4>Edit Ingredient</h4>
          <h5>Name: <input type="text" v-model="ingredient.name">
          Expiration: <input type="date" v-model="ingredient.expiration"></h5>
          <button v-on:click="updateIngredient(ingredient)" class="btn-sm">Edit</button>
          <button v-on:click="destroyIngredient(ingredient)" class="btn-sm">Delete</button>
            <br>
      </li>
  </div>
</section>
</template>

<style>
/*  div {
    justify-content: center;
  }  */
</style>

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
      sortAttribute: "expiration",
      nameFilter: ""
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
        });
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
      this.sortAttribute = attribute;
    },
  }
};
</script>
