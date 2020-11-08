import { createRouter, createWebHistory } from "vue-router";
import DcHeroes from "./pages/DcHeroes";
import Calendar from "./pages/Calendar";
import Markdown from "./pages/Markdown";
import Slider from "./pages/Slider";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import ReusableModal from "./pages/ReusableModal";

const routes = [
  { path: "/", component: Home },
  { path: "/dc-heroes", component: DcHeroes },
  { path: "/calendar", component: Calendar },
  { path: "/markdown", component: Markdown },
  { path: "/slider", component: Slider },
  { path: "/calculator", component: Calculator },
  { path: "/reusable-modal", component: ReusableModal },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
