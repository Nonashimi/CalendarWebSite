<template>
    <div class="Calendarcontainer" v-if = "fetchBool">
        <OneDayList/>
        <calendarFunctions @openDebtsPage="openDebtsPage" @openEditPage = "openEditPage"/>
        <DebtsPage v-if = 'isDebtsOpen' @closePage="closeDebtsPage"/>
        <changeDataPage v-if = "isEditOpen" @closePage = "closeEditPage"/>
        <!-- <addPage v-if = "isAddFunctionOpen" @closePage = "closeAddPage"/> -->
    </div>
    <div class="" v-else>
        <skeletalLoading/>
    </div>
</template>

<script setup>
import OneDayList from '@/components/OnDayList.vue';
import DebtsPage from '@/page/DebtsPage.vue';
import changeDataPage from '@/page/changeDataPage.vue';
import skeletalLoading from '@/components/skeletalLoading.vue';
import calendarFunctions from '@/components/calendarFunctions.vue';
import {ref, inject, provide} from 'vue';
const isDebtsOpen = ref(false);
const isEditOpen = ref(false);
const fetchBool = inject('bool');
const openDebtsPage = () =>{
    isDebtsOpen.value = true;
}
const openEditPage = ()=>{
    isEditOpen.value = true;
}
const closeEditPage = ()=>{
    isEditOpen.value = false;
}
const closeDebtsPage = () =>{
    isDebtsOpen.value = false;
}

provide('closeEditPage', closeEditPage);

</script>

<style scoped>

</style>
