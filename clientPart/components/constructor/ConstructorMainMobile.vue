<template>
  <div class="constructor-wrapper__components">
    <Swiper
      :modules="[Thumbs]"
      slidesPerView="auto"
      :centeredSlides="true"
      :centeredSlidesBounds="true"
      :spaceBetween="5"
      :grabCursor="true"
      class="gallery-thumbs"
    >
      <SwiperSlide v-for="(item, index) in links" :key="index">
        <p v-html="item.title"></p>
      </SwiperSlide>
    </Swiper>

    <Swiper
      :modules="[Thumbs]"
      slidesPerView="auto"
      :centeredSlides="true"
      :centeredSlidesBounds="true"
      :spaceBetween="10"
      class="gallery-top"
      :thumbs="{ swiper: '.gallery-thumbs', autoScrollOffset: 2 }"
    >
      <SwiperSlide> <constructor-sauce /> </SwiperSlide>
      <SwiperSlide v-for="(item, index) in ingredients" :key="index">
        <constructor-ingredient
          :link="links[index + 1]"
          :title="''"
          :ingredients="item.ingredientArray"
          :visibleTimeout="visibleTimeout"
          @setVisibleTimeout="(i) => setValueVisibleTimeout(i)"
        />
      </SwiperSlide>
    </Swiper>

    <warning-ingredient
      :visible="!storeIngredient.checkCount && visibleTimeout"
    />
  </div>
</template>

<script setup lang="ts">
import ConstructorSauce from "~/components/constructor/ConstructorSauce.vue";
import ConstructorIngredient from "~/components/constructor/ConstructorIngredient.vue";
import WarningIngredient from "~/components/UI/WarningIngredient.vue";
import { Thumbs } from "swiper/modules";
import { ref } from "vue";

const visibleTimeout = ref(false);
const storeIngredient = useIngredientStore();

const props = defineProps<{
  ingredients: IIngredientByType;
  links: INavLink[];
}>();

const setValueVisibleTimeout = (bool: boolean) => {
  visibleTimeout.value = bool;
};
</script>

<style lang="scss">
@media (max-width: 768px) {
  .constructor-wrapper__components {
    position: relative;
  }

  .gallery-thumbs {
    margin: 20px 0;
    box-sizing: border-box;
    overflow: hidden;
    background: var(--placeholder);
    box-shadow: 0 2px 20px var(--shadow);

    .swiper-slide {
      width: 140px;
      height: 100%;
      padding: 20px 0;
      background: var(--placeholder);

      @media (max-width: 576px) {
        width: 100px;
      }

      @media (max-width: 426px) {
        width: 80px;
      }

      p {
        text-align: center;
        font-weight: 500;
        color: var(--text-color);
      }
    }

    .swiper-slide-thumb-active {
      background: var(--placeholder-button);

      p {
        font-weight: 600;
        color: var(--accent);
      }
    }
  }

  .gallery-top {
    width: 100%;
  }
}
</style>
