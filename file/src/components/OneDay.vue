<template>
 <div class="block"  @click="$router.push(`/day/${day}`)" :class = "st.getDate() ==st2.getDate()?'active':'hov', st < st2?'gray':''" >
    <div class="day">{{ day }}</div>
    <div class="some_info">
        <nav>
            <!-- <li v-for="i, index in li.push_ups"><span>{{index}}.</span> {{}}</li> -->
        </nav>
    </div>
    <!-- <div class="stat" v-if="focus" >
        <img src="@\assets\icons8-ок-50.png" alt="" v-if = 'complete' >
        <img src="@\assets\icons8-не-беспокоить-50.png" alt="" v-else>
        <div class="status" :class = "complete?'complete':'notComplete'">
        </div>
        
    </div> -->
    
  </div>
</template>

<script setup>
import {ref, inject} from 'vue';
const props = defineProps({
    day:Number,
    li: String
});
const complete = ref(false);
const focus = ref(false);

const onFocus = () =>{
    focus.value = true;
}
const FocusOut = () =>{
    focus.value = false;
}
const firstDay = inject('firstDay');
const st = new Date();
const st2 = new Date();
st2.setDate(firstDay + parseInt(props.day) -1);

</script>

<style scoped>
.block{
  position: relative;
  width: 200px;
  height: 100px;
  padding: 20px 20px 20px 30px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ccc;
  transition: all .3s;
}
.hov:hover{
    border: 1px solid #9919f4;
    z-index: 3;
}

.day{
    position: absolute;
    top: 3%;
    left: 3%;
}

.status{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    transition: all .3;
}
.stat img{
    position: absolute;
    top: 25%;
    right: 0;
    z-index: 6;
    margin-right: 5px;
}

.active{
    border: 1px solid #8e19f4;
    z-index: 3;
}


.complete{
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 40%, rgba(76, 245, 4, 0.5) 100%);

}
.notComplete{
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 40%, rgba(247, 59, 7, 0.5) 100%);

}


.some_info{
    height: 70px;
    overflow: hidden;
}
nav{
    list-style: none;
}
span{
    font-weight: 500;
}
.gray{
    opacity: .6;
    pointer-events: none;
}
</style>