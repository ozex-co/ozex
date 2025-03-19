import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./assets/style.css"; // استيراد Tailwind CSS
import AOS from "aos";
import "aos/dist/aos.css";
import routes from "./router"; // استيراد الراوتر
import axios from "axios";
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import { createHead } from '@vueuse/head'

// إنشاء التطبيق
const app = createApp(App);

const head = createHead()


app.use(head)

// إعداد نظام التوجيه بدون "#"
const router = createRouter({
  history: createWebHistory(),
  routes,
});
app.use(router);
console.log(routes);  // Log the routes to check its value
app.use(PrimeVue);
app.use(ConfirmationService);

app.config.performance = true;

// 3. إعدادات التطبيق العامة
app.config.globalProperties.$seo = {
  logUpdate: () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Current SEO Tags:', {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        canonical: document.querySelector('link[rel="canonical"]')?.href
      });
    }
  }
};
// تكامل AOS لتأثيرات التحريك
AOS.init();

// جعل Axios متاحًا داخل جميع المكونات
app.config.globalProperties.$axios = axios;

// تشغيل التطبيق
app.mount("#app");
