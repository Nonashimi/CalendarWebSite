<template>
    <SubBlock :head-text="'Добавление'" @close-page="$emit('closePage')"><addData @close-page="$emit('closePage')"/></SubBlock>
</template>

<script setup>
import SubBlock from '@/components/SubBlock.vue';
import addData from "@/components/addData.vue";
const emit = defineEmits(['closePage']);
</script>

<style scoped>

</style>