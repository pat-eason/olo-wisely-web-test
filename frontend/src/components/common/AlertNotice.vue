<template>
  <transition name="notice--alert-fade">
    <div
      :class="{
        'bg-blue-200 text-blue-700': type === 'info',
        'bg-yellow-200 text-yellow-700': type === 'warning',
        'bg-red-200 text-red-700': type === 'danger'
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

type AlertType = 'info' | 'warning' | 'danger'

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
          return 'fa-clipboard'
        case 'warning':
        case 'danger':
          return 'fa-exclamation-triangle'
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
