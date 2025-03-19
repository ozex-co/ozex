<template>
    <button class="btn" :class="variant" @click="$emit('click')">
      <slot />
    </button>
  </template>
  
  <script>
  export default {
    props: { variant: { type: String, default: "primary" } },
  };
  </script>
  
  <style scoped>
  .btn {
    @apply px-4 py-2 rounded-lg font-bold transition duration-300;
  }
  .primary {
    @apply bg-emerald-500 hover:bg-emerald-600 text-white;
  }
  .secondary {
    @apply bg-gray-700 hover:bg-gray-800 text-white;
  }
  </style>
  