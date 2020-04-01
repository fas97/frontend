import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import MyPage from "../views/MyPage.vue";
import Sale from "../views/Sale.vue";
import MySales from "../views/MySales.vue";
import EditSale from "../views/EditSale.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "Login"
      }
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/MyPage",
      name: "MyPage",
      component: MyPage
    },
    {
      path: "/Sale",
      name: "Sale",
      component: Sale
    },
    {
      path: `/EditSale/:saleId`, //${id}
      name: "EditSale",
      component: EditSale,
      props: true,
    },
    {
      path: "/MySales",
      name: "MySales",
      component: MySales
    }
  ]
});
