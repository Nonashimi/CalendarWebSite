<template>
    <div class="flex">
        <div class="exerciseBlock">
        <header><div ><input type="text" class="head_input" :value="title" @input="updateTitle"></div>
            <div class="count">Количество: {{approach * quantity}}</div>
        </header>
        <div class="ex_data">
            <div class="quantity">подходов:
                <input type="number" name="" id="" class = "ex_input" :value = "quantity" @input="updateQuantity"> </div>
            <div class="approach">approach: <input type="number" name="" id="" class = "ex_input"  :value = "approach" @input="updateApproach"> </div>
            <div class="buttons">
                <button class = "right" :class = 'isEveryDay?"active":"notActive"' @click="() =>$emit('clickEveryDay')">
                    каждый день
                </button>
                <button class = "left" :class = '!isEveryDay?"active":"notActive"' @click="() =>$emit('clickNotEveryDay')">
                    через день
                </button>
            </div>
        </div>
    </div>
    <div class="trash" v-if = "isEdit" @click = "$emit('clickDelete')">
        <img :src="trash" alt="">
    </div>
    </div>

</template>
<script setup>
import trash from "@/assets/icons8-trash-52.png";
const props = defineProps({
    id: Number,
    title: String,
    approach: Number,
    quantity: Number,
    isEveryDay: Boolean,
    isEdit: Boolean
});
const emit = defineEmits(['clickEveryDay', 'clickDelete', 'clickNotEveryDay', 'update:approach', 'update:quantity', 'update:title']);
const updateApproach = (event) =>{
    emit('update:approach', event.target.value - 0);
}
const updateQuantity = (event) =>{
    emit('update:quantity', event.target.value - 0);
}
const updateTitle = (event) =>{
    emit('update:title', event.target.value);
}
</script>
<style scoped>
.exerciseBlock{
    display: flex;
    flex-direction: column;
    margin: 5px 20px 5px 5px;
    border-radius: 15px;
    max-width: 685px;
}


header{
    font-size: 17px;
    padding: 5px 20px 10px;
    background-color: rgb(231, 226, 255);
    border-radius: 15px 15px 0 0;
    display: flex;
    justify-content: space-between;
    /* border-left: 5px solid rgb(87, 16, 181); */
}
.ex_data{
    display: flex;
    padding: 15px 25px;
    justify-content: space-between;
    font-size: 17px;
    background-color: #f5f4f4;
    border-radius: 0 0 15px 15px;
    align-items: center;
}
.active{
    background-color: rgb(231, 226, 255);
}
.notActive{
    background-color: #fff;
}
.notActive:hover{
    background-color: #f0efef;
}

.buttons{
    display: flex;
}
.left, .right{
    padding: 15px;
    width: 120px;
    border: none;
    cursor: pointer;
    transition: all .3s;
}

.right{
    border-radius: 15px 0 0 15px;
}
.left{
    border-radius: 0 15px 15px 0;
}

input{
    outline: none;
    border: none;
    transition: all .3s;
}
.ex_input{
    background-color: #f5f4f4;
    width: 25%;

}
.head_input{
    background-color: rgb(231, 226, 255);
}

.head_input:hover, .head_input:focus{
    border-bottom: 1px solid purple;
}


.ex_input:hover, .ex_input:focus{
    background-color: #dbdada;
}



.flex{
  display: flex;
  grid: 20px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}
.flex img{
    width: 20px;
}
.trash{
    width: 60px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d7d4d4;
    transition: .3s;
    border-radius: 50%;
    cursor: pointer;
}
.trash:hover{
    background-color: #e4e2e2;

}
</style>