<template>
  
  
</template>
<style></style>


<script>
import axios from "axios";

export default {
  data: function() {
    return {
      recipes: [],
      search: "onion",
    };
  },
  created: function() {
    axios.get("/api/recipes/?i=" + this.search).then(response =>{
      this.recipes = response.data;
      console.log(response.data);
    });
  },

  methods: {},
};



</script>