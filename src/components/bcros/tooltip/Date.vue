<template>
  <BcrosTooltip
    :text="dateToPacificDateTime(displayDate)"
    :popper="{
      placement: 'right',
      arrow: true
    }"
  >
    <span class="font-13 underline decoration-dotted">
      {{ dateToPacificDate(displayDate) }}
    </span>
  </BcrosTooltip>
</template>

<script setup lang="ts">
import { dateToPacificDateTime } from '#imports'

const props = defineProps({
  date: { type: String, required: true }
})

const displayDate = computed(() => new Date(props.date))
</script>
