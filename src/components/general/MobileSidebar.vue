<script setup lang="ts">
import { useMotions } from "@vueuse/motion";

interface Props {
  when: boolean;
  username?: string;
  logout?: () => void;
}

interface Emits {
  (event: "update:when", value: boolean): boolean;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const motions = useMotions();

const handleLogout = () => {
  if (props.logout) props.logout();
  emits("update:when", false);
};
</script>

<template>
  <transition @leave="(_, done) => motions.transparent.leave(done)">
    <div
      v-if="when"
      v-motion="'transparent'"
      :initial="{
        opacity: 0,
        x: -640,
      }"
      :enter="{
        opacity: 100,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 40,
          mass: 0.5,
        },
      }"
      :leave="{
        opacity: 0,
        x: -640,
        transition: {
          type: 'spring',
          stiffness: 80,
          mass: 0.8,
        },
      }"
      class="fixed w-full inset-0 bg-black bg-opacity-80 z-10 text-white backdrop-blur-sm"
    >
      <section class="grid gap-4 w-[90%] mx-auto">
        <div class="flex items-center my-[2.25rem] gap-4">
          <h4 v-if="username" class="text-xl">{{ `Hi, ${username}` }}</h4>

          <button
            class="material-symbols-outlined ml-auto text-[26px]"
            @click="$emit('update:when', false)"
          >
            close
          </button>
        </div>

        <nav class="flex flex-col gap-6 w-full">
          <template v-if="!username">
            <RouterLink
              :to="{ name: 'home' }"
              class="button link"
              @click.prevent="$emit('update:when', false)"
            >
              Home
            </RouterLink>

            <hr />

            <RouterLink
              :to="{ name: 'register' }"
              class="button link"
              @click.prevent="$emit('update:when', false)"
            >
              Sign In
            </RouterLink>

            <RouterLink
              :to="{ name: 'login' }"
              class="button link"
              @click.prevent="$emit('update:when', false)"
            >
              Log In
            </RouterLink>
          </template>

          <template v-else>
            <RouterLink
              :to="{ name: 'home' }"
              class="button link"
              @click.prevent="$emit('update:when', false)"
            >
              Home
            </RouterLink>

            <hr />

            <button class="button link link--logout" @click="handleLogout">
              Logout
            </button>
          </template>
        </nav>
      </section>
    </div>
  </transition>
</template>

<style scoped>
.link {
  @apply block !w-full text-left;
}
</style>
