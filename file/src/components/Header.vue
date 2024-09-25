<template>
<header>
    <div class="logo" @click="$router.push('/')">
        <img src="@\assets\icons8-календарь-50.png" alt="">
        <span>
            Calendar
        </span>
    </div>
</header>
</template>

<script setup>

</script>

<style scoped>
header{
    padding: 15px 30px ;
    background-color: rgb(87, 16, 181);
    margin-bottom: 15px;
}
.logo span{
    font-size: 24px;
    color: #fff;
}
.logo{
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
}
.logo img{
    width: 35px;
}
</style>