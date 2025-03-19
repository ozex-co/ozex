<template>
  <div class="services-page">
    <!-- قسم الهيرو -->
    <section class="hero flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-blue-900 to-purple-900 p-10 text-center relative overflow-hidden" data-aos="fade-up">
      <div class="absolute top-0 left-0 w-full h-full bg-[url('@/assets/images/hero-2.png')] bg-cover opacity-30 lazy-load"></div>
      <h1 class="text-6xl font-extrabold mb-4 text-yellow-400 animate-fadeIn" data-aos="fade-in">خدماتنا</h1>
<p class="text-xl text-gray-200 max-w-2xl animate-slideUp" data-aos="fade-in">
  نقدم مجموعة متنوعة من الخدمات الرقمية المبتكرة لتلبية احتياجات عملك.
</p>

      <router-link to="/" class="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-500 hover:glow transition animate-bounce">
        العودة للرئيسية
      </router-link>
    </section>

    <!-- قسم الخدمات -->
    <section class="services-content py-20 bg-gray-900 text-white text-center" data-aos="fade-up" dir="rtl">
      <h2 class="text-4xl font-bold text-yellow-400 mb-8 animate-fadeIn">تفاصيل الخدمات</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <!-- تطوير الويب -->
        <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition" data-aos="fade-up" data-aos-delay="100">
          <img src="@/assets/images/web-dev.png" alt="تطوير الويب" class="w-full h-65 object-cover rounded-lg mb-4">
          <h3 class="text-2xl font-bold text-cyan-400">تطوير الويب</h3>
          <p class="mt-2 text-gray-300">نحن نستخدم أحدث التقنيات مثل Vue.js و Node.js لإنشاء مواقع سريعة، متجاوبة، وآمنة. نركز على تحسين الأداء وتجربة المستخدم لضمان تحقيق أهداف عملائنا.</p>
        </div>
            <!-- تحسين وتسريع أداء المواقع -->
     <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition" data-aos="fade-up" data-aos-delay="400">
     <img src="@/assets/images/o-per.png" alt="تحسين الأداء" class="w-full h-65 object-cover rounded-lg mb-4">
    <h3 class="text-2xl font-bold text-cyan-400">تحسين وتسريع أداء المواقع</h3>
     <p class="mt-2 text-gray-300">
    نقدم حلولاً متقدمة لتحسين سرعة تحميل المواقع وأدائها، مع التركيز على تجربة المستخدم. يشمل ذلك ضغط الصور والأكواد، التخزين المؤقت، وتحسين محركات البحث.
      </p>
      </div>

        <!-- التجارة الإلكترونية -->
        <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition" data-aos="fade-up" data-aos-delay="200">
          <img src="@/assets/images/e-commerce-s.png" alt="التجارة الإلكترونية" class="w-full h-65 object-cover rounded-lg mb-4">
          <h3 class="text-2xl font-bold text-cyan-400">التجارة الإلكترونية</h3>
          <p class="mt-2 text-gray-300">نوفر حلولاً متكاملة لإنشاء متاجر إلكترونية احترافية، مع ميزات متقدمة مثل الدفع الإلكتروني، إدارة المخزون، والتحليلات المتطورة لزيادة مبيعاتك.</p>
        </div>

        <!-- تصميم UX/UI -->
        <div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition" data-aos="fade-up" data-aos-delay="300">
          <img src="@/assets/images/ui-ux.png" alt="تصميم UX/UI" class="w-full h-65 object-cover rounded-lg mb-4">
          <h3 class="text-2xl font-bold text-cyan-400">تصميم UX/UI</h3>
          <p class="mt-2 text-gray-300">نتميز بتصميم واجهات حديثة وسهلة الاستخدام تعتمد على مبادئ UX/UI لضمان تجربة مستخدم مريحة وجذابة، مما يعزز نجاح منتجاتك الرقمية.</p>
        </div>

      </div>
    </section>

    <!-- قسم الإحصائيات -->
    <section class="stats-section py-20 bg-gray-900 text-white text-center" data-aos="fade-up">
      <h2 class="text-4xl font-bold text-yellow-400 mb-8 animate-fadeIn">إحصائيات وإنجازات</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        <div class="stat-item p-6 bg-gray-800 rounded-lg shadow-lg" data-aos="zoom-in" data-aos-delay="100">
          <div class="text-5xl font-bold text-cyan-400 counter" data-target="150">0</div>
          <p class="mt-2 text-gray-300">مشروع مكتمل</p>
        </div>
        <div class="stat-item p-6 bg-gray-800 rounded-lg shadow-lg" data-aos="zoom-in" data-aos-delay="200">
          <div class="text-5xl font-bold text-green-400 counter" data-target="120">0</div>
          <p class="mt-2 text-gray-300">عميل سعيد</p>
        </div>
        <div class="stat-item p-6 bg-gray-800 rounded-lg shadow-lg" data-aos="zoom-in" data-aos-delay="300">
          <div class="text-5xl font-bold text-purple-400 counter" data-target="5">0</div>
          <p class="mt-2 text-gray-300">سنوات الخبرة</p>
        </div>
        <div class="stat-item p-6 bg-gray-800 rounded-lg shadow-lg" data-aos="zoom-in" data-aos-delay="400">
          <div class="text-5xl font-bold text-yellow-400 counter" data-target="98">0%</div>
          <p class="mt-2 text-gray-300">نسبة رضا العملاء</p>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';

let observer; // متغير لتخزين الـ observer

onMounted(async () => {
  console.log("Initializing AOS...");

  // ✅ التحقق مما إذا كانت مكتبة AOS موجودة قبل استخدامها
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  } else {
    console.warn("AOS library is not loaded!");
  }

  // تأخير تحميل الخلفية
  setTimeout(() => {
    document.querySelector(".lazy-load")?.classList.add("loaded");
  }, 500);

  await nextTick(); // انتظار تحميل الـ DOM

  const counters = document.querySelectorAll('.counter');
  console.log("Found counters:", counters);

  if (!counters.length) {
    console.warn("No counters found!");
    return;
  }

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      console.log("Element observed:", entry.target, "Is intersecting:", entry.isIntersecting);

      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        
        if (isNaN(target)) {
          console.warn("Invalid target value for counter:", counter);
          return;
        }

        console.log("Animating counter:", counter, "Target:", target);

        let count = 0;
        const increment = Math.max(target / 100, 1);

        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
        observer.unobserve(counter); // وقف المراقبة بعد بدء العداد
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
});

// ✅ حل المشكلة: نقل onUnmounted إلى الخارج
onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    console.log("Observer disconnected.");
  }
});
</script>



<style scoped>
@keyframes fadeIn {
  from { opacity: 1; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 1; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.animate-fadeIn { animation: fadeIn 1.5s ease-in-out; }
.animate-slideUp { animation: slideUp 1.5s ease-in-out; }
.animate-float { animation: float 6s infinite ease-in-out; }
.animate-pulse { animation: pulse 1.5s infinite; }

.hover\:glow:hover {
  box-shadow: 0 0 15px rgba(255, 223, 0, 0.8);
  transform: scale(1.05);
}

.lazy-load {
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease-in-out;
}
.lazy-load.loaded {
  opacity: 1;
}
</style>
