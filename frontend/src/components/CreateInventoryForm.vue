<template>
  <form @submit="handleSubmit">
    <AlertNotice v-if="formError" type="warning">
      {{ formError }}
    </AlertNotice>

    <div class="grid md:grid-cols-3 gap-4">
      <TextInput
        v-model="model.label"
        label="Inventory Label"
        placeholder="Outdoor Terrace zone 1"
      />
      <TextInput
        v-model="model.availableSlots"
        label="Available Reservations"
        placeholder="1"
        type="number"
      />
      <TextInput
        v-model="model.partySize"
        label="Max Party Size"
        placeholder="1"
        type="number"
      />
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <TextSelect
        v-model="model.startTime"
        :empty-state="0"
        :items="startTimes"
        label="Start Time"
        @change="handleStartTimeChange"
      />
      <TextSelect
        :key="`input-endtime_${renderKey}`"
        :empty-state="0"
        v-model="model.endTime"
        :items="endTimes"
        label="End Time"
      />
    </div>

    <div class="text-right">
      <LabelButton :disabled="disabled" color="emerald" type="submit">
        Create Inventory
      </LabelButton>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import LabelButton from '@/components/common/LabelButton.vue'
import TextInput from '@/components/common/TextInput.vue'
import TextSelect from '@/components/common/TextSelect.vue'
import { appConstants } from '@/constants/app.constants'
import { CreateInventoryModel } from '@/types/CreateInventoryModel'
import AlertNotice from '@/components/common/AlertNotice.vue'

interface CreateInventoryFormState {
  formError: string
  model: CreateInventoryModel
  renderKey: number
}

export default Vue.extend({
  components: { AlertNotice, TextSelect, LabelButton, TextInput },
  props: {
    currentRestaurantId: { type: Number, required: true },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    startTimes(): Record<string, number> {
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
    },
    endTimes(): Record<string, number> {
      if (!this.model.startTime) {
        return this.startTimes
      }
      const output = this.startTimes
      for (const record in output) {
        if (this.startTimes[record] < this.model.startTime) {
          delete output[record]
        }
      }
      return output
    }
  },
  data(): CreateInventoryFormState {
    return {
      formError: '',
      model: {
        label: '',
        startTime: 0,
        endTime: 0,
        availableSlots: 1,
        partySize: 1,
        restaurantId: this.currentRestaurantId
      },
      renderKey: new Date().getMilliseconds()
    }
  },
  methods: {
    handleStartTimeChange(): void {
      if (
        this.model.endTime &&
        !Object.values(this.endTimes).includes(this.model.endTime)
      ) {
        this.model.endTime = 0
      }
      this.renderKey = new Date().getMilliseconds()
    },
    handleSubmit(e: Event): void {
      e.preventDefault()
      this.formError = ''
      if (!this.validateModel()) {
        this.formError = 'Please double check your Inventory details'
        return
      }
      this.$emit('submit', this.model)
    },
    validateModel(): boolean {
      return !!(
        this.model.startTime &&
        this.model.startTime > -1 &&
        this.model.endTime &&
        this.model.endTime > -1 &&
        this.model.availableSlots &&
        this.model.availableSlots > 0 &&
        this.model.partySize &&
        this.model.partySize > 0 &&
        this.model.restaurantId
      )
    }
  }
})
</script>
