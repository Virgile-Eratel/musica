<script setup lang="ts">
import type { Track } from '@/views/HomeView.vue';
import { onMounted, onUnmounted, ref } from 'vue';

interface PlayerProps {
  tracks: Track[];
}

const props = defineProps<PlayerProps>();

// État interne du lecteur
const currentTrackIndex = ref<number>(0);
const isPlaying = ref<boolean>(false);
const currentTime = ref<number>(0);
const duration = ref<number>(0);
const volume = ref<number>(1);

// Élément audio
let audioElement: HTMLAudioElement | null = null;

// Lifecycle
onMounted(() => {
  audioElement = new Audio(props.tracks[currentTrackIndex.value].mp3);
  audioElement.volume = volume.value;

  // Gestion des événements
  audioElement.addEventListener('timeupdate', handleTimeUpdate);
  audioElement.addEventListener('ended', handleNextTrack);
});

onUnmounted(() => {
  // Nettoyer les écouteurs d'événements
  audioElement?.removeEventListener('timeupdate', handleTimeUpdate);
  audioElement?.removeEventListener('ended', handleNextTrack);
});

// Méthodes principales
function playTrack(index: number) {
  if (!audioElement) return;

  // Mettre à jour la piste actuelle
  currentTrackIndex.value = index;

  // Configurer la source audio
  audioElement.src = props.tracks[index].mp3;
  audioElement.currentTime = 0;
  audioElement.play();
  isPlaying.value = true;
}

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
  const nextIndex = (currentTrackIndex.value + 1) % props.tracks.length;
  playTrack(nextIndex);
}

function handlePrevTrack() {
  const prevIndex = (currentTrackIndex.value + props.tracks.length - 1) % props.tracks.length;
  playTrack(prevIndex);
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

// Exposez les méthodes pour que le parent puisse y accéder
defineExpose({
  playTrack,
  handleNextTrack,
});
</script>

<template>
  <div class="w-full h-20 bg-[#1e1e1e] flex items-center px-6 shadow-md z-50">
    <!-- Piste actuelle -->
    <div class="flex items-center w-1/4 min-w-[200px]">
      <img
        :src="props.tracks[currentTrackIndex].cover"
        alt="cover"
        class="object-cover mr-3 rounded-md w-14 h-14"
      />
      <div class="flex flex-col">
        <span class="text-sm font-semibold">
          {{ props.tracks[currentTrackIndex].name }}
        </span>
        <span class="text-xs text-gray-400">
          {{ props.tracks[currentTrackIndex].artiste }}
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
      <i v-if="volume > 0.5 && volume <= 1" class="text-2xl bi bi-volume-up-fill" />
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
