<template>
    <div class="container">
        <div class="functions" v-if = "isOpen">
            <debts @click = '() => $emit("openDebtsPage")'/>
            <addButton @click = '() => $emit("openEditPage")'/>
        </div>
        <div class="other" @click="clickOthers">
            <img :src="isOpen?openOther:closeOther" alt="">
        </div>
    </div>

</template>
<script setup>
import closeOther from "@/assets/icons8-other-100.png";
import openOther from "@/assets/icons8-other-100 (1).png";
import debts from '@/components/debts.vue';
import addButton from '@/components/addButton.vue';
import {ref} from 'vue';
const emit = defineEmits(['openDebtsPage', 'openEditPage']);
const isOpen = ref(false);
const clickOthers = () =>{
    isOpen.value = !isOpen.value;
};
</script>
<style scoped>
.container{
    position: fixed;
    bottom: 10%;
    right: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.other img{
    width: 40px;
    cursor: pointer;
}
</style>