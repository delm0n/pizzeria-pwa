<template>
  <Teleport to="#teleports">
    <modal-settings class="order-modal" v-if="!!storeModal.orderModal">
      <h3>
        Ваш заказ <span> №{{ storeOrder.numberOrder }} </span>
      </h3>

      <div class="cart-road">
        <div class="cart-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <g clip-path="url(#clip0_4_2)">
              <path
                d="M38.6222 10.4248C37.7218 9.19532 36.3291 8.41876 34.8094 8.29837L9.86273 6.32172L9.61828 4.93508C9.20789 2.61665 7.36375 0.821256 5.03453 0.476803L1.92109 0.0146152C1.1789 -0.0944473 0.488279 0.418678 0.377966 1.15977C0.267888 1.9029 0.780935 2.59383 1.52304 2.7036V2.70297L4.63718 3.16446C5.80672 3.33774 6.73625 4.24141 6.94164 5.40743L11.1614 29.3241C11.5577 31.5691 13.5073 33.2045 15.787 33.2052H33.1284C33.8783 33.2052 34.487 32.5965 34.487 31.8466C34.487 31.0961 33.8783 30.4874 33.1284 30.4874H15.787C14.8274 30.4881 14.0046 29.7971 13.838 28.852L13.4474 26.6372H32.5786C35.0195 26.6372 37.1372 24.9536 37.6858 22.5743L39.5025 14.7019C39.5922 14.3113 39.637 13.9159 39.637 13.5233C39.6369 12.4189 39.2871 11.3313 38.6222 10.4248ZM23.164 17.9574V24.3729H17.5023V17.9574H23.164ZM17.5024 16.1447V9.19946L23.1641 9.64837V16.1448H17.5024V16.1447ZM24.9754 17.9574H30.637V24.3729H24.9754V17.9574ZM24.9754 16.1447V9.79141L30.637 10.2402V16.1447H24.9754ZM15.6905 9.05555V16.1446H11.5962L10.2694 8.6261L15.6905 9.05555ZM11.9159 17.9574H15.6905V24.3729H13.0477L11.9159 17.9574ZM35.479 22.0659C35.168 23.4158 33.9645 24.373 32.5786 24.373H32.4495V17.9575H36.4268L35.479 22.0659ZM37.2957 14.1928L36.7512 16.5527V16.1447H32.4495V10.3841L34.6308 10.5566C35.4937 10.6242 36.2844 11.0656 36.7954 11.7634C37.1733 12.2784 37.3726 12.8958 37.3726 13.5232C37.3726 13.746 37.3459 13.9695 37.2957 14.1928Z"
                fill="black"
              />
              <path
                d="M16.8237 35.1691C15.4896 35.1691 14.409 36.2514 14.409 37.5852C14.409 38.919 15.4896 40 16.8237 40C18.1579 40 19.2398 38.919 19.2398 37.5852C19.2398 36.2514 18.1579 35.1691 16.8237 35.1691Z"
                fill="black"
              />
              <path
                d="M29.8076 35.1691C28.4738 35.1691 27.3924 36.2514 27.3924 37.5852C27.3924 38.919 28.4737 40 29.8076 40C31.1417 40 32.2234 38.919 32.2234 37.5852C32.2234 36.2514 31.1418 35.1691 29.8076 35.1691Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_4_2">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <p>Принят в обслуживание!</p>
      </div>
    </modal-settings>
  </Teleport>
</template>

<script lang="ts" setup>
import ModalSettings from "../UI/ModalSettings.vue";
const storeOrder = useOrderStore();
const storeModal = useModalStore();
</script>

<style lang="scss">
.order-modal {
  .modal-content {
    max-width: 410px;

    position: relative;
  }

  h3 {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: var(--text-color);
    margin-bottom: 10px;
    display: block;
    padding: 30px 30px 0;

    @media (max-width: 768px) {
      font-size: 22px;
    }
    @media (max-width: 576px) {
      padding: 30px 20px 0;
    }

    span {
      color: var(--accent);
    }
  }

  .cart-road {
    overflow: hidden;
    padding: 0 30px 30px;
    @media (max-width: 576px) {
      padding: 0 20px 30px;
    }

    p {
      position: absolute;
      top: 57%;
      transform: translate(-50%);
      text-align: center;
      left: 50%;
      white-space: nowrap;
      font-weight: 500;
    }
  }

  .cart-icon {
    animation: cart 2s ease-in 1.1s forwards;
    width: 100%;
    background: var(--background);
    position: relative;
    z-index: 5;

    svg {
      transform: translateX(-10px);
    }
    path {
      fill: var(--accent);
    }
  }

  @keyframes cart {
    0% {
      transform: translateX(0px);
    }

    100% {
      transform: translateX(130%);
    }
  }
}
</style>
