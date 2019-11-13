<template>
  <div id="app">
    <!-- NAVIGATION-->
    <header id="navigation" class="header">
      <div class="container">
        <!-- LOGO-->
        <div class="inner-header"><a href="/index.html" class="inner-brand"><img src="/assets/images/logo-light.png" width="100" alt=""></a></div>
        <!-- MENU-->
        <div class="inner-navigation collapse">
          <div class="inner-navigation-inline">
            <div class="inner-nav">
              <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li v-if="isLoggedIn()" class="has-submenu">  <router-link to="/users/me/profile">View Profile</router-link></li>
                <li v-if="isLoggedIn()"><router-link to="/logout">Logout</router-link></li>
              </ul>
            </div>
            <!-- EXTRA ICONS MENU-->
            <div class="extra-nav text-right">
              <ul>
                <li v-if="!isLoggedIn()"><router-link to="/login">Login</router-link></li>
                <li v-if="!isLoggedIn()"> <router-link to="/signup">Create Account</router-link>
                </li>
                <li v-if="isLoggedIn()"> <router-link to="/ingredients/me">Pantry</router-link>
                </li>
              </ul>
            </div>
            <!-- END EXTRA ICONS MENU-->
          </div>
        </div>
        <!-- SHOW MOBILE MENU-->
        <div class="nav-toogle"><a href="#" data-toggle="collapse" data-target=".inner-navigation" class="fa fa-bars"></a></div>
      </div>
    </header>
 <div id="nav">
<!-- old router links were here --></div>
    <div class="wrapper">
      <router-view />
      <footer class="footer-bottom">
        <div class="container-fluid">
          <div class="col-md-6">
            <div class="widget">
              <p>© 2016 <a href="https://wrapbootstrap.com/user/web-master72" title="Risotto">Risotto</a>. All rights reserved. Designed by 2the.me.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="widget">
              <li><a href="http://www.recipepuppy.com/about/api/" title="Recipe Puppy">Powered by Recipe Puppy.</a></li>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
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
export default {
  data: function() {
    return {
      user_id: localStorage.getItem("user_id")
    };  
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>