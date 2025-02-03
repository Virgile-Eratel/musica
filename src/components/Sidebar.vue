<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(route: string) {
  router.push(route);
}
</script>

<template>
  <div class="px-2 py-8">
    <div class="flex flex-col items-center justify-center space-y-10">
      <i
        title="Accueil"
        @click="navigateTo('/')"
        class="text-4xl cursor-pointer bi bi-music-note-beamed"
      />
      <div
        class="flex flex-col items-center justify-center px-4 py-8 space-y-10 bg-black rounded-full"
      >
        <i
          title="Accueil"
          @click="navigateTo('/')"
          class="text-2xl cursor-pointer bi bi-house-door-fill"
        />
        <i
          title="Librairie"
          @click="navigateTo('/library')"
          class="text-2xl cursor-pointer bi bi-music-note-list"
        />
        <i class="text-2xl bi bi-boombox-fill" />
      </div>
      <div
        class="flex flex-col items-center justify-center px-4 py-8 space-y-10 bg-black rounded-full"
      >
        <i class="text-2xl bi bi-person-fill" />
        <i class="text-2xl bi bi-box-arrow-right" />
      </div>
    </div>
  </div>
</template>
