<template>
  <div class="auth-page flex justify-center items-center min-h-screen bg-gray-900 text-white">
    <div class="auth-box bg-gray-800 p-8 rounded-lg shadow-lg w-96" data-aos="fade-up">
      <h2 class="text-3xl font-bold text-yellow-400 text-center mb-6">إنشاء حساب</h2>

      <form @submit.prevent="handleRegister">
        <input v-model="name" type="text" placeholder="الاسم الكامل" class="input" required />
        <input v-model="email" type="email" placeholder="البريد الإلكتروني" class="input mt-4" required />
        <input v-model="password" type="password" placeholder="كلمة المرور" class="input mt-4" required />

        <button type="submit" class="btn mt-6" :disabled="loading">
          {{ loading ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب" }}
        </button>

        <p v-if="message" :class="messageClass" class="mt-4 text-center">{{ message }}</p>
      </form>

      <p class="text-sm text-center mt-4">
        لديك حساب بالفعل؟ <router-link to="/login" class="text-yellow-400">تسجيل الدخول</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const message = ref("");
const messageClass = ref("");
const loading = ref(false);

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    message.value = "يرجى إدخال جميع البيانات";
    messageClass.value = "text-red-500";
    return;
  }

  loading.value = true;

  try {
    const role = email.value === "admin@ozex.site" ? "admin" : "user";

    const response = await fetch("https://api.ozex.site/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value, role }),
    });

    const result = await response.json();

    if (response.ok) {
      message.value = "تم إنشاء الحساب بنجاح!";
      messageClass.value = "text-green-500";
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      message.value = result.error || "حدث خطأ أثناء إنشاء الحساب";
      messageClass.value = "text-red-500";
    }
  } catch (error) {
    message.value = "فشل الاتصال بالسيرفر. حاول مرة أخرى لاحقًا";
    messageClass.value = "text-red-500";
  } finally {
    loading.value = false;
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
.btn {
  width: 100%;
  padding: 12px;
  background: #facc15;
  color: #000;
  font-weight: bold;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
}
.btn:disabled {
  background: #b79410;
  cursor: not-allowed;
}
.btn:hover:not(:disabled) {
  background: #eab308;
}
</style>
