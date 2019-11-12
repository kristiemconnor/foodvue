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
                            <li class="has-submenu">  <router-link to="/">Home</router-link>
                                                           </li>
 <li class="has-submenu"><router-link to="/about">About</router-link>
                              </li>
                              <li class="has-submenu">  <router-link v-if="isLoggedIn()" to="/users/me/profile">View Profile</router-link></li>
                            <li>  <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link></li>
                        </ul>
                    </div>
                    <!-- EXTRA ICONS MENU-->
                    <div class="extra-nav text-right">
                        <ul>
                            <li class="has-submenu submenu-left">     <router-link v-if="!isLoggedIn()" to="/login">Login</router-link>
                                                          </li>
                            <li class="has-submenu submenu-left"> <router-link v-if="!isLoggedIn()" to="/signup">Create Account</router-link>
                            </li>
                        </ul>
                    </div>
                    <!-- END EXTRA ICONS MENU-->
                </div>
            </div>
        </div>
    </header>
 <div id="nav">
<!-- old router links were here --></div>
    <div class="wrapper">
      <router-view />

      <footer class="footer-bottom">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="widget">
                        <p>© 2016 <a href="https://wrapbootstrap.com/user/web-master72" title="Risotto">Risotto</a>. All rights reserved. Designed by 2the.me.</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="widget">
                        <ul class="social-icons">
                          <li><a href="http://www.recipepuppy.com/about/api/" title="Recipe Puppy">Powered by Recipe Puppy.</a></li>
                            <li><a href="http://www.twitter.com/foodparty4" title="tweet tweet" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></li>                            
                        </ul>
                    </div>
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