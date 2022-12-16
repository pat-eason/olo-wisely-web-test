<template>
  <nav id="layout--navigation">
    <ul>
      <li v-for="record in records" :key="`nav_${record.routeName}`">
        <router-link :to="{ name: record.routeName }">
          <font-awesome-icon
            v-if="record.icon"
            :icon="record.icon"
            class="pr-2"
          />
          {{ record.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

import {
  ROUTE_ICON_INVENTORY,
  ROUTE_ICON_RESERVATIONS,
  ROUTE_NAME_INVENTORY,
  ROUTE_NAME_RESERVATIONS
} from '@/router/constants'

interface NavigationRecord {
  label: string
  routeName: string
  icon?: string
}

export default Vue.extend({
  computed: {
    records(): NavigationRecord[] {
      return [
        {
          label: 'Reservations',
          routeName: ROUTE_NAME_RESERVATIONS,
          icon: ROUTE_ICON_RESERVATIONS
        },
        {
          label: 'Inventory',
          routeName: ROUTE_NAME_INVENTORY,
          icon: ROUTE_ICON_INVENTORY
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
$base-padding: 1.25rem;

li {
  border-bottom: 1px solid #bae6fd;

  &:last-child {
    border-bottom: none;
  }

  a {
    color: #075985;
    display: block;
    padding: ($base-padding / 2) $base-padding;
    transition: 0.2s all;

    &:hover,
    &.router-link-active {
      background: rgb(2, 132, 199);
      background: linear-gradient(
        90deg,
        rgba(2, 132, 199, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      color: #fff;
      padding-left: $base-padding * 1.5;
    }
  }
}
</style>
