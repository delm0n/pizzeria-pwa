<template>
  <main class="index-main">
    <nav-bar />
    <always-section />
    <pizza-section />
    <dish-section
      v-for="(item, index) in store.getDishByType"
      :key="index"
      :dishes="store.dishes.filter((el) => el.DishType == item.type)"
      :id="item.id"
      :title="item.title"
    />
  </main>
</template>

<script setup lang="ts">
import PizzaSection from "~/components/index/PizzaSection.vue";
import DishSection from "~/components/index/DishSection.vue";
import AlwaysSection from "~/components/index/AlwaysSection.vue";
import NavBar from "~/components/index/NavBar.vue";

const store = useDishStore();
await callOnce(store.fetch);
</script>

<style lang="scss">
.index-main {
  section {
    padding-top: 120px;

    @media (max-width: 992px) {
      padding-top: 80px;
    }

    @media (max-width: 576px) {
      padding-top: 50px;
    }
  }
}
</style>
