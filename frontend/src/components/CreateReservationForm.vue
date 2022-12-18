<template>
  <form @submit="handleSubmit">
    <div class="grid md:grid-cols-3 gap-4">
      <div>
        <TextInput
          v-model="model.name"
          :disabled="disabled"
          label="Patron Name"
          placeholder="John Smith"
        />
      </div>
      <div>
        <TextInput
          v-model="model.email"
          :disabled="disabled"
          label="Patron Email"
          placeholder="john@smith.com"
          type="email"
        />
      </div>
      <div>
        <TextInput
          v-model="model.partySize"
          :disabled="disabled"
          label="Party Size"
          placeholder="1"
          type="number"
        />
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <TextSelect
          v-model="model.reservationDate"
          :items="selectDates"
          label="Date"
        />
      </div>

      <div>
        <TextSelect
          v-model="model.reservationTime"
          :items="selectTimes"
          label="Time"
        />
      </div>
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
import { CreateReservationModel } from '@/types/CreateReservationModel'
import { formatDate, formatDateWithWeekday } from '@/utils/date-utils'
import TextSelect from '@/components/common/TextSelect.vue'

interface CreateReservationFormState {
  model: CreateReservationModel
}

const forwardReservationDates = 10
const reservationTimeSlot = 15

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
      for (let i = 0; i < forwardReservationDates; i++) {
        now.setDate(now.getDate() + 1)
        output[formatDateWithWeekday(now)] = formatDate(now)
      }
      return output
    },
    selectTimes(): Record<string, string> {
      const output: Record<string, string> = {}

      for (let i = 0; i < 24; i++) {
        let hour = i === 0 ? 12 : i
        let meridiem = 'am'
        if (hour >= 12 && i > 0) {
          hour = hour === 12 ? hour : hour - 12
          meridiem = 'pm'
        }

        for (let j = 0; j < 4; j++) {
          const minute = String(j * reservationTimeSlot).padStart(2, '0')
          output[
            `${hour}:${minute}${meridiem}`
          ] = `${hour}:${minute}${meridiem}`
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
        reservationTime: '5:30pm',
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
