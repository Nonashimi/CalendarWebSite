<template>
  <h2>{{ $props.day }} день /  
                            <div class="dateDay">
                  {{ day }} {{ st.toLocaleString('default', { month: 'long' }) }}
            </div>
        </h2>
</template>
<script setup>
import {onMounted, inject, ref, watch} from 'vue';
const props = defineProps({
    day: Number
});
const firstDay = inject('firstDay');
onMounted(() =>{
    updateSTime();
})
const st = new Date();
const day = ref(st.getDate());
const updateSTime = () =>{
     st.setDate(firstDay + parseInt(props.day) -1);
    day.value = st.getDate() ;
}

watch(props, ()=>{
    updateSTime();
}, {deep: true});
</script>
<style scoped>
h2{
    color: #ccc;
    display: flex;
}
</style>