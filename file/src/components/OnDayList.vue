<template>
    <div class="BlockList">
        <OneDay v-for = 'i in days' :day = "i.id" :li = "''"/>
    </div>
    
</template>
<script setup>
import OneDay from '@/components/OneDay.vue';
import {inject} from 'vue';
const days = inject('days');
</script>
<style scoped>
.BlockList{
  display: grid;
  grid-template-columns: repeat(5, 200px);
  max-width: 1000px;
  margin: auto;
}

</style>