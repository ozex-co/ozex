<template>
  <div v-if="isAuthenticated">
    <slot :role="userRole" :hasPermission="hasPermission" />
  </div>
  <div v-else class="fixed inset-0 bg-gray-900 flex items-center justify-center p-4">
    <div class="bg-gray-800 p-8 rounded-2xl border border-gray-700 max-w-md w-full text-center">
      <h2 class="text-2xl font-bold text-cyan-400 mb-4">مطلوب كلمة مرور</h2>
      <p class="text-gray-300 mb-6">يجب إدخال كلمة المرور للوصول إلى هذه الصفحة.</p>

      <input
        v-model="password"
        type="password"
        placeholder="كلمة المرور"
        class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100 mb-4"
      />

      <button
        @click="checkPassword"
        class="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg font-medium transition-colors"
      >
        تأكيد
      </button>

      <p v-if="error" class="text-red-400 mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const password = ref("");
const error = ref("");
const isAuthenticated = ref(localStorage.getItem("isAuthenticated") === "true");
const userRole = ref(localStorage.getItem("userRole") || ""); // تغيير الاسم إلى userRole

const checkPassword = () => {
  const passwords = {
    "omar@ozex": "admin", // جميع الصلاحيات
    "admin@ozex": "editor", // قراءة، إضافة، تعديل
    "viewer@ozex": "viewer", // قراءة فقط
  };

  if (passwords[password.value]) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", passwords[password.value]); // تغيير الاسم إلى userRole
    isAuthenticated.value = true;
    userRole.value = passwords[password.value];
  } else {
    error.value = "كلمة المرور غير صحيحة!";
  }
};

// دالة للتحقق من الصلاحية
const hasPermission = (requiredRole) => {
  return userRole.value === requiredRole; // استخدام userRole بدلًا من role
};
</script>
