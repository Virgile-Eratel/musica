<script setup lang="ts">
const props = defineProps<{
  id: number;
  name: string;
  artiste: string;
  album?: string;
  duration: string;
  cover: string;
  mp3: string;
}>();
console.log(props.mp3);
</script>

<template>
  <div class="flex flex-col w-32 space-y-2">
    <!-- Affichage de la couverture de l'album -->
    <img v-if="props.cover" :src="props.cover" alt="Album Cover" class="rounded-lg" />

    <!-- Informations sur le morceau -->
    <div class="flex flex-wrap">
      <h2 class="font-bold text-gray-50">{{ props.name }}</h2>
      <p class="text-gray-100">
        {{ props.artiste }} <span v-if="props.album">- {{ props.album }}</span>
      </p>
    </div>

    <!-- Durée du morceau -->
    <p>{{ props.duration }}</p>

    <!-- Lecteur audio -->
    <audio :src="`${props.mp3}`" controls class="w-full">
      Votre navigateur ne supporte pas l'élément <code>audio</code>.
    </audio>
  </div>
</template>
