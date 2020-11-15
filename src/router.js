import { createRouter, createWebHistory } from "vue-router";
import DcHeroes from "./pages/DcHeroes";
import Calendar from "./pages/Calendar";
import Markdown from "./pages/Markdown";
import Slider from "./pages/Slider";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import ReusableModal from "./pages/ReusableModal";
import UserCrud from "./pages/UserCrud";
import Chat from "./pages/Chat";
import store from "./store/index";

const routes = [
  { path: "/", component: Home },
  { path: "/dc-heroes", component: DcHeroes },
  { path: "/calendar", component: Calendar },
  { path: "/markdown", component: Markdown },
  { path: "/slider", component: Slider },
  { path: "/calculator", component: Calculator, meta: { middleware: "auth" } },
  { path: "/reusable-modal", component: ReusableModal },
  {
    path: "/chat",
    component: Chat,
    meta: { middleware: "auth" },
    beforeEnter: (_, __, next) => {
      if (store.state.isLoggedIn) {
        next();
      } else {
        next("/");
      }
    },
  },
  { path: "/user-crud", component: UserCrud },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = require(`./middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(next, store);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
