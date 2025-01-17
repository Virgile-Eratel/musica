<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="bg-[#1e2123] min-h-screen w-screen flex">
    <div class="fixed">
      <Sidebar />
    </div>
    <RouterView class="pl-10" />
  </div>
</template>
