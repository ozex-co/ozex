<template>
  <nav class="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-lg z-50 border-b border-emerald-500 shadow-lg">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <!-- إضافة شعار الشركة مع الاسم -->
      <router-link to="/" class="flex items-center">
        <img src="@/assets/images/logo2.png" alt="شعار الشركة" class="w-20 h-11 mr-2" />
        <span class="text-2xl font-bold text-emerald-400">OZEX</span>
      </router-link>
      
      <!-- القائمة الرئيسية لأجهزة الديسكتوب -->
      <ul class="hidden md:flex space-x-6">
        <li><router-link to="/" class="nav-link">الرئيسية</router-link></li>
        <li><router-link to="/services" class="nav-link">الخدمات</router-link></li>
        <li><router-link to="/orders" class="nav-link">الطلبات</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/login" class="nav-link">تسجيل الدخول</router-link></li>
        <li v-else><router-link to="/profile" class="nav-link">حسابي</router-link></li>
        <li v-if="isLoggedIn">
          <button @click="logout" class="nav-link cursor-pointer">تسجيل الخروج</button>
        </li>
      </ul>
      
      <!-- زر القائمة للأجهزة المحمولة -->
      <button @click="toggleMenu" class="md:hidden text-emerald-400 text-3xl">
        <i v-if="isOpen" class="fas fa-times"></i>
        <i v-else class="fas fa-bars"></i>
      </button>
    </div>

    <!-- القائمة الجانبية للهاتف -->
    <transition name="fade">
      <ul v-if="isOpen" class="mobile-menu">
        <li><router-link to="/" @click="toggleMenu" class="nav-link">الرئيسية</router-link></li>
        <li><router-link to="/services" @click="toggleMenu" class="nav-link">الخدمات</router-link></li>
        <li><router-link to="/orders" @click="toggleMenu" class="nav-link">الطلبات</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/login" @click="toggleMenu" class="nav-link">تسجيل الدخول</router-link></li>
        <li v-else><router-link to="/profile" @click="toggleMenu" class="nav-link">حسابي</router-link></li>
        <li v-if="isLoggedIn">
          <button @click="logout" class="nav-link cursor-pointer">تسجيل الخروج</button>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isLoggedIn: false, // الحالة الافتراضية
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    checkLoginStatus() {
      const token = localStorage.getItem("token");
      this.isLoggedIn = !!token;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.nav-link {
  @apply text-white hover:text-emerald-400 transition duration-300;
}
.mobile-menu {
  @apply absolute top-16 left-0 w-full bg-black/90 flex flex-col items-center py-4 space-y-4 text-white;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
