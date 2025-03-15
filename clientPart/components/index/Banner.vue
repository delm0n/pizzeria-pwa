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
              <!-- <source srcset="/images/banner/banner-item-1.webp" /> -->
              <img
                src="/images/banner/banner-item-1.png"
                alt="скидка по промокоду"
              />
            </picture>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <NuxtLink to="/constructor" class="banner-item">
            <picture>
              <!-- <source srcset="/images/banner/banner-item-2.webp" /> -->
              <img
                src="/images/banner/banner-item-2.png"
                alt="скидка по промокоду"
              />
            </picture>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>

    <div v-if="!isLoaded" class="banner-plug">
      <div class="banner-item">
        <picture>
          <!-- <source srcset="/images/banner/banner-item-1.webp" /> -->
          <img
            src="/images/banner/banner-item-1.png"
            alt="скидка по промокоду"
          />
        </picture>
      </div>
    </div>

    <div v-if="viewport.isGreaterOrEquals('tablet')" class="features">
      <div class="features-wrapper">
        <div
          v-for="(item, index) in features"
          :key="index"
          class="features-item"
        >
          <div class="features-item__svg" v-html="item.svg"></div>
          <p class="features-item__title" v-html="item.title"></p>
          <p class="features-item__text" v-html="item.text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Autoplay } from "swiper/modules";
const storeOrder = useOrderStore();

const viewport = useViewport();

const isLoaded = ref(false);
const initSlider = () => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 2000);
};

const features = [
  {
    title: "Бесплатная доставка",
    text: "от 1000 ₽",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
          <path d="M29.934 20.1508L25.677 8.3017C25.5169 7.85609 25.0944 7.55891 24.6209 7.55891H21.2306V3.7843C21.2306 3.16455 20.7282 2.66211 20.1084 2.66211C19.4887 2.66211 18.9863 3.16455 18.9863 3.7843V7.55891H11.0138V3.7843C11.0138 3.16455 10.5114 2.66211 9.89162 2.66211C9.27188 2.66211 8.76943 3.16455 8.76943 3.7843V7.55891H5.3792C4.9057 7.55891 4.48324 7.85615 4.32305 8.3017L0.0660352 20.1508C0.0237891 20.2686 0 20.3984 0 20.5301V27.6886C0 28.3083 0.502441 28.8107 1.12219 28.8107H28.8778C29.4976 28.8107 30 28.3083 30 27.6886V20.5301C30 20.4012 29.977 20.2704 29.934 20.1508ZM6.16846 9.80328H8.76943V12.1279C8.76943 12.7477 9.27188 13.2501 9.89162 13.2501C10.5114 13.2501 11.0138 12.7477 11.0138 12.1279V9.80328H18.9861V12.1279C18.9861 12.7477 19.4886 13.2501 20.1083 13.2501C20.7281 13.2501 21.2305 12.7477 21.2305 12.1279V9.80328H23.8315L27.2822 19.4079C26.3059 19.4079 3.46441 19.4079 2.71775 19.4079L6.16846 9.80328ZM17.7589 21.6523C16.6123 23.9119 13.3874 23.9114 12.2411 21.6523H17.7589ZM27.7556 26.5664H2.24438V21.6523H9.8499C10.467 23.9307 12.5557 25.5941 15 25.5941C17.4443 25.5941 19.533 23.9308 20.1501 21.6523H27.7556V26.5664Z" fill="#F4576D"/>
          <path d="M15.0001 6.6092C15.6199 6.6092 16.1223 6.10676 16.1223 5.48701V2.31164C16.1223 1.69189 15.6199 1.18945 15.0001 1.18945C14.3804 1.18945 13.8779 1.69189 13.8779 2.31164V5.48695C13.8779 6.10676 14.3804 6.6092 15.0001 6.6092Z" fill="#F4576D"/>
      </svg>
      `,
  },

  {
    title: "Стоимость доставки",
    text: storeOrder.priceDelivery + " ₽",
    svg: `
      <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clip-path="url(#clip0_99_2)">
                  <path
                    d="M30.21 23.7815C27.4298 23.7815 25.168 26.0433 25.168 28.8235C25.168 31.6038 27.4298 33.8656 30.21 33.8656C32.9907 33.8656 35.252 31.6038 35.252 28.8235C35.252 26.0433 32.9902 23.7815 30.21 23.7815ZM30.21 31.3445C28.8197 31.3445 27.689 30.2138 27.689 28.8235C27.689 27.4332 28.8197 26.3025 30.21 26.3025C31.6003 26.3025 32.731 27.4332 32.731 28.8235C32.731 30.2139 31.6003 31.3445 30.21 31.3445Z"
                    fill="#F4576D"
                  />
                  <path
                    d="M12.9834 23.7815C10.2032 23.7815 7.94141 26.0433 7.94141 28.8235C7.94141 31.6038 10.2032 33.8656 12.9834 33.8656C15.7637 33.8656 18.0255 31.6038 18.0255 28.8235C18.0255 26.0433 15.7637 23.7815 12.9834 23.7815ZM12.9834 31.3445C11.5931 31.3445 10.4624 30.2138 10.4624 28.8235C10.4624 27.4332 11.5931 26.3025 12.9834 26.3025C14.3734 26.3025 15.5045 27.4332 15.5045 28.8235C15.5045 30.2139 14.3737 31.3445 12.9834 31.3445Z"
                    fill="#F4576D"
                  />
                  <path
                    d="M33.605 9.34966C33.3907 8.92403 32.955 8.65552 32.4785 8.65552H25.8398V11.1765H31.7012L35.1335 18.0034L37.3865 16.8706L33.605 9.34966Z"
                    fill="#F4576D"
                  />
                  <path
                    d="M26.4284 27.605H16.8906V30.126H26.4284V27.605Z"
                    fill="#F4576D"
                  />
                  <path
                    d="M9.20144 27.605H4.83176C4.13551 27.605 3.57129 28.1693 3.57129 28.8654C3.57129 29.5617 4.13559 30.1259 4.83176 30.1259H9.20152C9.89777 30.1259 10.462 29.5616 10.462 28.8654C10.462 28.1692 9.89769 27.605 9.20144 27.605Z"
                    fill="#F4576D"
                  />
                  <path
                    d="M39.7351 19.8992L37.2557 16.7059C37.0175 16.3983 36.6499 16.2185 36.2604 16.2185H27.1007V7.39499C27.1007 6.69874 26.5364 6.13452 25.8402 6.13452H4.83176C4.13551 6.13452 3.57129 6.69882 3.57129 7.39499C3.57129 8.09116 4.13559 8.65546 4.83176 8.65546H24.5796V17.479C24.5796 18.1752 25.1439 18.7394 25.8401 18.7394H35.6431L37.4788 21.1041V27.605H33.9914C33.2951 27.605 32.7309 28.1693 32.7309 28.8655C32.7309 29.5617 33.2952 30.1259 33.9914 30.1259H38.7393C39.4355 30.1259 39.9997 29.5616 39.9998 28.8655V20.6723C39.9998 20.3925 39.9065 20.1202 39.7351 19.8992Z"
                    fill="#F4576D"
                  />
                  <path
                    d="M9.11742 21.2185H3.31906C2.62281 21.2185 2.05859 21.7828 2.05859 22.479C2.05859 23.1752 2.62289 23.7394 3.31906 23.7394H9.11734C9.81359 23.7394 10.3778 23.1751 10.3778 22.479C10.3779 21.7828 9.81359 21.2185 9.11742 21.2185Z"
                    fill="#F4576D"
                  />
                  <path
                    d="M12.0168 16.2605H1.26047C0.564297 16.2605 0 16.8248 0 17.521C0 18.2173 0.564297 18.7815 1.26047 18.7815H12.0168C12.713 18.7815 13.2773 18.2172 13.2773 17.521C13.2773 16.8249 12.713 16.2605 12.0168 16.2605Z"
                    fill="#F4576D"
                  />
                  <path
                    d="M14.0754 11.3025H3.31906C2.62281 11.3025 2.05859 11.8668 2.05859 12.563C2.05859 13.2592 2.62289 13.8234 3.31906 13.8234H14.0754C14.7716 13.8234 15.3359 13.2591 15.3359 12.563C15.3359 11.8668 14.7716 11.3025 14.0754 11.3025Z"
                    fill="#F4576D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_99_2">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
      `,
  },

  {
    title: "Время доставки",
    text: "до 1 часа",
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 30 30" fill="none">
          <g clip-path="url(#clip0_105_63)">
              <path d="M15 0C6.72896 0 0 6.72901 0 15C0 23.271 6.72896 30 15 30C23.271 30 30 23.271 30 15C30 6.72901 23.2709 0 15 0ZM15 26.436C8.69422 26.436 3.56413 21.3058 3.56413 15.0001C3.56413 8.69441 8.69422 3.56428 15 3.56428C21.3058 3.56428 26.4358 8.69441 26.4358 15.0001C26.4358 21.3058 21.3057 26.436 15 26.436Z" fill="#F4576D"/>
              <path d="M19.5342 14.1283H16.5641V8.78208C16.5641 7.7979 15.7662 7 14.7821 7C13.7979 7 13 7.7979 13 8.78208V15.9104C13 16.8946 13.7979 17.6925 14.7821 17.6925H19.5342C20.5184 17.6925 21.3163 16.8946 21.3163 15.9104C21.3163 14.9262 20.5184 14.1283 19.5342 14.1283Z" fill="#F4576D"/>
          </g>
          <defs>
              <clipPath id="clip0_105_63">
                  <rect width="30" height="30" fill="white"/>
              </clipPath>
          </defs>
      </svg>
      `,
  },
];
</script>

<style lang="scss">
.banner {
  overflow: hidden;
  margin-top: 20px;

  * {
    user-select: none;
  }

  @media (max-width: 768px) {
    margin: 10px 0 20px;
  }

  @media (max-width: 576px) {
    margin: 10px 0;
  }

  .banner-wrapper,
  .banner-plug {
    .swiper-slide {
      max-width: 100%;
    }
    .banner-item {
      max-width: 100%;
      aspect-ratio: 584 / 193;
      color: var(--background);
      img {
        width: 100%;
      }
    }
  }

  .banner-plug {
    max-width: 100%;
    margin: 0 auto;
  }

  .custom {
    background: var(--background);
  }

  @media (min-width: 769px) {
    .features {
      max-width: 1630px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      padding: 0 50px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 1.4;
      transform: translateY(-50%);
      position: relative;
      z-index: 10;

      @media (max-width: 992px) {
        padding: 0 30px;
      }

      .features-wrapper {
        background: var(--background-secondary);
        box-shadow: var(--shadow) 0px 2px 15px -2px;
        padding: 20px 30px;
        border-radius: 10px;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        max-width: 800px;
        margin: 0 auto;

        @media (max-width: 992px) {
          padding: 15px;
        }
      }

      &-item {
        padding: 0 20px;
        display: grid;
        grid-template-columns: 30px 1fr;

        &__svg {
          grid-column: 1/2;
          grid-row: 1/3;
        }

        &:not(:last-child) {
          border-right: 2px solid var(--placeholder);
        }

        &__title {
          font-weight: 600;
          white-space: nowrap;
        }

        &__text {
          color: var(--text-description);
        }
      }
    }
  }
}
</style>
