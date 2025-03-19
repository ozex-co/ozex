<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="admin-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}
.admin-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 16rem; /* لضمان ترك مساحة للسايدبار الثابت */
}
</style>
