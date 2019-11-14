<template>
  <div class="users-ingredients">
    <section id="about" class="module" style="padding-bottom:15px">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <div class="module-header text-center">
              <h1>Your Ingredients</h1>
              <p class="divider-line">Select up to three ingredients, then click "find recipe" to search our recipe database.</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4 wow fadeInUp">
            <!-- FEATURE-->
            <div class="feature">
              <h4 class="feature-title">Add Ingredient</h4>
              <p>
                <input type="text" v-model="newIngredientName" placeholder="Name"><div class="row"></div>
                <input type="date" v-model="newIngredientExpiration"><br>
                <div class="row" style="padding-bottom:5px"></div>
                <button v-on:click="addIngredient" class="btn btn-brand" style="padding-top:10px">Add</button>
              </p>
            </div>
            <!-- END FEATURE-->
          </div>
          <div data-wow-delay="0.2s" class="col-sm-4 wow fadeInUp">
            <!-- FEATURE-->
            <div class="feature">
              
              <h4 class="feature-title">Search Ingredients</h4>
              <p><input type="text" v-model="nameFilter" list="names" placeholder="By name"></p>
            </div>
            <!-- END FEATURE-->
          </div>
          <div data-wow-delay="0.4s" class="col-sm-4 wow fadeInUp">
            <!-- FEATURE-->
            <div class="feature">
              
              <h4 class="feature-title">Sort Ingredients</h4>
              <p><button v-on:click="setSortAttribute('name')" class="btn btn-brand">Alphabetically <i class="arrow_down"></i></button> <div class="row"></div> <button v-on:click="setSortAttribute('expiration')" class="btn btn-brand">By Expiration <i class="arrow_down"></i></button></p>
            </div>
            <!-- END FEATURE-->
          </div>
        </div>
      </div>
    </section>

    <section class="module divider-bottom" style="padding-top: 15px">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h6>Ingredients on hand: {{ ingredients.length }}</h6>
            <form method="post"> 
              <div class="table-responsive">
                <table class="table cart-table">

                  <tbody>
                    <tr v-for="ingredient in orderBy(filterBy(ingredients, nameFilter, 'name'), sortAttribute)">
                      <td><input type="checkbox" :id="ingredient.id" :value="ingredient.name" v-model="checkedIngredients"></td>
                      <td>
                     
                      <td>
                        <h6 class="m-b-5"><a href="#">{{ingredient.name}}</a></h6><span class="text-xs">expires in {{ relativeExpiration(ingredient.expiration) }}</span>
                      </td>
                      <td>
                        <input type="text" v-model="ingredient.name">
                      </td>
                      <td>
                        <input type="date" v-model="ingredient.expiration">

                      </td>
                      <td>
                        <button v-on:click="updateIngredient(ingredient)" class="btn btn-brand">Edit</button>
                      </td>
                      <td>
                        <button v-on:click="destroyIngredient(ingredient)" class="btn btn-brand">Delete <i class="icon_trash"></i></button>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 text-center">
            <button v-on:click="findRecipes()" class="btn btn-brand">Find Recipes</button>
          </div>
        </div>
        
      </div>
    </section>

    
  </div>
</template>

<style>
.justify {
  align-items: center;
}
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
