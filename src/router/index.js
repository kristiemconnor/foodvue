import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersEdit from "../views/users/Edit.vue";
import Ingredients from "../views/Ingredients.vue";
import Profile from "../views/users/Profile.vue";
import RecipeIndex from "../views/users/RecipeIndex.vue";
import RecipeShow from "../views/users/RecipeShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    //route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/users/me/edit",
    name: "users-edit",
    component: UsersEdit
  },
  {
    path: "/ingredients/me",
    name: "users-ingredients",
    component: Ingredients
  },
  {
    path: "/recipes",
    name: "recipe-index",
    component: RecipeIndex
  },
  {
    path: "/users/me/profile",
    name: "users-profile",
    component: Profile
  },
  {
    path: "/recipes/:id",
    name: "recipe-show",
    component: RecipeShow
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
