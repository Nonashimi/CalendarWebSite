<template>
    <div class="debt">
        <div class="relative">
            <div class="text">
            Debts
        </div>
        <img :src="circle" alt="">
        </div>
    </div>
</template>

<script setup>
import circle from "@/assets/icons8-circle-100.png";
</script>

<style scoped>
.debt{
    cursor: pointer;
}
.debt img{
    width: 40px;
    z-index: 0;
}
.relative{
    position: relative;
}
.text{
    z-index: 5;
    font-size: 10px;
    top: 25%;
    left: 15%;
    color: rgb(87, 16, 181);
    position: absolute;
    font-weight: 500;
}
</style>