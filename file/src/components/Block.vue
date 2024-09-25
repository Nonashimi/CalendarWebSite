<template>
    <div class="page">
        <div class="page_flex">
            <div class="debt_page">
                <header class="head">
                    <h1>{{ headText }}</h1>
                </header>
                    <slot></slot>
            </div>
    <div class="back" @click="() =>$emit('closePage')">
        <img :src="multiple" alt="" >
    </div>
        </div>
    </div>
</template>
<script setup>
import multiple from "@/assets/icons8-умножение-100.png";
const props = defineProps({
    headText: String
});
const emit = defineEmits(['closePage']);
</script>
<style scoped>
.page{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
}
.debt_page{
    width: 800px;
    background-color: #fff;
    border-radius: 20px;
    padding-bottom: 30px;
    min-height: 600px;
}
.back{
    cursor: pointer;
    background-color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
}
.back img{
    width: 30px;
}
.page_flex{
    display: flex;
}

/* head */
.head{
    display: flex;
    padding: 10px 30px;
    border-bottom: 1px solid #ccc;
}
h1{
    font-size: 25px;
}


/* container */

</style>