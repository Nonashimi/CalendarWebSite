<template>
    <div class="list" v-for = "i in arr" :class = "isEdit?'':'pointer-events-none'" v-auto-animate>
        <exerciseBlock :is-edit = "isEdit" :id = "i.id" :key="i.title" v-model:title="i.title" v-model:approach="i.approach" v-model:quantity="i.quantity" v-model:is-every-day="i.isEveryDay" @clickEveryDay = "clickEveryDay(i)" @clickNotEveryDay = "clickNotEveryDay(i) " @clickDelete = "$emit('clickDelete', i.id)"/>
    </div>
</template>
<script setup>
import exerciseBlock from "@/components/exerciseBlock.vue";
const props = defineProps({
    arr: Array,
    isEdit: Boolean
});
const emit = defineEmits(['clickDelete']);
const clickEveryDay = (item) =>{
    item.isEveryDay = true;
}
const clickNotEveryDay = (item) =>{
    item.isEveryDay = false;
}
</script>
<style scoped> 
.list{
    display: flex;
    margin-bottom: 10px;
}
.pointer-events-none{
    pointer-events: none;
}
</style>