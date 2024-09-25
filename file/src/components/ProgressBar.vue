<template>
      <div class="progress-circle">
  <svg class="progress-circle-svg">
    <circle class="progress-circle-bg" cx="200" cy="200" r="180"></circle>
    <circle class="progress-circle-bar" :class="colorBar" cx="200" cy="200" r="180"></circle>
  </svg>
  <div class="progress-circle-text">{{percent}}%</div>
  </div>
</template>

<script setup>
import {watch, ref, onMounted} from 'vue';
const props = defineProps({
    percent: Number
});
const colorBar = ref('');

const colorCheck = () =>{
    if(props.percent <= 33){
        colorBar.value = 'red';
    }else if(props.percent > 33 && props.percent <=66){
        colorBar.value = 'midColor';
    }else{
        colorBar.value = 'green';
    }
};
onMounted(() =>{
  progressBar();
 colorCheck();
});
const progressBar = () =>{
  const progressCircle = document.querySelector('.progress-circle');
  const progressValue = props.percent;
  const progressBar = progressCircle.querySelector('.progress-circle-bar');
  const circumference = 2 * Math.PI * 180; 
  progressBar.style.strokeDashoffset = circumference - (progressValue / 100) * circumference;
};
watch(props, () =>{
    progressBar();
    colorCheck();
}, {deep: true});
</script>

<style scoped>

.progress-circle {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 50px auto 20px; 
}

.progress-circle-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-circle-bg,
.progress-circle-bar {
  fill: none;
  stroke-width: 15;
}

.progress-circle-bg {
  stroke: #e6e6e6;
}

.progress-circle-bar {
  stroke-dasharray: 1131; 
  stroke-dashoffset: 1131;
  transition: all .6s ease;

}

.progress-circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
  color: #666666;
}

.green{
    stroke: #00cc88;
}
.midColor{
    stroke: #f3af3b;
}
.red{
    stroke: red;
}
</style>