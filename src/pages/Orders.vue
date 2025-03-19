<template>
  <div class="request-page">
    <!-- قسم الهيرو -->
    <section class="hero flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-purple-900 to-blue-900 p-10 text-center relative overflow-hidden" data-aos="fade-up">
      <div class="absolute top-0 left-0 w-full h-full bg-[url('@/assets/images/hero-request.png')] bg-cover opacity-30 lazy-load"></div>
      <h1 class="text-6xl font-extrabold mb-4 text-yellow-400" data-aos="fade-in">طلب خدمة</h1>
      <p class="text-xl text-gray-200 max-w-2xl" data-aos="fade-in">
        قم بتقديم طلبك وسنقوم بالتواصل معك في أسرع وقت ممكن.
      </p>
    </section>

    <!-- نموذج الطلب -->
    <section class="request-form py-20 bg-gray-900 text-white text-center" data-aos="fade-up">
      <h2 class="text-4xl font-bold text-yellow-400 mb-8">املأ بياناتك</h2>
      <form @submit.prevent="submitRequest" class="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input v-model.trim="form.name" type="text" placeholder="الاسم الكامل" required class="input" />
          <input v-model.trim="form.email" type="email" placeholder="البريد الإلكتروني" required class="input" />
          <input v-model.trim="form.phone" type="tel" placeholder="رقم الهاتف" required class="input" />
          <select v-model="form.service" required class="input">
            <option value="">اختر الخدمة المطلوبة</option>
            <option value="web">تطوير الويب</option>
            <option value="ecommerce">متجر إلكتروني</option>
            <option value="performance">تحسين الأداء</option>
            <option value="uiux">تصميم UX/UI</option>
          </select>
        </div>
        <textarea v-model.trim="form.description" placeholder="وصف الطلب" required class="input mt-4"></textarea>
        <select v-model="form.budget" required class="input mt-4">
          <option value="">حدد الميزانية المتوقعة</option>
          <option value="1000-5000">1000 - 5000 جنيه</option>
          <option value="5000-10000">5000 - 10000 جنيه</option>
          <option value="10000+">أكثر من 10000 جنيه</option>
        </select>
        <input type="file" @change="handleFileUpload" class="input mt-4" />

        <button :disabled="loading" type="submit" class="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-500 transition flex items-center justify-center">
          <span v-if="loading" class="loader"></span>
          <span v-else>إرسال الطلب</span>
        </button>

        <p v-if="message" :class="messageClass" class="mt-4">{{ message }}</p>
      </form>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const apiLocal = "https://api.ozex.site/api/orders";
const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  description: '',
  budget: '',
  file: null
});
const message = ref('');
const messageClass = ref('');
const loading = ref(false);

const handleFileUpload = (event) => {
  form.file = event.target.files[0];
};

const submitRequest = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    message.value = "يجب تسجيل الدخول لإرسال طلب";
    messageClass.value = "text-red-500";
    return;
  }

  const formData = new FormData();
  Object.keys(form).forEach(key => {
    if (form[key]) formData.append(key, form[key]);
  });

  try {
    const response = await fetch(apiLocal, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${token}` // ✅ إرسال التوكن
      }
    });

    const result = await response.json();
    message.value = result.message || "تم إرسال الطلب بنجاح!";
    messageClass.value = response.ok ? "text-green-500" : "text-red-500";
  } catch {
    message.value = "فشل الاتصال بالسيرفر.";
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background: #2d2d2d;
  color: white;
  border: 1px solid #444;
  outline: none;
}
.input::placeholder {
  color: #bbb;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid transparent;
  border-top: 3px solid #222;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
