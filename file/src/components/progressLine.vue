<template>
    <div class="progressLine">
            <div class="activeLine" :style="{ width :`${number/sum * 100}%` }" :class = "colorLine"></div>
    </div>
</template>
<script setup>
import {watch, onMounted, ref} from 'vue';
const props = defineProps({
    number: Number,
    sum: Number
});
const colorLine = ref('');
const colorCheck = () =>{
    if((props.number/props.sum * 100) <= 33){
        colorLine.value = 'red';
    }else if((props.number/props.sum * 100) > 33 && (props.number/props.sum * 100) <=66){
        colorLine.value = 'midColor';
    }else{
        colorLine.value = 'Green';
    }
};

onMounted(() =>{
    colorCheck();
});
watch(props, ()=>{
    colorCheck();
}, {deep: true});
</script>
<style scoped>
/* progress line */
.progressLine{
    width: 100%;
    height: 4px;
    background-color: #ccc;
    margin: 20px 0 10px;
    border-radius: 50px;
}
.activeLine{
    height: 4px;
    transition: all .3s;
    border-radius: 50px;

}
.Green{
    background-color: #00cc88;
}
.midColor{
    background-color: #f3af3b;
}
.red{
    background-color: red;
}
</style>