import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import {
  ROUTE_NAME_CREATE_RESERVATION,
  ROUTE_NAME_INVENTORY,
  ROUTE_NAME_RESERVATIONS
} from '@/router/constants'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: ROUTE_NAME_RESERVATIONS
  },
  {
    path: '/reservations',
    name: ROUTE_NAME_RESERVATIONS,
    component: () =>
      import(
        /* webpackChunkName: "reservations" */ '../views/ReservationsView.vue'
      )
  },
  {
    path: '/reservations/create',
    name: ROUTE_NAME_CREATE_RESERVATION,
    component: () =>
      import(
        /* webpackChunkName: "reservations" */ '../views/CreateReservationView.vue'
      )
  },
  {
    path: '/inventory',
    name: ROUTE_NAME_INVENTORY,
    component: () =>
      import(/* webpackChunkName: "inventory" */ '../views/InventoryView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
