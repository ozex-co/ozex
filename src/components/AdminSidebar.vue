<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>OZEX Panel</h2>
    </div>
    <ul>
      <li v-for="link in links" :key="link.to">
        <router-link :to="link.to" class="sidebar-link">{{ link.label }}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
 data() {
  return {
    links: [
      { to: "/admin", label: "لوحة التحكم" },
      { to: "/admin/users", label: "إدارة المستخدمين" },
      { to: "/admin/orders", label: "إدارة الطلبات" },
      { to: "/admin/services", label: "إدارة المقالات" },
      { to: "/admin/finance", label: "الحسابات" }
    ],
  };
},

};
</script>

<style scoped>
.sidebar {
  @apply fixed left-0 top-0 h-full w-64 bg-black text-white shadow-lg flex flex-col z-50;
}
.sidebar-header {
  @apply p-6 text-center border-b border-emerald-500 text-2xl font-bold text-emerald-400;
}
.sidebar-link {
  @apply block py-3 px-6 text-white hover:bg-emerald-500 transition duration-300;
}
</style>
