<template>
<div class="head_time" :class = "[classColor, activeBool?'active':'']">
            <div class="text">Осталось времени:</div>
            <div class="time"><div class="days" v-if = "days != 0">{{ days }} : </div> {{ hours }} : {{ minutes }} : {{ seconds }}</div>
            <img :src="imgBool?clockGif:clockPng" alt="" class="time_gif">
        </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import clockGif from '@/assets/icons8-clock.gif';
import clockPng from '@/assets/icons8-time-30.png';
const props = defineProps({
    st: Number
});
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const activeBool = ref(false);
const imgBool = ref(true);
const nextDay = new Date();
const classColor = ref('');
nextDay.setHours(24, 0, 0, 0); 
setInterval(() => {
    updateTime();
  }, 500);
const updateTime = async() =>{    
    const now = new Date();
    const timeDifference = nextDay - now;
    let h = 0; 
    imgBool.value = true;
    if(props.st > now || props.st.getDate() == now.getDate()){
        h = Math.ceil((props.st - now) / (1000 * 60 * 60))/24;
        days.value = h;
        hours.value = Math.floor(timeDifference / (1000 * 60 * 60));
        minutes.value = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        seconds.value = Math.floor((timeDifference % (1000 * 60)) / 1000);
        hours.value = hours.value.toString().padStart(2, '0');
        minutes.value = minutes.value.toString().padStart(2, '0');
        seconds.value = seconds.value.toString().padStart(2, '0');

        if(hours.value >=6 || days.value > 0){
            classColor.value = 'green';
        }else if(hours.value <6 && hours.value != 0){
            classColor.value = 'midColor'
        }else if(hours.value == 0){
            classColor.value = "red";
            activeBool.value = !activeBool.value;
        }
    }
    if(now > props.st && props.st.getDate() != now.getDate()){
        imgBool.value = false;
        classColor.value = '';
        days.value = 0;
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
    }
  };

  onMounted(async() =>{
     await updateTime();
  });

</script>

<style scoped>
.head_time{
    display: flex;
    gap: 10px;
    align-items: center;
    transition: all .3s;
    color: #888686;
}
.time{
    display: flex;
    gap: 5px;
    font-weight: 600;

}
.text, .days{
    font-weight: 600;

}
.time_gif{
    width: 23px;
}
.active{
    transform: scale(1.08);
}
.green{
    color: green;
}
.midColor{
    color: #f3af3b;
}
.red{
    color: red;
}
</style>