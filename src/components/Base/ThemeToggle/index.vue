<template>
  <div class="toggle" @click="toggleTheme()">
    <span></span>
    <svg
      class="sun"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_320_4)">
        <path
          d="M10 0C9.48047 0 9.0625 0.417969 9.0625 0.9375V3.4375C9.0625 3.95703 9.48047 4.375 10 4.375C10.5195 4.375 10.9375 3.95703 10.9375 3.4375V0.9375C10.9375 0.417969 10.5195 0 10 0ZM10 15.625C9.48047 15.625 9.0625 16.043 9.0625 16.5625V19.0625C9.0625 19.582 9.48047 20 10 20C10.5195 20 10.9375 19.582 10.9375 19.0625V16.5625C10.9375 16.043 10.5195 15.625 10 15.625ZM19.0625 10.9375C19.582 10.9375 20 10.5195 20 10C20 9.48047 19.582 9.0625 19.0625 9.0625H16.5625C16.043 9.0625 15.625 9.48047 15.625 10C15.625 10.5195 16.043 10.9375 16.5625 10.9375H19.0625ZM4.375 10C4.375 9.48047 3.95703 9.0625 3.4375 9.0625H0.9375C0.417969 9.0625 0 9.48047 0 10C0 10.5195 0.417969 10.9375 0.9375 10.9375H3.4375C3.95703 10.9375 4.375 10.5195 4.375 10ZM17.0703 4.25391C17.4375 3.88672 17.4375 3.29297 17.0703 2.92969C16.7031 2.56641 16.1094 2.5625 15.7461 2.92969L13.9766 4.69922C13.6094 5.06641 13.6094 5.66016 13.9766 6.02344C14.3437 6.38672 14.9375 6.39062 15.3008 6.02344L17.0703 4.25391ZM6.02344 13.9766C5.65625 13.6094 5.0625 13.6094 4.69922 13.9766L2.92969 15.7461C2.5625 16.1133 2.5625 16.707 2.92969 17.0703C3.29688 17.4336 3.89062 17.4375 4.25391 17.0703L6.02344 15.3008C6.39062 14.9336 6.39062 14.3398 6.02344 13.9766ZM15.7461 17.0703C16.1133 17.4375 16.707 17.4375 17.0703 17.0703C17.4336 16.7031 17.4375 16.1094 17.0703 15.7461L15.3008 13.9766C14.9336 13.6094 14.3398 13.6094 13.9766 13.9766C13.6133 14.3437 13.6094 14.9375 13.9766 15.3008L15.7461 17.0703ZM6.02344 6.02344C6.39062 5.65625 6.39062 5.0625 6.02344 4.69922L4.25391 2.92969C3.88672 2.5625 3.29297 2.5625 2.92969 2.92969C2.56641 3.29688 2.5625 3.89062 2.92969 4.25391L4.69922 6.02344C5.06641 6.39062 5.66016 6.39062 6.02344 6.02344ZM10 14.375C12.418 14.375 14.375 12.418 14.375 10C14.375 7.58203 12.418 5.625 10 5.625C7.58203 5.625 5.625 7.58203 5.625 10C5.625 12.418 7.58203 14.375 10 14.375Z"
          fill="#FFD43B"
        />
      </g>
      <defs>
        <clipPath id="clip0_320_4">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>

    <svg
      class="moon"
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.403 0C4.88958 0 0.425293 4.47768 0.425293 10C0.425293 15.5223 4.88958 20 10.403 20C13.1083 20 15.5592 18.9196 17.3583 17.1696C17.5815 16.9509 17.6396 16.6116 17.4967 16.3348C17.3539 16.058 17.0458 15.9018 16.7378 15.9554C16.3003 16.0312 15.8539 16.0714 15.394 16.0714C11.0681 16.0714 7.55922 12.5536 7.55922 8.21429C7.55922 5.27679 9.16636 2.71875 11.5458 1.37054C11.8182 1.21429 11.9565 0.901786 11.8896 0.598214C11.8226 0.294643 11.5637 0.0669644 11.2512 0.0401786C10.9699 0.0178572 10.6887 0.00446422 10.403 0.00446422V0Z"
        fill="#74C0FC"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    toggleTheme: function () {
      let theme = localStorage.getItem("color-mode")
        ? localStorage.getItem("color-mode")
        : null
      if (theme == null) {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          theme = "dark"
        } else {
          theme = "light"
        }
      }

      if (theme == "light") {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
        localStorage.setItem("color-mode", "dark")

        if (document.getElementsByClassName("banner").length) {
          if (
            document
              .getElementsByClassName("banner")[0]
              .classList.contains("is-auto")
          ) {
            document
              .getElementsByClassName("header")[0]
              .classList.remove("dark-header")
            document
              .getElementsByClassName("header")[0]
              .classList.remove("light-header")
          }
        }
      } else if (theme == "dark") {
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
        localStorage.setItem("color-mode", "light")

        if (document.getElementsByClassName("banner").length) {
          if (
            document
              .getElementsByClassName("banner")[0]
              .classList.contains("is-auto")
          ) {
            document
              .getElementsByClassName("header")[0]
              .classList.remove("dark-header")
            document
              .getElementsByClassName("header")[0]
              .classList.remove("light-header")
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "style";
</style>
