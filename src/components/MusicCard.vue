<script setup lang="ts">
import { defineProps, inject } from 'vue';

const props = defineProps<{
  id: number;
  name: string;
  artiste: string;
  album?: string;
  cover: string;
  mp3: string;
}>();

const setCurrentTrack = inject<(mp3: string) => void>('setCurrentTrack');

function handlePlay() {
  if (setCurrentTrack) {
    setCurrentTrack(props.mp3);
  }
}
</script>

<template>
  <div class="flex flex-col w-32 space-y-2" @click="handlePlay">
    <img v-if="cover" :src="cover" alt="Album Cover" class="rounded-lg" />
    <div class="flex flex-wrap">
      <h2 class="font-bold text-gray-50">{{ name }}</h2>
      <p class="text-gray-100">
        {{ artiste }}<span v-if="album"> - {{ album }}</span>
      </p>
    </div>
  </div>
</template>
