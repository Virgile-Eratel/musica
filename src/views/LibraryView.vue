<script setup lang="ts">
import type { Track } from '@/App.vue';
import MusicCard from '@/components/MusicCard.vue';
import data from '@/Data/data.json';
import { useQueueStore } from '@/stores/query';
import { computed, ref, watch } from 'vue';

const tracks = ref<Track[]>(data as Track[]);

const selectedTab = ref<'all' | 'liked'>('all');

const likedTracks = ref<Track[]>([]);

const queueStore = useQueueStore();
function updateLikedTracks() {
  likedTracks.value = tracks.value.filter(
    (track) => localStorage.getItem(`liked_${track.id}`) === 'true',
  );
}

updateLikedTracks();

watch(selectedTab, (newTab) => {
  if (newTab === 'liked') {
    updateLikedTracks();
  }
});

window.addEventListener('storage', (event) => {
  if (event.key?.startsWith('liked_')) {
    updateLikedTracks();
  }
});

const displayedTracks = computed(() => {
  return selectedTab.value === 'liked' ? likedTracks.value : tracks.value;
});

function selectTab(tab: 'all' | 'liked') {
  selectedTab.value = tab;
  if (tab === 'liked') {
    updateLikedTracks();
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white w-full">
    <div class="my-4 ml-12">
      <div class="flex gap-4 mb-6">
        <button
          @click="selectTab('all')"
          :class="selectedTab === 'all' ? 'bg-[#FACD66] text-black' : 'bg-gray-700'"
          class="px-4 py-2 font-semibold transition-colors rounded-lg"
        >
          Ma Collection
        </button>
        <button
          @click="selectTab('liked')"
          :class="selectedTab === 'liked' ? 'bg-[#FACD66] text-black' : 'bg-gray-700'"
          class="px-4 py-2 font-semibold transition-colors rounded-lg"
        >
          Titres Likés
        </button>
      </div>

      <h1 class="text-xl font-semibold">
        {{ selectedTab === 'liked' ? 'Titres Likés' : 'Ma Collection' }}
      </h1>
    </div>

    <div class="flex flex-wrap w-full gap-6 px-8 pt-8 pb-16">
      <MusicCard
        @click="
          queueStore.playPlaylist(displayedTracks);
          queueStore.playNow(track);
        "
        v-for="track in displayedTracks"
        :key="track.id"
        :track="track"
        :variant="'compact'"
      />
    </div>
  </div>
</template>
