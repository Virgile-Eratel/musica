<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchModal from './SearchModal.vue';

const router = useRouter();
const route = useRoute();

function navigateTo(target: string) {
  router.push(target);
}

function isActive(target: string) {
  return route.path === target;
}

const homeIconClass = computed(() => (isActive('/') ? 'text-[#FACD66]' : 'text-white'));
const libraryIconClass = computed(() => (isActive('/library') ? 'text-[#FACD66]' : 'text-white'));
const PlaylistIconClass = computed(() =>
  isActive('/playlists') ? 'text-[#FACD66]' : 'text-white',
);

const searchModalVisible = ref(false);

function openSearchModal() {
  searchModalVisible.value = true;
}

function closeSearchModal() {
  searchModalVisible.value = false;
}
</script>

<template>
  <div class="px-2 py-8">
    <div class="flex flex-col items-center justify-center space-y-10">
      <i
        title="Accueil"
        @click="navigateTo('/')"
        class="text-4xl text-white cursor-pointer bi bi-music-note-beamed"
      />

      <div
        class="flex flex-col items-center justify-center px-4 py-8 space-y-10 bg-black rounded-full"
      >
        <i
          title="Accueil"
          @click="navigateTo('/')"
          :class="['text-2xl cursor-pointer bi bi-house-door-fill', homeIconClass]"
        />
        <i
          title="Librairie"
          @click="navigateTo('/library')"
          :class="['text-2xl cursor-pointer bi bi-music-note-list', libraryIconClass]"
        />

        <i
          title="Playlists"
          :class="['text-2xl cursor-pointer bi bi-boombox-fill', PlaylistIconClass]"
          @click="navigateTo('/playlists')"
        />
        <!--         <i title="Search" class="text-2xl cursor-pointer bi bi-search" @click="openSearchModal" />
 -->
      </div>

      <div
        class="flex flex-col items-center justify-center px-4 py-8 space-y-10 bg-black rounded-full"
      >
        <i class="text-2xl text-gray-400 bi bi-person-fill" />
        <i class="text-2xl text-gray-400 bi bi-box-arrow-right" />
      </div>
      <!--       <SearchModal :visible="searchModalVisible" @close="closeSearchModal" />
 -->
    </div>
  </div>
</template>
