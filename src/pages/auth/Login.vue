<template>
  <div class="auth-page flex justify-center items-center min-h-screen bg-gray-900 text-white">
    <div class="auth-box bg-gray-800 p-8 rounded-lg shadow-lg w-96" data-aos="fade-up">
      <h2 class="text-3xl font-bold text-yellow-400 text-center mb-6">تسجيل الدخول</h2>

      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="البريد الإلكتروني" class="input" required />
        <input v-model="password" type="password" placeholder="كلمة المرور" class="input mt-4" required />

        <button type="submit" class="btn mt-6" :disabled="loading">
          {{ loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول" }}
        </button>

        <p v-if="message" :class="messageClass" class="mt-4 text-center">{{ message }}</p>
      </form>

      <p class="text-sm text-center mt-4">
        ليس لديك حساب؟ <router-link to="/register" class="text-yellow-400">إنشاء حساب</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const message = ref("");
const messageClass = ref("");
const loading = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    message.value = "يرجى إدخال جميع البيانات";
    messageClass.value = "text-red-500";
    return;
  }

  loading.value = true;

  try {
    const response = await fetch("https://api.ozex.site/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("خطأ من السيرفر:", errorText);

      try {
        const errorJson = JSON.parse(errorText);
        message.value = errorJson.error || "حدث خطأ أثناء تسجيل الدخول";
      } catch (e) {
        message.value = "حدث خطأ غير متوقع!";
      }

      messageClass.value = "text-red-500";
      return;
    }

    const result = await response.json();
    console.log("بيانات السيرفر:", result);

    if (!result.role || !result.token) {
      console.error("⚠️ بيانات المستخدم غير مكتملة!", result);
      message.value = "خطأ في تسجيل الدخول: بيانات المستخدم غير مكتملة!";
      messageClass.value = "text-red-500";
      return;
    }

    // ✅ تخزين البيانات بشكل صحيح
    localStorage.setItem("token", result.token);
    localStorage.setItem("role", result.role);
    localStorage.setItem("user", JSON.stringify({
  name: result.name,
  email: result.email,
  avatar: result.avatar || "",
  createdAt: new Date().toISOString() // ✅ وقت تسجيل الدخول الحالي
   }));

    message.value = "تم تسجيل الدخول بنجاح!";
    messageClass.value = "text-green-500";

    setTimeout(() => {
      router.push(result.role === "admin" ? "/admin" : "/profile");
    }, 1500);
  } catch (error) {
    console.error("خطأ أثناء الاتصال بالسيرفر:", error);
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
