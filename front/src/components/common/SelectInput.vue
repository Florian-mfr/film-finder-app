<script setup lang="ts">
import { computed, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const emit = defineEmits({
  update: () => {}
})

// Data
const openSelect = ref(false)

// Props
const { selected, choices, placeholder } = defineProps<{
  selected: string[],
  choices: string[],
  placeholder: string
}>()

// Computed Property
const selectedLabels = computed(() => {
  if (selected && selected.length > 0) {
    return selected.map(choice => choice).join(', ')
  } else {
    return null
  }
})

// Function
function handleClick(choice: string) {
  const choiceIndex = selected.findIndex(item => item === choice)
  if (choiceIndex !== -1) {
    // Le choix est déjà sélectionné, le supprimer
    selected.splice(choiceIndex, 1)
  } else {
    // Le choix n'est pas sélectionné, l'ajouter
    selected.push(choice)
  }
  emit('update')
}
</script>

<template>
  <div class="container">
    <div class="container_input">
      <div @click="openSelect = !openSelect"
        :class="{'placeholder': !selectedLabels}"
        class="input_choice input_choice--first clickable">
        <span>{{ selectedLabels || placeholder }}</span>
        <FontAwesomeIcon
          :class="{'rotate': openSelect}"
          class="choice_icon"
          icon="caret-down" />
      </div>
      <div v-if="openSelect" class="choice_list">
        <div v-for="choice in choices" :key="choice"
          @click="handleClick(choice)"
          class="input_choice input_choice--hover clickable"
          :class="{'selected': selected.findIndex(item => item === choice) !== -1}">
          <span>{{ choice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20px;
  width: 470px;
  position: relative;
}
.container_input {
  width: 100%;
  height: 100%;
  border-radius: 28px;
  background-color: #EFEFEF;
  color: #000000;
  font-size: 18px;
  border: none;
  overflow: hidden;
}
.placeholder {
  color: #6e6e6e;
}
.input_choice {
  position: relative;
  width: calc(100% - 20px);
  height: 57px;
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #0E273C;
}
.choice_icon {
  position: absolute;
  right: 20px;
  top: 20px;
}
.rotate {
  transform: rotate(180deg);
}

.choice_list {
  height: 100%;
  max-height: 400px;
  overflow-y: auto;
}
.input_choice--hover:hover {
  background-color: #B4B055;
  color: #FFFFFF;
}
.selected {
  background-color: #C4ABC3;
}
</style>
