<template>
  <div id="app">
    <!-- NAVIGATION-->
    <header id="navigation" class="header">
        <div class="container">
            <!-- LOGO-->
            <div class="inner-header"><a href="index.html" class="inner-brand"><img src="assets/images/logo-light.png" width="100" alt=""></a></div>
            <!-- MENU-->
            <div class="inner-navigation collapse">
                <div class="inner-navigation-inline">
                    <div class="inner-nav">
                        <ul>
                            <li class="has-submenu"><a href="#">Home</a>
                                                           </li>
                            <li class="has-submenu"><a href="#">Pages</a>
                                                         </li>
                            <li class="has-submenu"><a href="#">Shop</a>
                                                        </li>
                            <li class="has-submenu"><a href="#">Blog</a>
                                                       </li>
                            <li class="has-submenu"><a href="#">Shortcodes</a>
                                                         </li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    <!-- EXTRA ICONS MENU-->
                    <div class="extra-nav text-right">
                        <ul>
                            <li class="has-submenu submenu-left">     <router-link to="/login">Login</router-link>
                                                          </li>
                            <li class="has-submenu submenu-left"> <router-link to="/signup">Create Account</router-link>
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
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
           |
 
      |
      <router-link to="/logout">Logout</router-link>
      |
      <router-link to="/users/me/profile">View Profile</router-link>
    </div>
    <div class="wrapper">
      <router-view />

      <footer class="footer-bottom">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="widget">
                        <p>© 2016 <a href="#">Risotto</a>. All rights reserved. Designed with love by 2the.me.</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="widget">
                        <ul class="social-icons">
                            <li><a href="#" data-toggle="tooltip" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" data-original-title="Facebook"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" data-original-title="Google plus"><i class="fa fa-google-plus"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" data-original-title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" data-original-title="Dribbble"><i class="fa fa-dribbble"></i></a></li>
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
</style>
