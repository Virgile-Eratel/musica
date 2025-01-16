<script setup lang="ts">
defineProps<{
  id: number;
  name: string;
  artiste: string;
  album?: string;
  duration: string;
  cover: string;
}>();
</script>

<template>
  <div class="flex flex-col w-32 space-y-2">
    <img v-if="cover" :src="cover" alt="Album Cover" class="rounded-lg" />
    <div class="flex flex-wrap">
      <h2 class="font-bold text-gray-50">{{ name }}</h2>
      <p class="text-gray-100">{{ artiste }} - {{ album }}</p>
    </div>
    <p>{{ duration }}</p>
  </div>
</template>
