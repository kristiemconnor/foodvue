<template>
  <div class="recipe-index">
    <h4>Recipes containing your selected ingredients</h4>
    <br>{{ recipes }}
    <div v-for="recipe in recipes">
      {{ recipe.thumbnail }}
      <br>
      {{ recipe.title }}
      <br>
      <a class="recipe-link" v-bind:href="recipe.href"></a>
      <h5>Contains {{ recipe.ingredients }} </h5>
    </div>
  </div>
</template>


<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      recipes: []
    };
  },
  created: function() {
    axios.get("/api/recipes/").then(response =>{
      this.recipes = response.data;
      console.log(response.data);
    })
      .catch(error => {
        this.errors = error.response.data.errors;
        console.log(error.response.data.errors);
      });

  },

  methods: {},
};



</script>