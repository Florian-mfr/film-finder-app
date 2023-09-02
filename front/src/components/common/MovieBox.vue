<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Props
const { movie } = defineProps<{
  movie: any
}>()
const hovered = ref(false)
function getStarClass(star: number, rating: number) {
  const decimalPart = (rating * 10) % 5;
  const roundBonus = decimalPart >= 3 ? 5 : 0;
  const roundedRating = ((rating * 10 + roundBonus) - decimalPart) / 10;
  if (star <= roundedRating) {
    return 'fas fa-star'; // Classe pour étoile pleine
  } else if (star - 0.5 === roundedRating) {
    return 'fas fa-star-half-alt'; // Classe pour étoile partiellement remplie
  } else {
    return 'far fa-star'; // Classe pour étoile vide
  }
}
</script>

<template>
  <div class="container_movie" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <div class="movie_overlay" :class="{ 'hovered': hovered }">
      <span class="text-centered margin-top-2 is-5">Réalisateur : {{ movie.director }}</span>
      <span class="text-centered margin-top-2 is-5">Acteurs: {{ movie.actors.join(', ') }}</span>
      <span class="text-centered margin-top-2 is-5">{{ movie.synopsis }}</span>
    </div>
    <img :src="`https://wiflix.voto${movie.image}`" alt="" class="movie_img">
    <div class="movie_info">
      <span class="text-centered text-underlined is-3 text-bold">{{ movie.title }}</span>
      <span>{{ movie.year }} - {{ movie.quality }}</span>
      <span class="text-centered is-5">{{ movie.genres.join(', ') }}</span>
      <div class="flex-center" v-if="movie.rating && movie.rating.score">
        <FontAwesomeIcon
          v-for="star in 5" :key="star"
          :icon="getStarClass(star, movie.rating.score)"
          class="" />
      </div>
      <span v-if="movie.rating && movie.rating.score" class="margin-left-2 is-5">{{ movie.rating.score }}/5 - ({{movie.rating.voters }} votes)</span>
    </div>
  </div>
</template>

<style scoped>
.container_movie {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  background-color: #b4b055;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
  height: 500px;
  z-index: 1;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.container_movie:hover {
  transform: scale(1.15);
  z-index: 10;
}

.movie_img {
  width: auto;
  height: 350px;
  border-radius: 3px;
}

.movie_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 150px;
  color: #0E273C;
}

.movie_rating {
  width: 100%;
}

.movie_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: top;
  padding: 10px;
  opacity: 0;
  z-index: 10;
  transition: opacity 0.5s ease;
}

.movie_overlay.hovered {
  opacity: 0.8;
  z-index: 10;
}
</style>
