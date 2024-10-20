<template>
  <footer>
    <div class="container">
      <div class="footer-wrapper">
        <p class="logo">Pizzeria</p>

        <div class="links-row">
          <a target="_blank" href="https://github.com/delm0n">GitHub</a>

          <a target="_blank" href="https://delm0n.github.io/portfolio/"
            >Разработчик</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  margin-top: 50px;
  box-shadow: var(--shadow) 0px 2px 15px -2px;

  .footer-wrapper {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 576px) {
      flex-direction: column;
      align-items: start;
    }

    .logo {
      color: var(--accent);
      font-size: 2em;
      font-weight: bold;

      @media (max-width: 576px) {
        margin-bottom: 20px;
      }
    }

    .links-row {
      display: flex;
      align-items: center;

      @media (max-width: 576px) {
        flex-direction: column;
        align-items: start;
      }

      a {
        color: var(--text-color);
        opacity: 0.7;
        transition: all 0.2s;

        &:hover {
          color: var(--accent);
        }

        &:not(:last-child) {
          margin-right: 20px;

          @media (max-width: 576px) {
            margin-right: 0;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
