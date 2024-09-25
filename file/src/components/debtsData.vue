<template>
    <div class="container" v-if = "fetchBool">
        <DebtsBlockExList v-for = 'i in filteredData' :id = "i.id" :arr = "i.arr" />
    </div>
    <div class="ifEmpty" v-else-if = "fetchBool && filteredData.length == 0">
        <img src="https://media.tenor.com/_39pDmVYBREAAAAi/good-enough-good-things.gif" alt="">
        <div class="ifEmpty_text">
            Нету Долгов
        </div>
    </div>
    <loading v-else/>

</template>
<script setup>
import DebtsBlockExList from '@/components/DebtsBlockExList.vue';
import {inject, ref, computed, watch} from 'vue';
import loading from '@/components/loading.vue';
import axios from 'axios';
const data = inject('debtsData');
let days = inject('days');
const fetchBool = inject('bool');
let filteredData = ref([]);

filteredData = computed(() =>{
    return filterData();
})
const filterData = () =>{
    let debtsData = [];
    for(let i = 0; i < data.value.length; i++){
        let day = {
        id: data.value[i].day,
        arr: []
      }
      for(let j = 0; j < data.value[i].arr.length; j++ ){
        if(data.value[i]['arr'][j] != undefined && data.value[i]['arr'][j].sum != data.value[i]['arr'][j].count)
             day.arr.push(data.value[i]['arr'][j]);
      }
      if(day.arr.length != 0)
        debtsData.push(day);
    }
    return debtsData;
}


watch(filteredData, async() =>{
    console.log("debts");
    const {data} = await axios.patch(`https://d08619ba4a5f18bd.mokky.dev/days`, days.value);    
}, {deep: true});


</script>

<style scoped>

/* if Empty */
.ifEmpty{
    display: flex;
    align-items: center ;
    flex-direction: column;
    padding: 40px 0;
}
.ifEmpty img{
    width: 45%;
}
.ifEmpty_text{
    font-size: 35px;
    font-weight: 500;
}


/* container */
.container{
    padding: 20px;
    max-height: 80vh;
    overflow: hidden;
    overflow:auto;
}

</style>
