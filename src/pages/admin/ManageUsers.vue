<template>
 <PasswordProtection v-slot="{ role: userRole, hasPermission }">
  <div class="admin-users-page bg-gray-900 min-h-screen">
    <!-- الهيدر المعدل -->
    <header class="hero-section bg-gradient-to-br from-gray-800 to-gray-900 border-b border-cyan-500/20">
      <div class="container mx-auto px-4 py-24 text-center relative">
        <div class="absolute inset-0 bg-[url('@/assets/images/dark-grid.svg')] opacity-20"></div>
        <h1 class="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          إدارة المستخدمين
        </h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          تحكم كامل في مستخدمي النظام مع واجهة إدارة قوية ومتكاملة
        </p>
      </div>
    </header>

    <!-- فلتر البحث مع تأثيرات جديدة -->
    <div class="search-filter bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
      <div class="container mx-auto px-4 py-6 flex gap-4 justify-center">
        <div class="relative flex-1 max-w-xl">
          <input
            v-model="searchQuery"
            placeholder="ابحث بالاسم أو البريد..."
            class="w-full px-6 py-3 bg-gray-700 rounded-xl border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100 placeholder-gray-400 transition-all"
          >
          <svg class="absolute right-4 top-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <select
          v-model="roleFilter"
          class="px-4 py-3 bg-gray-700 rounded-xl border border-gray-600 text-gray-100 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none"
        >
          <option value="">جميع الصلاحيات</option>
          <option value="user">مستخدم عادي</option>
          <option value="admin">مدير النظام</option>
        </select>
      </div>
    </div>

    <!-- الجدول مع تصميم أكثر حداثة -->
    <div class="users-table container mx-auto px-4 py-12">
      <div class="flex justify-end mb-6">
        <button
         v-if="hasPermission('admin')"
          @click="openAddUserModal"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl font-medium text-gray-900 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          إضافة مستخدم جديد
        </button>
      </div>

      <div class="overflow-hidden rounded-2xl border border-gray-700 shadow-2xl">
        <table class="w-full bg-gray-800 divide-y divide-gray-700">
          <thead class="bg-gray-700/50">
            <tr>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">الاسم</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">البريد الإلكتروني</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">الصلاحية</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-gray-700/20 transition-colors"
            >
              <td class="px-6 py-4 text-gray-100 font-medium">{{ user.name }}</td>
              <td class="px-6 py-4 text-gray-300">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'bg-green-500/20 text-green-400': user.role === 'user',
                    'bg-cyan-500/20 text-cyan-400': user.role === 'admin'
                  }"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ user.role === 'admin' ? 'مدير النظام' : 'مستخدم عادي' }}
                </span>
              </td>
              <td class="px-6 py-4 space-x-3">
                <button
                  @click="openEditUserModal(user)"
                  class="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
                <button
                v-if="hasPermission('admin')"
                  @click="openDeleteConfirmation(user.id)"
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

        <!-- حالة عدم وجود مستخدمين -->
        <div
          v-if="!filteredUsers.length"
          class="p-12 text-center text-gray-400 bg-gray-800/50"
        >
          <svg class="mx-auto w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
          لا توجد نتائج مطابقة
        </div>
      </div>
    </div>

    <!-- مودال إضافة مستخدم -->
    <div v-if="isAddUserModalOpen" class="modal fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="modal-content bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md p-6 transform transition-all">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-cyan-400">إضافة مستخدم جديد</h2>
          <button @click="closeAddUserModal" class="text-gray-400 hover:text-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="addUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
            <input
              v-model="newUser.name"
              required
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
            <input
              v-model="newUser.email"
              required
              type="email"
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">كلمة السر</label>
            <input
              v-model="newUser.password"
              required
              type="password"
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">الدور</label>
            <select
              v-model="newUser.role"
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            >
              <option value="user">مستخدم عادي</option>
              <option value="admin">مدير النظام</option>
            </select>
          </div>

          <div class="flex gap-3 justify-end pt-6">
            <button
              type="button"
              @click="closeAddUserModal"
              class="px-6 py-2 text-gray-300 hover:text-gray-100 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg font-medium transition-colors"
            >
              تأكيد الإضافة
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- مودال تأكيد الحذف -->
    <div v-if="isDeleteConfirmationOpen" class="modal fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="modal-content bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md p-6 transform transition-all">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-cyan-400">تأكيد الحذف</h2>
          <button @click="closeDeleteConfirmation" class="text-gray-400 hover:text-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="confirmDelete" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">كلمة السر</label>
            <input
              v-model="deletePassword"
              type="password"
              required
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            >
          </div>

          <div class="flex gap-3 justify-end pt-6">
            <button
              type="button"
              @click="closeDeleteConfirmation"
              class="px-6 py-2 text-gray-300 hover:text-gray-100 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-red-500 hover:bg-red-400 text-gray-900 rounded-lg font-medium transition-colors"
            >
              تأكيد الحذف
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- مودال تعديل المستخدم -->
    <div v-if="isEditUserModalOpen" class="modal fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="modal-content bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md p-6 transform transition-all">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-cyan-400">تعديل المستخدم</h2>
          <button @click="closeEditUserModal" class="text-gray-400 hover:text-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="updateUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
            <input
              v-model="selectedUser.name"
              required
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">البريد الإلكتروني</label>
            <input
              v-model="selectedUser.email"
              required
              type="email"
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">الدور</label>
            <select
              v-model="selectedUser.role"
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            >
              <option value="user">مستخدم عادي</option>
              <option value="admin">مدير النظام</option>
            </select>
          </div>

          <div class="flex gap-3 justify-end pt-6">
            <button
              type="button"
              @click="closeEditUserModal"
              class="px-6 py-2 text-gray-300 hover:text-gray-100 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg font-medium transition-colors"
            >
              تأكيد التعديل
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </PasswordProtection>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import PasswordProtection from "@/components/PasswordProtection.vue";


// بيانات المستخدمين
const users = ref([]);
const searchQuery = ref("");
const roleFilter = ref("");
const newUser = ref({
  name: "",
  email: "",
  password: "",
  role: "user",
});

const selectedUser = ref({
  id: null,
  name: "",
  email: "",
  password: "",
  role: "user",
});

const isAddUserModalOpen = ref(false);
const isEditUserModalOpen = ref(false);
const isDeleteConfirmationOpen = ref(false);
const deletePassword = ref("");
const userIdToDelete = ref(null);

// جلب جميع المستخدمين
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://api.ozex.site/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    users.value = data.users;
  } catch (error) {
    console.error("❌ فشل جلب المستخدمين:", error);
  }
};

// فتح نافذة إضافة مستخدم
const openAddUserModal = () => {
  isAddUserModalOpen.value = true;
};

// إغلاق نافذة إضافة مستخدم
const closeAddUserModal = () => {
  isAddUserModalOpen.value = false;
  newUser.value = {
    name: "",
    email: "",
    password: "",
    role: "user",
  };
};

// إضافة مستخدم
const addUser = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(JSON.stringify(newUser.value))
    const response = await fetch("https://api.ozex.site/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newUser.value),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    await fetchUsers();
    closeAddUserModal();
  } catch (error) {
    console.error("❌ فشل إضافة المستخدم:", error);
  }
};

// فتح نافذة تعديل مستخدم
const openEditUserModal = (user) => {
  selectedUser.value = { ...user };
  isEditUserModalOpen.value = true;
};

// إغلاق نافذة تعديل مستخدم
const closeEditUserModal = () => {
  isEditUserModalOpen.value = false;
  selectedUser.value = {
    id: null,
    name: "",
    email: "",
    password: "",
    role: "user",
  };
};

// تعديل مستخدم
const updateUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://api.ozex.site/api/users/${selectedUser.value.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(selectedUser.value),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    await fetchUsers();
    closeEditUserModal();
  } catch (error) {
    console.error("❌ فشل تعديل المستخدم:", error);
  }
};

// فتح نافذة تأكيد الحذف
const openDeleteConfirmation = (userId) => {
  userIdToDelete.value = userId;
  isDeleteConfirmationOpen.value = true;
};

// إغلاق نافذة تأكيد الحذف
const closeDeleteConfirmation = () => {
  isDeleteConfirmationOpen.value = false;
  deletePassword.value = "";
  userIdToDelete.value = null;
};

// تأكيد الحذف
const confirmDelete = async () => {
  const userToDelete = users.value.find(user => user.id === userIdToDelete.value);

  if (userToDelete.role === "admin" && deletePassword.value !== "OmAr@20$10@admin") {
    alert("كلمة السر غير صحيحة لحذف مدير النظام");
    return;
  }

  if (userToDelete.role === "user" && deletePassword.value !== "OmAr@20$10") {
    alert("كلمة السر غير صحيحة لحذف مستخدم عادي");
    return;
  }

  await deleteUser(userIdToDelete.value);
  closeDeleteConfirmation();
};

// حذف مستخدم
const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://api.ozex.site/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    await fetchUsers();
  } catch (error) {
    console.error("❌ فشل حذف المستخدم:", error);
  }
};

// جلب المستخدمين عند تحميل الصفحة
onMounted(fetchUsers);

// فلترة المستخدمين بناءً على البحث والدور
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearchQuery =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = roleFilter.value ? user.role === roleFilter.value : true;
    return matchesSearchQuery && matchesRole;
  });
});
</script>


<style scoped>
/* التصميم مثل السابق مع إضافة تنسيقات إضافية */
  .admin-users-page {
  padding: 20px;

  background-color: #1a1a1a;
  color: white;
}
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(8, 145, 178, 0.1) 0%, rgba(6, 78, 59, 0) 100%);
  pointer-events: none;
}

.modal-content {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

table {
  background: radial-gradient(ellipse at top, rgba(6, 78, 59, 0.1), transparent),
              radial-gradient(ellipse at bottom, rgba(8, 145, 178, 0.1), transparent);
}
.hero {
  position: relative;
  overflow: hidden;
}

.hero h1 {
  color: #00bcd4; /* الساين */
}

.users-table {
  margin-top: 20px;
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
  text-align: center;
}

th {
  background-color: #333;
  color: #00bcd4; /* الساين */
}

tr:nth-child(even) {
  background-color: #444;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background: #2a2a2a;
  color: white;
  border: 1px solid #444;
  outline: none;
}

button {
  padding: 10px 20px;
  margin:6px;
  background-color: #00bcd4; /* الساين */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #008ba3;
}


.input-search, .input-filter {
  width: 200px;
  padding: 10px;
  margin: 0 10px;
  border-radius: 8px;
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: white;
  outline: none;
}

.input-search::placeholder, .input-filter {
  color: #888;
}

.btn-add-user, .btn-submit, .btn-edit, .btn-delete, .btn-cancel {
  padding: 10px 20px;
  margin: 10px;
  background-color: #4CAF50;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>
