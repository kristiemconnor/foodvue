<template>
  <div class="recipe-index">
    <h4>Recipes containing your selected ingredients</h4>
    <br>
    <div v-for="recipe in recipes">
<img v-bind:src="recipe.thumbnail" alt ="recipe image">
      <br>
      {{ recipe.title }}
      <h4>Contains {{ recipe.ingredients }}. </h4>
      <a class="recipelink" target="_blank" v-bind:href="recipe.href">See more</a><br>
    </div>
  </div>
</template>
<style>
  a:link {
    text-decoration: none;
    color: green;  
  }

  a:visited {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: none;
    color: orange;
  }

  a:active {
    text-decoration: underline;
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recipes: []
    };
  },
  created: function() {
    axios.get("/api/recipes/", {params: this.$route.query}).then(response =>{
      console.log(this.$route.query);
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