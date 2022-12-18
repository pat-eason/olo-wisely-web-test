<template>
  <transition name="notice--alert-fade">
    <div
      :class="{
        'bg-sky-100 text-sky-700': type === 'info',
        'bg-amber-100 text-amber-700': type === 'warning',
        'bg-rose-100 text-rose-700': type === 'danger',
        'bg-emerald-100 text-emerald-700': type === 'success'
      }"
      class="notice--alert flex rounded-lg text-sm px-5 py-4 w-full"
    >
      <div v-if="alertIcon" class="flex-none">
        <font-awesome-icon :icon="alertIcon" />
      </div>
      <div class="pl-3 flex-1">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type AlertType = 'info' | 'warning' | 'danger' | 'success'

export default Vue.extend({
  props: {
    type: {
      type: String as PropType<AlertType>,
      default: 'info'
    }
  },
  computed: {
    alertIcon(): string {
      switch (this.type) {
        case 'info':
          return 'fas fa-clipboard'
        case 'warning':
        case 'danger':
          return 'fas fa-exclamation-triangle'
        case 'success':
          return 'fas fa-check-circle'
        default:
          return ''
      }
    }
  }
})
</script>

<style lang="scss">
.notice--alert {
  &-fade {
    &-enter-active,
    &-leave-active {
      transition: all 0.25s ease-in-out;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translateY(10px) scale(0.75);
    }
  }
}
</style>
