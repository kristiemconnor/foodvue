<template>
    <body>
      <div class="wrapper">
          <!-- HERO-->
          <section data-background="assets/images/module-7.jpg" class="module-hero color-white parallax bg-black-alfa-30">
              <div class="hero-caption">
                  <div class="hero-text">
                      <div class="container">
                          <div class="row">
                          </div>
                      </div>
                   </div>
              </div>     
          </section>
        <div class="col-sm-8 col-sm-offset-2 text-center">
        <h5>Recipes containing your selected ingredients</h5>
         <br>
          <div v-for="recipe in recipes">
          <img v-bind:src="recipe.thumbnail" alt ="recipe image">
          <br>
          <h5>{{ recipe.title }}</h5>
          <h5>Contains {{ recipe.ingredients }}. </h5>
          <h6><a class="recipelink" target="_blank" v-bind:href="recipe.href">See more</a><br></h6>
          </div>
      </div>
    </div>
  </body>
</template>
<style>
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