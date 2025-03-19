<template>
    <div class="home-page">
      <!-- قسم الترحيب -->
      <section class="hero" data-aos="fade-up">
        <h1 class="title">مرحبًا بك في <span>OZEX</span></h1>
        <p class="subtitle">أفضل الحلول التقنية لإنشاء مواقع احترافية.</p>
        <router-link to="/services" class="btn">استكشف خدماتنا</router-link>
      </section>
  
      <!-- قسم الخدمات -->
      <section class="services" data-aos="fade-up">
        <h2 class="section-title">خدماتنا</h2>
        <div class="service-list">
          <div class="service-card" v-for="service in services" :key="service.id">
            <div class="icon">
              <component :is="service.icon"></component>
            </div>
            <h3>{{ service.name }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { Code, ShoppingCart, Globe } from "lucide-vue-next";
  import AOS from "aos";
  import "aos/dist/aos.css";
  
  onMounted(() => {
    AOS.init();
  });
  
  const services = ref([
    { id: 1, name: "تطوير الويب", description: "إنشاء مواقع احترافية وسريعة.", icon: Code },
    { id: 2, name: "متاجر إلكترونية", description: "تصميم متاجر جاهزة للبيع والشراء.", icon: ShoppingCart },
    { id: 3, name: "حجز نطاقات", description: "توفير الدومينات بأسعار تنافسية.", icon: Globe },
  ]);
  </script>
  
  <style scoped>
  .home-page {
    text-align: center;
    color: white;
    background: #0d0d0d;
    padding: 50px 20px;
  }
  
  .hero {
    padding: 100px 20px;
  }
  .hero .title {
    font-size: 3rem;
    font-weight: bold;
    color: #0ff;
  }
  .hero span {
    color: #ff0;
  }
  .hero .subtitle {
    font-size: 1.2rem;
    margin: 10px 0 20px;
  }
  .hero .btn {
    background: #0ff;
    color: #000;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: bold;
    transition: 0.3s;
  }
  .hero .btn:hover {
    background: #ff0;
  }
  
  .services {
    margin-top: 80px;
  }
  .section-title {
    font-size: 2.5rem;
    color: #ff0;
  }
  .service-list {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .service-card {
    background: #222;
    padding: 20px;
    border-radius: 10px;
    width: 250px;
    text-align: center;
    transition: 0.3s;
  }
  .service-card:hover {
    background: #333;
  }
  .icon {
    font-size: 40px;
    color: #0ff;
    margin-bottom: 10px;
  }
  </style>
  