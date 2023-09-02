<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import SearchInput from "../common/SearchInput.vue";
import SelectInput from "../common/SelectInput.vue";
import MovieBox from "../common/MovieBox.vue";
import Pagination from "../common/Pagination.vue";
import Sort from "../common/Sort.vue";
import { BaseApiService } from '../../services/base-api.service'
import { GENRES, QUALITY, VERSION } from '../../utils/constants'

let movies = ref<any>([]);
let total = ref<number>(1);
let page = ref<number>(1);
const selectedGenres = ref<string[]>([]);
const selectedQuality = ref<string[]>([]);
const selectedVersion = ref<string[]>([]);
const loading = ref<boolean>(false);

async function searchRequest() {
  loading.value = true
  try {
  const data = await BaseApiService.get('film', {
    filter,
    sort
  })
  movies = data.films
  total = data.total
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

function resetPage() {
  page.value = 1
}

const search = ref<string>("");

const filter = ref<any>({
  genres: selectedGenres,
  origins: [],
  version: selectedVersion,
  quality: selectedQuality,
  years: [],
  title: search,
  actors: search,
  director: search,
  page: page
});

const sort = ref<{type: 'alphabetical' | 'note' | 'date'; order: 'asc' | 'desc'}>({
  type: "date",
  order: "desc"
});
onMounted(async () => {
  await searchRequest();
});

watch(filter, async () => {
  await searchRequest()
})
watch(search, async () => {
  page.value = 1
  await searchRequest()
})
watch(page, async () => {
  await searchRequest()
})
</script>

<template>
  <div class="home">
    <div class="search_input">
      <SearchInput :text="search" @update="search = $event" />
    </div>
    <div class="search_input">
      <SelectInput
        placeholder="Sélectionner genres"
        :choices="GENRES"
        :selected="selectedGenres"
        @update="resetPage(); searchRequest()"
      />
    </div>
    <div class="search_input">
      <SelectInput
        placeholder="Sélectionner qualités vidéo"
        :choices="QUALITY"
        :selected="selectedQuality"
        @update="resetPage(); searchRequest()"
      />
    </div>
    <div class="search_input">
      <SelectInput
        placeholder="Sélectionner versions audio"
        :choices="VERSION"
        :selected="selectedVersion"
        @update="resetPage(); searchRequest()"
      />
    </div>
    <Pagination :total="total" :page.sync="page" @update:page="page = $event" />
    <Sort :sort="sort" @update="searchRequest"/>
    <div class="movies_container" v-if="!loading">
      <MovieBox v-for="movie in movies" :movie="movie" :key="movie.id" />
    </div>
    <Pagination :total="total" :page.sync="page" @update:page="page = $event" />
  </div>
</template>

<style scoped>
.home {
  width: calc(100vw - 40px);
  height: 100vh;
  background-color: #0e273c;
  color: #b4b055;
  overflow-y: auto;
  padding: 20px;
}
.search_input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.movies_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
}
</style>
