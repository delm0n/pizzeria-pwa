<template>
  <section id="pizza">
    <div class="container">
      <div class="title-row">
        <h2>Пиццы</h2>

        <div class="icons-box">
          <sort-addish v-if="!viewport.isGreaterOrEquals('mobileWide')" />
          <pizza-filter />
        </div>
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
import SortAddish from "~/components/UI/SortAddish.vue";

const viewport = useViewport();
const storePizza = usePizzaStore();
</script>

<style lang="scss">
#pizza {
  padding-top: 60px;

  @media (max-width: 768px) {
    padding-top: 20px;
  }

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

    .icons-box {
      display: flex;
      align-items: center;
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
