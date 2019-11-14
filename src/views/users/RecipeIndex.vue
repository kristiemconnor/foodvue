<template>
  <div class="recipe-index">
    <section class="module-hero color-white parallax bg-black-alfa-30 bg-mod-2">
      <div class="hero-caption">
        <div class="hero-text">
          <div class="container">
            <div class="row">
              <div class="col-sm-12 text-center">
                <h1 class="m-0">Recipes</h1>
              </div>
            </div>
          </div>
        </div>       
      </div>
    </section>  
    <section class="module divider" style="padding-top:20px">
      <div class="container">
        <div class="col-sm-12">
          <form method="post">
            <div class="table-responsive">
              <table class="table cart-table">
                <tbody>
                  <tr v-for="recipe in recipes">
                    <td><img v-if="recipe.thumbnail" v-bind:src="recipe.thumbnail" :alt="recipe.title" class="cart-thumbnail"/></td>
                    <td>
                      <h6 class="m-b-5 brown-font">{{ recipe.title }}</h6><span class="text-xs">Contains {{ recipe.ingredients }}</span>
                    </td>
                    <td>
                      <a class="btn btn-brand" target="_blank" v-bind:href="recipe.href">See more</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
  a:link {
    text-decoration: none;
    color: gray;  
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
  .brown-font {
    color: #c78f53;
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