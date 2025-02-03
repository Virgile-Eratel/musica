<script setup lang="ts">
import type { Track } from '@/App.vue';
import { useQueueStore } from '@/stores/query';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const queueStore = useQueueStore();

const currentTrack = computed<Track | null>(() => queueStore.currentTrack);

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);

let audioElement: HTMLAudioElement | null = null;

function setupAudio() {
  if (!currentTrack.value) return;
  audioElement = new Audio(currentTrack.value.mp3);
  audioElement.volume = volume.value;
  audioElement.addEventListener('timeupdate', handleTimeUpdate);
  audioElement.addEventListener('ended', handleNextTrack);
  if (isPlaying.value) {
    audioElement.play();
  }
}

function cleanupAudio() {
  if (audioElement) {
    audioElement.pause();
    audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    audioElement.removeEventListener('ended', handleNextTrack);
    audioElement = null;
  }
}

onMounted(() => {
  setupAudio();
});

onUnmounted(() => {
  cleanupAudio();
});

// watch changements de musique dans le store
watch(currentTrack, (newTrack, oldTrack) => {
  cleanupAudio();
  setupAudio();
  if (newTrack) {
    audioElement?.play();
    isPlaying.value = true;
  }
});

function togglePlay() {
  if (!audioElement) return;
  if (audioElement.paused) {
    audioElement.play();
    isPlaying.value = true;
  } else {
    audioElement.pause();
    isPlaying.value = false;
  }
}

function handleNextTrack() {
  queueStore.playNext();
}

function handlePrevTrack() {
  queueStore.playPrevious();
}

function handleTimeUpdate() {
  if (!audioElement) return;
  currentTime.value = audioElement.currentTime;
  duration.value = audioElement.duration;
}

function seek(event: Event) {
  if (!audioElement) return;
  const input = event.target as HTMLInputElement;
  audioElement.currentTime = parseFloat(input.value);
}

function handleVolume(event: Event) {
  if (!audioElement) return;
  const input = event.target as HTMLInputElement;
  const vol = parseFloat(input.value);
  volume.value = vol;
  audioElement.volume = vol;
}

function formatTime(time: number) {
  if (isNaN(time)) {
    return '0:00';
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}
</script>

<template>
  <div class="w-full h-[2px] backdrop-blur-xl"></div>
  <div class="z-50 flex items-center w-full h-20 px-6 shadow-lg backdrop-blur-lg shadow-black/50">
    <div class="flex items-center w-1/4 min-w-[200px]">
      <img :src="currentTrack?.cover" alt="cover" class="object-cover mr-3 rounded-md w-14 h-14" />
      <div class="flex flex-col">
        <span class="text-sm font-semibold">
          {{ currentTrack?.name }}
        </span>
        <span class="text-xs text-gray-400">
          {{ currentTrack?.artiste }}
        </span>
      </div>
    </div>

    <!-- Contrôles -->
    <div class="flex items-center justify-center flex-1 gap-6">
      <button @click="handlePrevTrack" class="hover:text-yellow-400">
        <i class="text-2xl bi bi-chevron-left" />
      </button>
      <button @click="togglePlay" class="hover:text-yellow-400">
        <i v-if="!isPlaying" class="text-2xl bi bi-play-fill" />
        <i v-else class="text-2xl bi bi-pause" />
      </button>
      <button @click="handleNextTrack" class="hover:text-yellow-400">
        <i class="text-2xl bi bi-chevron-right" />
      </button>
    </div>

    <!-- Barre de progression -->
    <div class="flex flex-col items-center w-1/3">
      <div class="flex items-center w-full gap-2">
        <span class="w-10 text-xs text-right text-gray-400">
          {{ formatTime(currentTime) }}
        </span>
        <input
          type="range"
          class="w-full player-range"
          :max="duration"
          :value="currentTime"
          @input="seek"
        />
        <span class="w-10 text-xs text-gray-400">
          {{ formatTime(duration) }}
        </span>
      </div>
    </div>

    <!-- Volume -->
    <div class="flex items-center justify-end w-1/4 gap-2">
      <i v-if="volume === 0" class="text-2xl bi bi-volume-mute-fill" />
      <i v-if="volume > 0.01 && volume < 0.5" class="text-2xl bi bi-volume-down-fill" />
      <i v-if="volume >= 0.5 && volume <= 1" class="text-2xl bi bi-volume-up-fill" />
      <input
        type="range"
        class="w-24 player-range"
        step="0.01"
        min="0"
        max="1"
        :value="volume"
        @input="handleVolume"
      />
    </div>
  </div>
</template>
