<script setup lang="ts">
import type { Track } from '@/App.vue';
import { useQueueStore } from '@/stores/query';
import { onMounted, ref } from 'vue';

interface MusicCardProps {
  track: Track;
  variant?: 'compact' | 'full' | 'line';
}

const props = defineProps<MusicCardProps>();
const variant = props.variant || 'full';

const queueStore = useQueueStore();

const isLiked = ref(false);
const storageKey = `liked_${props.track.id}`;

onMounted(() => {
  const storedLike = localStorage.getItem(storageKey);
  isLiked.value = storedLike === 'true';
});

function toggleLike(event: Event) {
  event.stopPropagation();
  isLiked.value = !isLiked.value;
  localStorage.setItem(storageKey, isLiked.value.toString());
}

function handleClick() {
  queueStore.playNow(props.track);
}
</script>

<template>
  <div @click="handleClick">
    <div v-if="variant === 'full'" class="rounded-xl p-4 cursor-pointer hover:bg-[#2a2a2a]">
      <div class="relative w-52 h-52">
        <img
          :src="props.track.cover"
          alt="Album cover"
          class="object-cover w-full h-full rounded-xl"
        />
        <button class="absolute text-xl text-white top-2 right-2" @click="toggleLike">
          <i :class="isLiked ? 'bi bi-heart-fill text-red-500' : 'bi bi-heart text-gray-400'"></i>
        </button>
      </div>
      <h2 class="mt-3 text-lg font-semibold truncate">{{ props.track.name }}</h2>
      <p class="text-sm text-gray-400">{{ props.track.artiste }}</p>
    </div>

    <div
      v-else-if="variant === 'compact'"
      class="relative overflow-hidden cursor-pointer w-52 h-52 rounded-xl"
    >
      <div class="relative">
        <img
          :src="props.track.cover"
          alt="Album cover"
          class="object-cover w-full h-auto rounded-xl"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black rounded-xl"></div>
        <button class="absolute text-xl text-white top-2 right-2" @click="toggleLike">
          <i :class="isLiked ? 'bi bi-heart-fill text-red-500' : 'bi bi-heart text-gray-400'"></i>
        </button>
      </div>
      <div class="absolute bottom-0 left-0 p-4">
        <h2 class="mt-3 text-lg font-semibold break-words">{{ props.track.name }}</h2>
        <p class="text-sm text-gray-400">{{ props.track.artiste }}</p>
      </div>
    </div>

    <div
      v-else-if="variant === 'line'"
      class="cursor-pointer hover:bg-[#2a2a2a] bg-[#33373B] w-full rounded-lg p-1 items-center grid grid-cols-5"
    >
      <div class="w-12 h-12 col-span-1">
        <img :src="props.track.cover" alt="Album cover" class="object-cover rounded-xl" />
      </div>
      <h2 class="flex justify-center col-span-2 text-lg font-semibold truncate">
        {{ props.track.name }}
      </h2>
      <p class="flex justify-center col-span-1 text-sm text-gray-400">{{ props.track.artiste }}</p>
      <button class="flex justify-end col-span-1 pr-2 text-xl text-gray-400" @click="toggleLike">
        <i :class="isLiked ? 'bi bi-heart-fill text-red-500' : 'bi bi-heart text-gray-400'"></i>
      </button>
    </div>
  </div>
</template>
