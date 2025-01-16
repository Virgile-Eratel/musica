<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="bg-[#1e2123] min-h-screen w-min-screen">
    <Sidebar />
    <RouterView />
  </div>
</template>
