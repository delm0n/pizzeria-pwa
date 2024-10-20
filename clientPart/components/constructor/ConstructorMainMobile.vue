<template>
  <div class="constructor-wrapper">
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
        <SwiperSlide v-for="(title, index) in titles" :key="index">
          {{ title }}
        </SwiperSlide>
      </Swiper>

      <Swiper
        :modules="[Thumbs]"
        slidesPerView="auto"
        :centeredSlides="true"
        :centeredSlidesBounds="true"
        :spaceBetween="10"
        class="gallery-top"
        :thumbs="{ swiper: '.gallery-thumbs', autoScrollOffset: 3 }"
      >
        <SwiperSlide> <constructor-sauce /> </SwiperSlide>
        <SwiperSlide v-for="(item, index) in ingredients" :key="index">
          <constructor-ingredient
            :title="''"
            :ingredients="item.ingredientArray"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConstructorSauce from "~/components/constructor/ConstructorSauce.vue";
import ConstructorIngredient from "~/components/constructor/ConstructorIngredient.vue";
import { Thumbs } from "swiper/modules";

const props = defineProps<{
  ingredients: IIngredientByType;
  titles: string[];
}>();
</script>

<style lang="scss">
.swiper-container {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}
.swiper-slide {
  background-color: red;
}
.gallery-top {
  height: 80%;
  width: 100%;
}
.gallery-thumbs {
  width: 300px;
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
  overflow: hidden;
}
.gallery-thumbs .swiper-slide {
  width: 60px;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-thumb-active {
  opacity: 1;
}
</style>
