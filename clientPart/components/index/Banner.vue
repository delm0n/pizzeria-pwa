<template>
  <div class="banner">
    <ClientOnly>
      <Swiper
        v-show="isLoaded"
        @init="initSlider"
        :slidesPerView="'auto'"
        :spaceBetween="20"
        :centeredSlides="true"
        :speed="600"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :modules="[Autoplay]"
        class="banner-wrapper"
      >
        <SwiperSlide>
          <div class="banner-item">
            <picture>
              <source srcset="/images/banner/banner-1.webp" />
              <img
                src="/images/banner/banner-1.png"
                alt="скидка по промокоду"
              />
            </picture>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="banner-item">
            <NuxtPicture
              format="avif,webp"
              sizes=" xl:1440px lg:1000px md:920px sm:500px xs:400px"
              :src="'/images/banner/banner-2.png'"
              :alt="'скидка по промокоду'"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <NuxtLink to="/constructor" class="banner-item">
            <NuxtPicture
              format="avif,webp"
              sizes=" xl:1440px lg:1000px md:920px sm:500px xs:400px"
              :src="'/images/banner/banner-3.png'"
              :alt="'скидка по промокоду'"
            />
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>

    <div v-if="!isLoaded" class="banner-plug">
      <div class="banner-item">
        <picture>
          <source srcset="/images/banner/banner-1.webp" />
          <img src="/images/banner/banner-1.png" alt="скидка по промокоду" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Autoplay } from "swiper/modules";

const isLoaded = ref(false);
const initSlider = () => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 1000);
};

const bannerList = ["banner-2", "banner-1"];
</script>

<style lang="scss">
.banner {
  overflow: hidden;
  margin: 40px 0;

  * {
    user-select: none;
  }

  @media (max-width: 576px) {
    margin: 20px 0;
  }

  .banner-wrapper,
  .banner-plug {
    .swiper-slide {
      max-width: 1080px;
    }
    .banner-item {
      max-width: 1080px;
      aspect-ratio: 64 / 23;
      color: var(--background);
      img {
        width: 100%;
      }
    }
  }

  .banner-plug {
    max-width: 1080px;
    margin: 0 auto;
  }

  .custom {
    background: var(--background);
  }
}
</style>
