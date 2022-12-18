<template>
  <form @submit="handleSubmit">
    <div class="grid md:grid-cols-3 gap-4">
      <TextInput
        v-model="model.name"
        :disabled="disabled"
        label="Patron Name"
        placeholder="John Smith"
      />
      <TextInput
        v-model="model.email"
        :disabled="disabled"
        label="Patron Email"
        placeholder="john@smith.com"
        type="email"
      />
      <TextInput
        v-model="model.partySize"
        :disabled="disabled"
        label="Party Size"
        placeholder="1"
        type="number"
      />
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <TextSelect
        v-model="model.reservationDate"
        :items="selectDates"
        label="Date"
      />
      <TextSelect
        v-model="model.reservationTime"
        :items="selectTimes"
        label="Time"
      />
    </div>

    <div class="text-right">
      <LabelButton :disabled="disabled" color="emerald" type="submit">
        Create Reservation
      </LabelButton>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import LabelButton from '@/components/common/LabelButton.vue'
import TextInput from '@/components/common/TextInput.vue'
import { appConstants } from '@/constants/app.constants'
import { CreateReservationModel } from '@/types/CreateReservationModel'
import { formatDate, formatDateWithWeekday } from '@/utils/date-utils'
import TextSelect from '@/components/common/TextSelect.vue'

interface CreateReservationFormState {
  model: CreateReservationModel
}

export default Vue.extend({
  components: { TextSelect, LabelButton, TextInput },
  props: {
    currentRestaurantId: { type: Number, required: true },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    selectDates(): Record<string, string> {
      const now = new Date()
      const output: Record<string, string> = {}
      output[formatDateWithWeekday(now)] = formatDate(now)
      for (let i = 0; i < appConstants.forwardReservationDates; i++) {
        now.setDate(now.getDate() + 1)
        output[formatDateWithWeekday(now)] = formatDate(now)
      }
      return output
    },
    selectTimes(): Record<string, number> {
      const output: Record<string, number> = {}

      for (let i = 0; i < 24; i++) {
        const hours = i === 0 ? 12 : i
        let meridiem = 'am'
        if (hours >= 12 && i > 0) {
          meridiem = 'pm'
        }

        for (let j = 0; j < 4; j++) {
          const minute = String(j * appConstants.reservationTimeSlot).padStart(
            2,
            '0'
          )
          output[`${hours > 12 ? hours - 12 : hours}:${minute}${meridiem}`] =
            Number.parseInt(`${hours}${minute}`)
        }
      }

      return output
    }
  },
  data(): CreateReservationFormState {
    const now = new Date()
    return {
      model: {
        email: '',
        name: '',
        partySize: '1',
        reservationDate: `${now.getFullYear()}-${
          now.getMonth() + 1
        }-${now.getDate()}`,
        reservationTime: 1730,
        restaurantId: this.currentRestaurantId
      }
    }
  },
  methods: {
    handleSubmit(e: Event): void {
      e.preventDefault()
      this.$emit('submit', this.model)
    }
  }
})
</script>
