<template>
    <div class="page">
        <div class="activePage" v-if = "fetchBool">
            <div class="head">
            <div class="head_days">
                <div class="back" @click="$router.back()">
            <img src="@\assets\9054423_bx_arrow_back_icon.png" alt="">
        </div>
        <div class="days" @click="date">
            <div class="calDay">
                {{routerParam}}
                день
            </div>
            /
            <div class="dateDay">
                {{ st.getDate() }} {{ st.toLocaleString('default', { month: 'long' }) }}
            </div>
            </div>
        </div>
        <Time :st = "st"/>

        </div>
        <div class="container">
            <div class="progress">
                <h1>Прогресс:</h1>
                <progressBar :percent="percent"/>
            </div>
            <div class="toDoList">
                <h1>Задачи:</h1>

                <BlockExList :arr = "sortedData" :isPast = 'isPast'/>
            </div>
                </div>
        </div>
        <loading v-else />
       
    </div>
</template>

<script setup>
import {ref, computed, onMounted, watch, inject} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import progressBar from '@/components/ProgressBar.vue';
import Time from '@/components/time.vue';
import BlockExList from '@/components/BlockExList.vue';
import loading from '@/components/loading.vue';
const days = inject('days');
const dayData = ref([]);
let sortedData = ref([]);
const firstDay = inject('firstDay');
let routerParam = ref(0);
let st = new Date();
let today = new Date(); 
const fetchBool = ref(false);
const isPast = ref(false);
onMounted(async() =>{
    const route = useRoute();
    routerParam.value =  route.params.id;
    await inject('fetchDays');
    await updateSTime();
    await fetchData();
    await isItPast();
    checkComplete();
});
const isItPast = async()=>{
    isPast.value = st.getDate() == today.getDate();
};
const updateSTime = async() =>{
    st.setDate(firstDay + parseInt(routerParam.value) -1);
}
const fetchData = async() =>{
    dayData.value = [...days.value[routerParam.value - 1]['arr']];
    fetchBool.value = true;

};
const percent = ref(0);

const checkComplete = () =>{
    for(let i = 0; i < dayData.value.length; i++){
        dayData.value[i].isComplete = dayData.value[i].count >= dayData.value[i].sum;
    }
}
const updateData = async() =>{
    const newData = {
        arr:[]
    };
    newData.arr = dayData.value;
    const {data} = await axios.patch(`https://d08619ba4a5f18bd.mokky.dev/days/${routerParam.value}`, newData);

};
const updatePercent = () =>{
    const number = dayData.value.length;
    let sumOfdata = 0;
    console.log(number);
    for(let i = 0; i < number; i++){
        let p = dayData.value[i].count/(dayData.value[i].sum/(100/number));
        p =  parseFloat(p.toFixed(1));
        sumOfdata+=p;
    }
    percent.value = sumOfdata;
    percent.value = parseFloat(Math.ceil(percent.value));
}
const sortData = ()=>{
     return [...dayData.value].sort((a, b) => {
   return (a.isComplete === b.isComplete) ? 0 : a.isComplete ? 1 : -1;
     })
};

sortedData = computed(() =>{
    return sortData();
});

watch(dayData, async() => {
    updatePercent();
     checkComplete();
     await updateData();
     
},{deep: true});
  </script>
<style scoped>
h1{
    font-size: 25px;
    padding: 10px 0 0;
    color: #8a8989;
    
}
h2{
    font-size: 17px;
    padding: 5px 20px 10px;
    max-width: 30%;
    background-color: rgb(231, 226, 255);
    border-left: 5px solid rgb(87, 16, 181);
    margin: 15px 0 10px;
}
.page{
    width: 1000px;
    margin: 0 auto 30px;
    background-color: #fff;
    border-radius: 20px;
    min-height: 100vh;
    position: relative;
}
.page img{
    width: 20px;
}
.back {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: all .3s;
}
.back img{
    width: 25px;
}
.back:hover{
    transform: translateX(-5px);
}
.days{
    display: flex;
    align-items: center;
    font-size: 25px;
    color: #8a8989;
    gap: 5px;
}
.head{
    display: flex;
    gap: 10px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 20px 20px 15px 20px;
    justify-content: space-between;
}
.head_days{
    display: flex;
    gap: 10px;
}

.container{
    padding: 0 30px 30px;
}

.progress{
    border-bottom: 1px solid #ccc;
}
</style>