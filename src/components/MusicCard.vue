<script setup lang="ts">
import type { Track } from '@/App.vue';
import { useQueueStore } from '@/stores/query';
import { defineProps } from 'vue';

interface MusicCardProps {
  track: Track;
  variant?: 'compact' | 'full' | 'line';
}

const props = defineProps<MusicCardProps>();
const variant = props.variant || 'full';

const queueStore = useQueueStore();

function handleClick() {
  queueStore.playNow(props.track);
}
</script>

<template>
  <div @click="handleClick">
    <div v-if="variant === 'full'" class="rounded-xl p-4 cursor-pointer hover:bg-[#2a2a2a]">
      <div class="w-52 h-52">
        <img :src="props.track.cover" alt="Album cover" class="object-cover rounded-xl" />
      </div>
      <h2 class="mt-3 text-lg font-semibold truncate">{{ props.track.name }}</h2>
      <p class="text-sm text-gray-400">{{ props.track.artiste }}</p>
    </div>
    <div v-else-if="variant === 'compact'" class="relative p-4 cursor-pointer w-52 h-52 rounded-xl">
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
    <div
      v-else-if="variant === 'line'"
      class="cursor-pointer hover:bg-[#2a2a2a] bg-[#33373B] w-full rounded-lg p-1 items-center grid grid-cols-4"
    >
      <div class="w-12 h-12 col-span-1">
        <img :src="props.track.cover" alt="Album cover" class="object-cover rounded-xl" />
      </div>
      <h2 class="flex justify-center col-span-1 text-lg font-semibold truncate">
        {{ props.track.name }}
      </h2>
      <p class="flex justify-center col-span-1 text-sm text-gray-400">{{ props.track.artiste }}</p>
      <i class="flex justify-end col-span-1 py-3 text-gray-400 bi bi-three-dots"></i>
    </div>
  </div>
</template>
