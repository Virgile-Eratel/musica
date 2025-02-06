<script setup lang="ts">
import { useRouter } from 'vue-router';

interface PlaylistCardProps {
  cover: string;
  title: string;
  id: number;
  variant?: 'compact' | 'line';
}

const props = defineProps<PlaylistCardProps>();
const variant = props.variant || 'full';
const router = useRouter();
function navigateTo(target: string) {
  router.push(target);
}
</script>

<template>
  <div @click="navigateTo('/playlist/' + props.id)">
    <div
      v-if="variant === 'full'"
      class="relative overflow-hidden cursor-pointer w-52 h-52 rounded-xl"
    >
      <div class="relative w-full h-full">
        <img
          :src="props.cover"
          alt="Playlist cover"
          class="object-cover w-full h-full rounded-xl"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black rounded-xl"></div>
      </div>
      <div class="absolute bottom-0 left-0 p-4">
        <h2 class="text-lg font-semibold text-white truncate">{{ props.title }}</h2>
      </div>
    </div>
    <div v-else-if="variant === 'line'" class="flex items-center w-full6 cursor-pointer">
      <div class="w-32 h-32">
        <img
          :src="props.cover"
          alt="Playlist cover"
          class="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div class="flex-1 pl-4">
        <h2 class="text-lg font-semibold text-white truncate">{{ props.title }}</h2>
      </div>
    </div>
  </div>
</template>
