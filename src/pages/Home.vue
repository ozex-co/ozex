<template>
  <div class="home-page">

    <!-- قسم الهيرو بتصميم جديد مع أنيميشن و3D -->
    <section class="hero flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-blue-900 to-purple-900 p-10 text-center relative overflow-hidden">
      <img
        :src="images.hero.bg"
        :alt="images.hero.alt"
        loading="lazy"
        class="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      >
      <h1 class="text-6xl font-extrabold mb-4 text-yellow-400 animate-fadeIn">OZEX - خبراء تطوير الويب الاحترافي</h1>
      <p class="text-xl text-gray-200 max-w-2xl animate-slideUp">شركة رائدة في تصميم وتطوير حلول الويب المتكاملة منذ 2015</p>
      <router-link
        to="/services"
        class="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-500 transition animate-bounce"
        aria-label="استكشف خدمات تطوير المواقع"
      >
        اكتشف خدماتنا
      </router-link>
      <img
        :src="images.logo.url"
        :alt="images.logo.alt"
        class="absolute bottom-0 right-0 w-80 md:w-96 animate-float"
        loading="lazy"
      >
    </section>

    <!-- قسم لماذا نحن؟ -->
    <section dir="rtl" class="why-us py-20 bg-gray-900 text-white text-center" data-aos="fade-up">
  <h2 class="text-4xl font-bold text-yellow-400 mb-8 animate-fadeIn" dir="rtl">لماذا تختار OZEX؟</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
      <div class="text-5xl text-cyan-400 mb-4">
        <i class="fas fa-user-tie"></i>
      </div>
      <h3 class="text-2xl font-bold text-cyan-400">خبرة واحترافية</h3>
      <p class="mt-2 text-gray-300">فريق متخصص ذو خبرة واسعة في تطوير المشاريع الرقمية.</p>
    </div>
    <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
      <div class="text-5xl text-cyan-400 mb-4">
        <i class="fas fa-tachometer-alt"></i>
      </div>
      <h3 class="text-2xl font-bold text-cyan-400">أداء عالي</h3>
      <p class="mt-2 text-gray-300">نضمن لك مواقع سريعة الاستجابة ومتجاوبة مع جميع الأجهزة.</p>
    </div>
    <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
      <div class="text-5xl text-cyan-400 mb-4">
        <i class="fas fa-headset"></i>
      </div>
      <h3 class="text-2xl font-bold text-cyan-400">دعم فني متواصل</h3>
      <p class="mt-2 text-gray-300">نوفر لك الدعم والمساعدة لضمان نجاح مشروعك.</p>
    </div>
  </div>
</section>

    <section dir="rtl" class="work-steps py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white text-center" data-aos="fade-up">
  <h2 class="text-4xl font-bold text-yellow-400 mb-8">خطوات العمل</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
      <div class="text-5xl text-cyan-400 mb-4">
        <i class="fas fa-comments"></i>
      </div>
      <h3 class="text-2xl font-bold text-cyan-400">1. استشارة</h3>
      <p class="mt-2 text-gray-300">التواصل معنا لفهم احتياجاتك وتقديم الاستشارة المناسبة.</p>
    </div>
    <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
      <div class="text-5xl text-cyan-400 mb-4">
        <i class="fas fa-cogs"></i>
      </div>
      <h3 class="text-2xl font-bold text-cyan-400">2. التخطيط والتنفيذ</h3>
      <p class="mt-2 text-gray-300">تصميم وتطوير المشروع وفق أعلى المعايير.</p>
    </div>
    <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
      <div class="text-5xl text-cyan-400 mb-4">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3 class="text-2xl font-bold text-cyan-400">3. التسليم</h3>
      <p class="mt-2 text-gray-300">تسليم المشروع ودعمك لتحقيق أهدافك.</p>
    </div>
  </div>
</section>


    <!-- قسم الخدمات -->
    <section dir="rtl" class="services py-20 bg-gradient-to-r from-gray-900 to-black text-white text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-8">حلولنا التقنية المتكاملة</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="p-6 bg-gray-800 rounded-lg shadow-lg hover:rotate-3 transition"
          itemscope
          itemtype="https://schema.org/Service"
        >
          <img
            :src="service.image"
            :alt="service.alt"
            class="w-full h-60 object-cover rounded-lg mb-4"
            loading="lazy"
          >
          <h3 class="text-2xl font-bold text-cyan-400" itemprop="name">{{ service.name }}</h3>
          <p class="mt-2 text-gray-300" itemprop="description">{{ service.description }}</p>
          <meta itemprop="serviceType" :content="service.category">
        </div>
      </div>
    </section>
    <!-- قسم أحدث المشاريع -->
    <section class="latest-projects py-20 bg-gray-900 text-white text-center">
      <h2 class="text-4xl font-bold text-yellow-400 mb-8">أحدث المشاريع</h2>
      <div class="projects-swiper max-w-6xl mx-auto">
        <div class="swiper-wrapper">
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="swiper-slide p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              :src="project.image"
              :alt="project.alt"
              class="w-full h-60 object-cover rounded-lg mb-4"
              loading="lazy"
            >
            <h3 class="text-2xl font-bold text-cyan-400">{{ project.title }}</h3>
            <p class="mt-2 text-gray-300">{{ project.description }}</p>
            <a
              :href="project.link"
              class="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
            >
              عرض التفاصيل
            </a>
          </div>
        </div>
        <!-- أزرار التحكم المخصصة -->
        <div class="projects-swiper-pagination"></div>
        <div class="projects-swiper-button-next"></div>
        <div class="projects-swiper-button-prev"></div>
      </div>
    </section>



<section class="testimonials py-20 bg-gray-900 text-white text-center" data-aos="fade-up">
  <h2 class="text-4xl font-bold text-yellow-400 mb-8 animate-fadeIn">آراء العملاء</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
      <i class="fas fa-user-circle text-5xl text-cyan-400 mb-4"></i>
      <p class="italic text-gray-300">"خدمة رائعة وسرعة استجابة لا مثيل لها. سأتعامل مع OZEX مرة أخرى بالتأكيد!"</p>
      <h3 class="mt-4 font-bold text-cyan-400">أحمد علي</h3>
    </div>
    <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
      <i class="fas fa-user-circle text-5xl text-cyan-400 mb-4"></i>
      <p class="italic text-gray-300">"تصميماتهم مذهلة ودعمهم الفني دائمًا متوفر."</p>
      <h3 class="mt-4 font-bold text-cyan-400">نورا محمد</h3>
    </div>
    <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
      <i class="fas fa-user-circle text-5xl text-cyan-400 mb-4"></i>
      <p class="italic text-gray-300">"شكراً لـ OZEX على تحقيق رؤيتي في موقع احترافي."</p>
      <h3 class="mt-4 font-bold text-cyan-400">يوسف حسن</h3>
    </div>
  </div>
</section>


    <!-- قسم الفرق بيننا وبين الآخرين -->
    <section dir="rtl"class="comparison py-20 bg-gray-800 text-white text-center" data-aos="fade-up">
  <h2 class="text-4xl font-bold text-yellow-400 mb-8">كيف نختلف عن الآخرين؟</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    <div class="p-6 bg-gray-700 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
      <div class="text-5xl text-green-400 mb-4">
        <i class="fas fa-star"></i>
      </div>
      <h3 class="text-2xl font-bold text-green-400">OZEX</h3>
      <ul class="list-disc text-gray-300 text-left pl-5">
        <li>تطوير سريع وحديث</li>
        <li>أمان عالي وحماية متقدمة</li>
        <li>دعم فني متواصل</li>
      </ul>
    </div>
    <div class="p-6 bg-gray-700 rounded-lg shadow-lg hover:scale-105 transition flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
      <div class="text-5xl text-red-400 mb-4">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <h3 class="text-2xl font-bold text-red-400">الشركات التقليدية</h3>
      <ul class="list-disc text-gray-300 text-left pl-5">
        <li>تصميمات قديمة وغير محدثة</li>
        <li>مشاكل متكررة في الأمان</li>
        <li>دعم فني ضعيف</li>
      </ul>
    </div>
  </div>
</section>

     <section class="articles-section bg-gray-900 text-white py-12 px-6">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-6">مقالات OZEX</h2>
      <div class="articles-list space-y-4 max-w-3xl mx-auto">
        <div
          v-for="(article, index) in articles"
          :key="article.id"
          class="article-item bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <button
            @click="toggleArticle(index)"
            class="w-full text-left flex justify-between items-center focus:outline-none"
          >
            <h3 class="text-lg font-semibold">{{ article.title }}</h3>
            <span class="text-emerald-400 text-2xl">
              {{ activeArticle === index ? "−" : "+" }}
            </span>
          </button>
          <!-- المحتوى مخفي بصريًا لكن موجود في DOM لمحركات البحث -->
          <div
            class="article-content transition-all duration-500 overflow-hidden"
            :style="{
              maxHeight: activeArticle === index ? '500px' : '0px',
              opacity: activeArticle === index ? 1 : 0,
              paddingTop: activeArticle === index ? '1rem' : '0',
              paddingBottom: activeArticle === index ? '1rem' : '0'
            }"
          >
            <p class="mt-2">{{ article.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, onMounted , computed} from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

// أمثلة للصور لو حبيت تستخدمها مع الخدمات أو المشاريع
import webDev from "@/assets/images/dev.png";
import eCommerce from "@/assets/images/E-commerce2.png";
import uiUx from "@/assets/images/UiUx.png";

const services = ref([]);
const projects = ref([]);
const articles = ref([]);
const ogTitle = ref('OZEX - قادة في حلول التكنولوجيا الرقمية')
const ogImage = ref(new URL('@/assets/images/og-image.jpg', import.meta.url).href)
const images = {
  hero: {
    bg: new URL('@/assets/images/3d-1.png', import.meta.url).href,
    alt: 'خلفية ثلاثية الأبعاد لتطوير الويب'
  },
  logo: {
    url: new URL('@/assets/images/logo.svg', import.meta.url).href,
    alt: 'شعار OZEX لتطوير المواقع'
  }
  }


const loadingServices = ref(true);
const loadingProjects = ref(true);
const loadingArticles = ref(true);
const structuredData = computed(() => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "OZEX",
  "url": "https://ozex.com",
  "logo": images.logo.url,
  "description": metaDescription.value,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+201000000000",
    "contactType": "الدعم الفني"
  },
  "sameAs": [
    "https://facebook.com/ozex",
    "https://twitter.com/ozex"
  ]
}))
const activeArticle = ref(null);

onMounted(async () => {
  // تهيئة AOS
  AOS.init({ duration: 1000, once: true });


  // جلب بيانات الخدمات
  try {
    const resServices = await fetch("/services.json");
    if (!resServices.ok) throw new Error(`HTTP error! status: ${resServices.status}`);
    services.value = await resServices.json();
    console.log("✅ Services:", services.value);
  } catch (error) {
    console.error("خطأ في جلب بيانات الخدمات:", error);
  } finally {
    loadingServices.value = false;
  }

  new Swiper('.projects-swiper', {
    loop: true,
    pagination: {
      el: '.projects-swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.projects-swiper-button-next',
      prevEl: '.projects-swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    }
  })

  // جلب بيانات المشاريع
  try {
    const resProjects = await fetch("/projects.json");
    if (!resProjects.ok) throw new Error(`HTTP error! status: ${resProjects.status}`);
    projects.value = await resProjects.json();
    console.log("✅ Projects:", projects.value);
  } catch (error) {
    console.error("خطأ في جلب بيانات المشاريع:", error);
  } finally {
    loadingProjects.value = false;
  }

  // جلب بيانات المقالات من API (تأكد إن الـ API شغال على المسار)
  try {
    const resArticles = await fetch("https://api.ozex.site/api/articles");
    if (!resArticles.ok) throw new Error(`HTTP error! status: ${resArticles.status}`);
    articles.value = await resArticles.json();
    console.log("✅ Articles:", articles.value);
  } catch (error) {
    console.error("خطأ في جلب بيانات المقالات:", error);
  } finally {
    loadingArticles.value = false;
  }
});

const toggleArticle = (index) => {
  activeArticle.value = activeArticle.value === index ? null : index;
};
</script>

<style scoped>
.projects-swiper {
  @apply overflow-hidden;
}

.projects-swiper-slide {
  @apply transition-transform duration-300 hover:scale-105;
}

.projects-swiper-button-next,
.projects-swiper-button-prev {
  @apply text-cyan-400 hover:text-cyan-500;
}

.projects-swiper-pagination-bullet {
  @apply bg-gray-400;
}

.projects-swiper-pagination-bullet-active {
  @apply bg-cyan-400;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-fadeIn { animation: fadeIn 1.5s ease-in-out; }
.animate-slideUp { animation: slideUp 1.5s ease-in-out; }
.animate-float { animation: float 6s infinite ease-in-out; }
</style>
