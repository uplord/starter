<template>
  <div class="banner alignmax"
    :class="[
      slides_text,
      {
        'animate js_section': set_animate == true || animate == 'true',
        visible: set_visible == true,
        loaded: loaded
      }
    ]"
  >
    <div clas="slides" :class="{ 'has-multiple': all_slides.length > 1 }">
      <div 
        v-for="(slide, key) in all_slides"
        :key="key"
        class="slide"
        :class="[
          slide.class,
          {
            active: slide.active == true,
            'show-image': slide.show_image == true,
            'show-text': slide.show_text == true,
            top: slide.top == true
          }
        ]"
      >
        <div v-if="slide.image.data != null && slide.floating_image != true" class="image-wrap">
          <div class="image">
            <Image :image="slide.image" :title="slide.title" />
          </div>
        </div>

        <div v-else class="placeholder"></div>

        <div 
          class="text-content"
          :class="{ 'has-floating': slide.floating_image == true }"
        >

          <div v-if="slide.image.data != null && slide.floating_image == true" class="floating-image">
            <div class="image">
              <Image :image="slide.image" :title="slide.title" />
            </div>
          </div>

          <div class="text-wrap">
            <h1 v-if="key == 0">
              <span v-if="slide.leading">{{ slide.leading }}</span
              >{{ slide.title }}
            </h1>
            <h2 v-if="key != 0" class="h1">{{ slide.title }}</h2>
            <h2 v-if="key == 0" class="h3">{{ slide.subtitle }}</h2>
            <h3 v-if="key != 0">{{ slide.subtitle }}</h3>
            <BaseButtons v-if="slide.buttons" :buttons="slide.buttons" />
          </div>

        </div>

      </div>

      <div class="controls" :class="{ show: controls == true }">
        <div
          v-for="(slide, key) in all_slides"
          :key="key"
          class="dot"
          :class="{ active: key == current_slide }"
          @click="changeSlide(key)"
        ></div>
      </div>

      <div
        class="arrow prev"
        :class="{ show: controls == true }"
        @click="changeSlide('prev')"
      ></div>
      <div
        class="arrow next"
        :class="{ show: controls == true }"
        @click="changeSlide('next')"
      ></div>

    </div>

    <span class="view-more"></span>
  </div>
</template>

<script setup>

const props = defineProps(['animate', 'visible', 'data', 'id', 'scroll'])

const set_animate = ref(false)
const set_visible = ref(false)
const all_slides = ref(props.data.slide)
const controls = ref(false)
const current_slide = ref(0)
const slides_text = ref(null)
const sliding = ref(true)
const paused = ref(false)
const loaded = ref(false)

watch(() => props.visible, (value) => {
  if (value == true) {
    set_animate.value = true
    set_visible.value = true
    loadSlides()
  }
})

onMounted(() => {
  if (props.animate != 'true' && props.visible != true) {
    set_visible.value = true
    loadSlides()
  }
})

const loadSlides = () => {
  const header = document.getElementsByClassName('header')[0]
  const homepage = document.body.classList.contains('homepage')
  const first_slide = all_slides.value[0]

  first_slide.active = true
  first_slide.show_image = true

  if (
    first_slide.class &&
    (first_slide.class.includes('dark') || first_slide.class.includes('light'))
  ) {
    header.classList.remove('banner-color')

    if (first_slide.class.includes('dark')) {
      slides_text.value = 'is-dark'
      if (homepage && header) {
        header.classList.add('dark-header')
      }
    } else {
      slides_text.value = 'is-light'
      if (homepage && header) {
        header.classList.add('light-header')
      }
    }
  } else {
    if (header) {
      header.classList.add('banner-color')
    }
    slides_text.value = 'is-auto'
  }
  if (set_animate.value == true) {
    setTimeout(() => {
      first_slide.show_text = true

      if (all_slides.value.length > 1) {
        controls.value = true
      }
    }, 300)

    setTimeout(() => {
      sliding.value = false
    }, 600)

    setTimeout(() => {
      loaded.value = true
    }, 1600)
  } else {
    first_slide.show_text = true
    if (all_slides.value.length > 1) {
      controls.value = true
    }
    sliding.value = false
    loaded.value = true
  }
}

const changeSlide = (direction) => {
  const header = document.getElementsByClassName('header')[0]
  const homepage = document.body.classList.contains('homepage')
  let slide = current_slide.value
  const old = current_slide.value
  const new_slide = all_slides.value[slide]
  const old_slide = all_slides.value[old]

  if (sliding.value == false) {
    set_animate.value = true

    if (direction == 'prev') {
      slide--
      if (slide < 0) {
        slide = all_slides.value.length - 1
      }
    } else if (direction == 'next') {
      slide++
      if (slide >= all_slides.value.length) {
        slide = 0
      }
    } else {
      slide = direction
    }

    if (direction != current_slide.value) {
      sliding.value = true
      paused.value = true

      current_slide.value = slide
      const new_slide = all_slides.value[slide]

      new_slide.active = true
      old_slide.show_text = false

      setTimeout(() => {
        new_slide.show_image = true
        new_slide.top = true

        if (
          new_slide.class &&
          (new_slide.class.includes('dark') ||
            new_slide.class.includes('light'))
        ) {
          if (header) {
            header.classList.remove('banner-color')
          }

          if (new_slide.class.includes('dark')) {
            slides_text.value = 'is-dark'
            if (homepage && header) {
              header.classList.add('dark-header')
              header.classList.remove('light-header')
            }
          } else {
            slides_text.value = 'is-light'
            if (homepage && header) {
              header.classList.remove('dark-header')
              header.classList.add('light-header')
            }
          }
        } else {
          if (header.length) {
            header.classList.add('banner-color')
            header.classList.remove('dark-header')
            header.classList.remove('light-header')
          }
          slides_text.value = 'is-auto'
        }
      }, 600)

      setTimeout(() => {
        old_slide.active = false
        old_slide.show_image = false
        new_slide.show_text = true
        new_slide.top = false
      }, 1200)

      setTimeout(() => {
        paused.value = false
        sliding.value = false
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
@import "style";
</style>