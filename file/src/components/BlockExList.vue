<template>
        <div class="list" v-auto-animate>
        <BlockEx v-for="item, index in arr" :isPast = "isPast"  :key = "item.title" :title = 'item.title' :sum = "item.sum" :number = "item.count" :isComplete="item.isComplete" :approach="item.approach" @add = "add(item)" @Addcomplete = 'Addcomplete(item)'/>
        </div>
</template>

<script setup>
import BlockEx from '@/components/BlockEx.vue';
const props = defineProps({
 arr: Array,
 isPast: Boolean,
});

const add = (item) =>{
    if(item.count < item.sum)
    item.count += item.approach;
}
const Addcomplete = (item) =>{
    item.count = item.sum;
}

</script>

<style scoped>
</style>