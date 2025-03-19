<template>
  <div class="min-h-screen bg-gray-900 text-white py-12">
    <div class="container mx-auto max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
      <div class="flex items-center space-x-4 border-b border-gray-700 pb-4">
        <img
          :src="user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name + '&background=10B981&color=fff'"
          alt="User Avatar"
          class="w-16 h-16 rounded-full border-2 border-emerald-400"
        />
        <div>
          <h1 class="text-2xl font-bold text-emerald-400">{{ user?.name }}</h1>
          <p class="text-gray-300 text-sm">📧 {{ user?.email }}</p>
          <p class="text-gray-400 text-xs mt-1">📅 تاريخ التسجيل: {{ formatDate(user?.createdAt) }}</p>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="text-xl font-semibold text-emerald-300">🛒 طلباتي</h2>
        <div v-if="orders.length === 0" class="text-gray-400 mt-2">ليس لديك أي طلبات حتى الآن.</div>
        <div v-else class="space-y-4 mt-4">
          <div
            v-for="order in orders"
            :key="order.id"
            class="bg-gray-700 p-4 rounded-lg border-l-4 border-emerald-400 shadow-md"
           dir="rtl">
            <p><strong>🔹 الطلب:</strong> {{ order.service }}</p>
            <p><strong>💰 السعر:</strong> ${{ order.budget }}</p>
            <p><strong>📅 تاريخ الطلب:</strong> {{ formatDate(order.createdAt) }}</p>
            <p><strong>🟢 الحالة:</strong> <span :class="statusClass(order.status)">{{ order.status }}</span></p>
          </div>
        </div>
      </div>

      <button
        @click="logout"
        class="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
      >
        تسجيل الخروج
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: null,
      orders: [],
    };
  },
  mounted() {
    this.loadUserData();
    this.fetchOrders();
  },
  methods: {
    loadUserData() {
      const userData = localStorage.getItem("user");
      if (userData) {
        this.user = JSON.parse(userData);
      }
    },
    async fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://api.ozex.site/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.orders = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("❌ فشل في جلب الطلبات:", error);
      }
    },
    formatDate(date) {
      if (!date) return "غير متوفر";
      return new Date(date).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
    },
    statusClass(status) {
      return status === "مكتمل"
        ? "text-green-400 font-bold"
        : status === "قيد التنفيذ"
        ? "text-yellow-400 font-bold"
        : "text-red-400 font-bold";
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>
