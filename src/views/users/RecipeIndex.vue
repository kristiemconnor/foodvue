<template>
  <div class="recipe-index">
    <h4>Recipes containing your selected ingredients</h4>
    <br>
    <div v-for="recipe in recipes">
<!-- show image with dynamic variable for each recipe IF an image URL exists

 -->      {{ recipe.thumbnail }}
      <br>
      {{ recipe.title }}
      <a class="recipe-link" v-bind:href="recipe.href"></a>
      <h4>Contains {{ recipe.ingredients }}. </h4>
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