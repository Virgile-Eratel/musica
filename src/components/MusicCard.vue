<script setup lang="ts">
import type { Track } from '@/views/HomeView.vue';
import { defineProps, inject } from 'vue';

interface MusicCardProps {
  track: Track;
  variant?: 'compact' | 'full' | 'line';
}

const props = defineProps<MusicCardProps>();
const variant = props.variant || 'full';
</script>

<template>
  <div
    v-if="variant === 'full'"
    class="bg-[#1f1f1f] rounded-xl p-4 cursor-pointer hover:bg-[#2a2a2a]"
  >
    <img :src="props.track.cover" alt="Album cover" class="object-cover w-full h-auto rounded-xl" />
    <h2 class="mt-3 text-lg font-semibold truncate">{{ props.track.name }}</h2>
    <p class="text-sm text-gray-400">{{ props.track.artiste }}</p>
  </div>
  <div v-else-if="variant === 'compact'" class="relative p-4 cursor-pointer rounded-xl">
    <div class="relative">
      <img
        :src="props.track.cover"
        alt="Album cover"
        class="object-cover w-full h-auto rounded-xl"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black rounded-xl"></div>
    </div>
    <div class="absolute bottom-0 left-0 p-8">
      <h2 class="mt-3 text-lg font-semibold truncate">{{ props.track.name }}</h2>
      <p class="text-sm text-gray-400">{{ props.track.artiste }}</p>
    </div>
  </div>
</template>
