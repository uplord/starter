<template>
  <header class="header alignmax">
    <div class="container alignwide">
      <NuxtLink to="/" class="logo">
        <span class="m">M</span>The<span class="red">Michael</span>
      </NuxtLink>

      <div class="navigation">
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/#about-me">About me</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/#projects">Projects</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/#timeline">Timeline</NuxtLink>
          </li>
          <li>
            <NuxtLink to="mailto:michael@uplord.co.uk">Contact</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="right">
        <BaseThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
import BaseThemeToggle from '@/components/Base/ThemeToggle';
</script>

<style lang="scss">
@import "style";
</style>
