<template>
  <section class="module-divider">
    <div class="recipe-show">
  <br>
<!-- image -->
   <h2 img v-bind:src="recipe.thumbnail" alt="recipe image"></h2>
      <h4>Selected Recipe: {{ recipe.title }}</h4>
       <h4>Contains {{ recipe.ingredients }} </h4>
        <h5><a 
        class="instructions" 
        v-bind:href="recipe.href" >Follow this link for the recipe's instructions</a>
       <!--  <a href="http://img.recipepuppy.com/10.jpg"></a> -->
      </h5>
      
    </div>
  </section>
</template>
<style>
  a:link {
    text-decoration: none;
    color: orange;  
  }

  a:visited {
    text-decoration: none;
    color: silver;
  }

  a:hover {
    text-decoration: none;
    color: orange;
  }

  a:active {
    text-decoration: underline;
  }
 </style>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recipe: []
    };
  },
  created: function() {
    axios.get("/api/recipes/" + this.$route.params.id).then(response =>{
      this.recipe = response.data;
      console.log(response.data);
      console.log(this.recipe.href);
    })
      .catch(error => {
        this.errors = error.response.data.errors;
        console.log(error.response.data.errors);
      });
  },
  methods: {},
};
</script>