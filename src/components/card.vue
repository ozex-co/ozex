<template>
    <div class="card">
      <slot />
    </div>
  </template>
  
  <style scoped>
  .card {
    @apply p-6 bg-black border border-emerald-500 rounded-xl shadow-lg transition hover:shadow-2xl;
  }
  </style>
  