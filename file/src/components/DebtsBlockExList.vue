<template>
<div class="list">
        <day :day = "id"/>
        <BlockExList :arr = "arr" :isPast = "true"/>
</div>
</template>
<script setup>
import BlockExList from '@/components/BlockExList.vue';
import day from '@/components/day.vue';
import  {watch, watchEffect} from 'vue';
const props = defineProps({
    id: Number,
    arr: Array
});

// watchEffect(props, ()=>{
//     console.log("scdvfbg");
    
// },{deep: true});

</script>
<style scoped>
.list{
    padding: 5px;
}
</style>