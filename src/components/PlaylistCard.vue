<script setup lang="ts">
import type { PlaylistType } from '@/App.vue';
import { useRouter } from 'vue-router';

interface PlaylistCardProps {
  playlist: PlaylistType;
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
  <div @click="navigateTo('/playlist/' + props.playlist.id)">
    <div
      v-if="variant === 'full'"
      class="relative overflow-hidden cursor-pointer w-52 h-52 rounded-xl"
    >
      <div class="relative w-full h-full">
        <img
          :src="props.playlist.cover"
          alt="Playlist cover"
          class="object-cover w-full h-full rounded-xl"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black rounded-xl"></div>
      </div>
      <div class="absolute bottom-0 left-0 p-4">
        <h2 class="text-lg font-semibold text-white truncate">{{ props.playlist.title }}</h2>
      </div>
    </div>
    <div v-else-if="variant === 'line'" class="flex items-end cursor-pointer w-full6">
      <div class="w-32 h-32">
        <img
          :src="props.playlist.cover"
          alt="Playlist cover"
          class="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div class="flex-1 pl-4">
        <h2 class="text-lg font-semibold text-white truncate">{{ props.playlist.title }}</h2>
        <p class="text-gray-300">{{ props.playlist.tracksId.length }} musiques</p>
      </div>
    </div>
  </div>
</template>
