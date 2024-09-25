<script setup>
import {  RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import {onMounted, provide, ref, watch} from 'vue';
import axios from 'axios';
const days = ref([]);
const debtsData = ref([]);
const fetchBool = ref(false);
let st = new Date();
const firstDay = 2;
st.setDate(firstDay);

onMounted(async() =>{
 await fetchDays();
 await fetchDebtsData();
});

const fetchDays = async() =>{
  const {data} = await axios.get('https://d08619ba4a5f18bd.mokky.dev/days');
  days.value = data;  
  setTimeout(() => {
    fetchBool.value = true;
  }, 300);
};

const fetchDebtsData = async() =>{
  const today = new Date();
  debtsData.value = [];
  const diffDays = Math.ceil(Math.ceil((today - st) / (1000 * 60 * 60))/24);
  for(let i = 0; i < days.value.length; i++){
    if(days.value[i].id < diffDays){
      let day = {
        day: days.value[i].id,
        arr: []
      }
      
      for(let j = 0; j < days.value[i]['arr'].length; j++ ){
        if(days.value[i]['arr'][j] != undefined && days.value[i]['arr'][j].sum != days.value[i]['arr'][j].count)
             day.arr.push(days.value[i]['arr'][j]);
      }
      if(day.arr.length != 0)
      debtsData.value.push(day);
    }
  }
}

provide('days', days);
provide('debtsData', debtsData);
provide('firstDay', firstDay);
provide ('fetchDays', fetchDays());
provide('bool', fetchBool);
watch(days,async() =>{
     console.log("sdfbgnh");
  }, {deep: true});
</script>
<template>
  <Header/>
  <RouterView></RouterView>
</template>

<style scoped>
</style>
