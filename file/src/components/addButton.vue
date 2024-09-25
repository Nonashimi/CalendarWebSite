<template>
    <div class="add">
        <img :src="redact" alt="">
        </div>
</template>
<script setup>
import redact from "@/assets/icons8-редактировать-96.png";
</script>
<style scoped>
.add img{
    position: relative;
    width: 40px;
    cursor: pointer;
}

</style>