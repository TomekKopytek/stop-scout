<template>
  <input
    v-focus
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    type="text"
    placeholder="Wyszukaj przystanek"
    class="w-full p-3 border rounded mb-4"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits([
  'update:modelValue'
])
</script>