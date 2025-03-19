<template>
  <div class="p-6 bg-gray-900 min-h-screen">
    <!-- الهيدر المعدل -->
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
        إدارة الطلبات
      </h1>

      <!-- فلتر البحث مع تأثيرات جديدة -->
      <div class="flex gap-4 mb-8 items-center bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-700">
        <div class="relative flex-1">
          <input
            v-model="searchQuery"
            placeholder="ابحث عن طلب..."
            class="w-full px-6 py-3 bg-gray-700 rounded-xl border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100 placeholder-gray-400 transition-all"
          />
          <svg class="absolute left-4 top-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <select
          v-model="filterStatus"
          class="px-4 py-3 bg-gray-700 rounded-xl border border-gray-600 text-gray-100 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none min-w-[180px]"
        >
          <option value="">الكل</option>
          <option value="pending">قيد الانتظار</option>
          <option value="in progress">جاري التنفيذ</option>
          <option value="completed">مكتمل</option>
        </select>

        <button
          @click="showAddModal = true"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl font-medium text-gray-900 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          إضافة طلب
        </button>
      </div>

      <!-- جدول الطلبات المعدل -->
      <div class="overflow-hidden rounded-2xl border border-gray-700 shadow-2xl bg-gray-800/30 backdrop-blur-sm">
        <table class="w-full bg-gray-800/50 divide-y divide-gray-700">
          <thead class="bg-gray-700/50">
            <tr>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">#</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">الاسم</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">الخدمة</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">الميزانية</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">الحالة</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr
              v-for="(order, index) in filteredOrders"
              :key="order.id"
              class="hover:bg-gray-700/20 transition-colors"
            >
              <td class="px-6 py-4 text-gray-300">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-gray-100 font-medium">{{ order.name }}</td>
              <td class="px-6 py-4 text-gray-300">{{ order.service }}</td>
              <td class="px-6 py-4 text-cyan-400 font-medium">{{ order.budget }}</td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'bg-yellow-500/20 text-yellow-400': order.status === 'pending',
                    'bg-blue-500/20 text-blue-400': order.status === 'in progress',
                    'bg-green-500/20 text-green-400': order.status === 'completed'
                  }"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ statusLabel(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 space-x-3">
                <button
                  @click.stop="editOrder(order)"
                  class="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
                <button
                  @click.stop="deleteOrder(order.id)"
                  class="text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- حالة عدم وجود نتائج -->
        <div
          v-if="!filteredOrders.length"
          class="p-12 text-center text-gray-400 bg-gray-800/20"
        >
          <svg class="mx-auto w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
          لا توجد طلبات مطابقة
        </div>
      </div>
    </div>

    <!-- مودال الإضافة/التعديل -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="modal-content bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-xl p-6 transform transition-all">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-cyan-400">{{ editingOrder ? "تعديل الطلب" : "طلب جديد" }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="editingOrder ? updateOrder() : addOrder()" class="grid grid-cols-2 gap-4">
          <!-- العمود الأول -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
              <input
                v-model="newOrder.name"
                required
                class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
              <input
                v-model="newOrder.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">رقم الهاتف</label>
              <input
                v-model="newOrder.phone"
                required
                class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
              />
            </div>
          </div>

          <!-- العمود الثاني -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">الخدمة المطلوبة</label>
              <input
                v-model="newOrder.service"
                required
                class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">الميزانية</label>
              <input
                v-model="newOrder.budget"
                required
                class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">الحالة</label>
              <select
                v-model="newOrder.status"
                class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
              >
                <option value="pending">قيد الانتظار</option>
                <option value="in progress">جاري التنفيذ</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>
          </div>

          <!-- الحقول الكاملة العرض -->
          <div class="col-span-2 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">الوصف</label>
              <textarea
                v-model="newOrder.description"
                rows="3"
                class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">المرفقات</label>
              <div class="relative">
                <input
                  type="file"
                  @change="handleFileUpload"
                  class="w-full opacity-0 absolute z-20 cursor-pointer"
                />
                <div class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-between">
                  <span class="text-gray-400">{{ newOrder.attachment ? newOrder.attachment.name : 'اختر ملف...' }}</span>
                  <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- أزرار التأكيد -->
          <div class="col-span-2 flex gap-3 justify-end pt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2 text-gray-300 hover:text-gray-100 transition-colors"
            >
              إغلاق
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg font-medium transition-colors"
            >
              {{ editingOrder ? "تحديث" : "إضافة" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      orders: [],
      searchQuery: "",
      filterStatus: "",
      showAddModal: false,
      editingOrder: null,
      newOrder: {
        name: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        description: "",
        attachment: null,
        status: "pending"
      }
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order =>
        order.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (!this.filterStatus || order.status === this.filterStatus)
      );
    }
  },
  methods: {
    async fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://api.ozex.site/api/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.orders = res.data;
      } catch (error) {
        console.error("❌ خطأ في جلب الطلبات:", error);
      }
    },
    async addOrder() {
      try {
        const token = localStorage.getItem("token");
        await axios.post("https://api.ozex.site/api/orders", this.newOrder, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.closeModal();
        this.fetchOrders();
      } catch (error) {
        console.error("❌ خطأ أثناء إضافة الطلب:", error);
      }
    },
    async updateOrder() {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`https://api.ozex.site/api/orders/${this.editingOrder.id}`, this.newOrder, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.closeModal();
        this.fetchOrders();
      } catch (error) {
        console.error("❌ خطأ أثناء تحديث الطلب:", error);
      }
    },
    async deleteOrder(orderId) {
      if (!confirm("❗ هل أنت متأكد من حذف الطلب؟")) return;
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://api.ozex.site/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchOrders();
      } catch (error) {
        console.error("❌ خطأ أثناء حذف الطلب:", error);
      }
    },
    editOrder(order) {
      this.editingOrder = order;
      this.newOrder = { ...order };
      this.showAddModal = true;
    },
    handleFileUpload(event) {
      this.newOrder.attachment = event.target.files[0];
    },
    closeModal() {
      this.showAddModal = false;
      this.editingOrder = null;
      this.newOrder = { name: "", email: "", phone: "", service: "", budget: "", description: "", attachment: null, status: "pending" };
    },
    statusClass(status) {
      return {
        pending: "bg-yellow-500 text-black",
        "in progress": "bg-blue-500 text-white",
        completed: "bg-green-500 text-white"
      }[status] || "bg-gray-500 text-white";
    },
    statusLabel(status) {
      return {
        pending: 'قيد الانتظار',
        'in progress': 'جاري التنفيذ',
        completed: 'مكتمل'
      }[status]
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped>
.modal-content {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* تخصيص شريط التمرير */
::-webkit-scrollbar {
  width: 8px;
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
</style>
