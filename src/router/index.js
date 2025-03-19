import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Home from "@/pages/Home.vue";
import Services from "@/pages/Services.vue";
import Orders from "@/pages/Orders.vue";
import Dashboard from "@/pages/admin/Dashboard.vue";
import ManageUsers from "@/pages/admin/ManageUsers.vue";
import ManageOrders from "@/pages/admin/ManageOrders.vue";
import ManageServices from "@/pages/admin/ManageServices.vue";
import Finance from "@/pages/admin/Finance.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import Profile from "@/pages/auth/Profile.vue";
import NotFound from "@/pages/NotFound.vue";
const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Home },
      { path: "services", component: Services },
      { path: "orders", component: Orders, meta: { requiresAuth: true } }, // 🔐 حماية الطلبات
      { path: "login", component: Login },
      { path: "register", component: Register },
      { path: "profile", component: Profile, meta: { requiresAuth: true } }, // 🔐 حماية الحساب
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true }, // 🔐 حماية لوحة التحكم
    children: [
      { path: "", component: Dashboard },
      { path: "users", component: ManageUsers },
      { path: "orders", component: ManageOrders },
      { path: "services", component: ManageServices },
      { path: "finance", component: Finance },
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 **إضافة حماية المسارات**
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ تخزين الدور بشكل منفصل

  // 🔹 التحقق من تسجيل الدخول
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // 🔹 التحقق من الصلاحيات الإدارية
  if (to.meta.requiresAdmin && role !== "admin") {
    return next("/"); // يرجعه للصفحة الرئيسية لو مش أدمن
  }

  next();
});

export default routes;
