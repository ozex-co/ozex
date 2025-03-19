<template>
  <footer class="bg-black text-center py-6 border-t border-emerald-500">
    <div class="container mx-auto px-4">
      <!-- وسائل التواصل الاجتماعي -->
      <div class="mb-4">
        <a href="https://facebook.com/ozex" target="_blank" rel="noopener noreferrer" class="text-white hover:text-blue-600 mx-2">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com/ozex" target="_blank" rel="noopener noreferrer" class="text-white hover:text-blue-400 mx-2">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com/ozex" target="_blank" rel="noopener noreferrer" class="text-white hover:text-pink-500 mx-2">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com/company/ozex" target="_blank" rel="noopener noreferrer" class="text-white hover:text-blue-700 mx-2">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
      <!-- روابط مهمة للسيو -->
      <p class="text-sm text-gray-400">
        &copy; 2025 OZEX. جميع الحقوق محفوظة.
        <a href="/privacy-policy" class="underline hover:text-white">سياسة الخصوصية</a> |
        <a href="/terms-of-service" class="underline hover:text-white">شروط الخدمة</a>
      </p>
      <!-- بيانات Schema بسيطة لتعزيز السيو -->
      <div class="mt-2 text-xs text-gray-500">
        <meta itemprop="name" content="OZEX">
        <meta itemprop="description" content="OZEX - حلول مبتكرة لتطوير الويب والتجارة الإلكترونية">
        <meta itemprop="url" content="https://ozex.com">
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/* تأكد من تحميل Font Awesome في مشروعك، أو استخدم مكتبة أيقونات أخرى */
</style>
