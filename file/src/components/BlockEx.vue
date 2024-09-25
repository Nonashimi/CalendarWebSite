<template>
    <div class="blockEx">
        <h2>{{ title }}</h2>
    <div class="pushUp">
        <div class="text_flex">
            <div class="text" :class = "sum == number?'Green':''">{{ sum }} / {{ number }}</div>
            <div class="pushFunctions">
                <div class="text" :class = "sum == number?'Green':''">сделано подходов: {{ number/approach }}</div>
                <img class = "addNumber" :class = "sum == number?'nonActive':''" src="@\assets\icons8-плюс-100.png" alt="" @click="$emit('add')" v-show="isPast">
                <img class = "complete" :src="sum == number?complete:unComplete" alt="" @click="$emit('Addcomplete')" v-show="isPast">
            </div>
        </div>
        <progressLine :number = 'number' :sum = "sum"/>
    </div>
    </div>
</template>

<script setup>
import complete from '@/assets/icons8-окey-50.png';
import unComplete from '@/assets/icons8-ок-100.png';
import progressLine from '@/components/progressLine.vue';
const props = defineProps({
    number:Number,
    isComplete:Boolean,
    sum: Number,
    approach: Number,
    title: String,
    isPast: Boolean
});
const emit = defineEmits(['add', 'Addcomplete']);
</script>

<style scoped>

h2{
    font-size: 17px;
    padding: 5px 20px 10px;
    max-width: 30%;
    background-color: rgb(231, 226, 255);
    border-left: 5px solid rgb(87, 16, 181);
    margin: 15px 0 15px;
}

/* push ups */

.pushUp{
    padding: 10px 15px;
    justify-content: space-between;
    background-color: #f5f4f4;
    border-radius: 15px;
    margin: 10px 0;
}
.text{
    font-size: 18px;
}
.text_flex{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
.addNumber{
    cursor: pointer;
    width: 30px;

}
.pushFunctions{
    display: flex;
    align-items: center;
    gap: 15px;
}
.complete{
    width: 30px;
    cursor: pointer;
}
.Green{
    color: #00cc88;
}
.nonActive{
    cursor: auto;
}
</style>