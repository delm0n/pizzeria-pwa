<template>
  <section id="pizza">
    <div class="container">
      <div class="title-row">
        <h2>Пиццы</h2>

        <pizza-filter />
      </div>

      <div class="addish-wrapper">
        <pizza-constructor-link />
        <transition-group>
          <pizza-section-item
            v-for="(item, index) in storePizza.getPizzasByFilter"
            :key="index"
            :pizza="item"
          />
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PizzaSectionItem from "./PizzaSectionItem.vue";
import PizzaConstructorLink from "./PizzaConstructorLink.vue";
import PizzaFilter from "./PizzaFilter.vue";

const storePizza = usePizzaStore();
</script>

<style lang="scss">
#pizza {
  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 32px;

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }

    h2 {
      margin-bottom: 0 !important;
    }
  }

  .addish-item {
    &__img {
      cursor: pointer;
      img {
        transition: all 0.3s;
      }

      @media (hover: hover) {
        &:hover {
          img {
            transform: translateY(6px);
          }
        }
      }
    }
  }
}
</style>
