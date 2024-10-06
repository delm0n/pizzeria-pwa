<template>
  <section :id="id">
    <div class="container">
      <h2>{{ title }}</h2>

      <div class="addish-wrapper">
        <dish-section-item
          v-for="(item, index) in dishes"
          :key="index"
          :dish="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import DishSectionItem from "./DishSectionItem.vue";

const props = defineProps<{
  dishes: IDish[];
  id: string;
  title: string;
}>();
</script>
