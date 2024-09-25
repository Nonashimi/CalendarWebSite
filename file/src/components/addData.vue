<template>
  <div class="blank">
    <InputComponent :place-holder="'title'" v-model="funct.title" />
    <div class="line">
      <div class="com">
        <div class="com_title">Continue:</div>
        <select name="" id="" v-model="funct.isEveryDay">
          <option value="" disabled>Select One</option>
          <option :value="true">Every day</option>
          <option :value="false">Every other day</option>
        </select>
      </div>
      <div class="com">
        <div class="com_title">Quantity:</div>
        <InputComponent
          :place-holder="'quantity'"
          :type="'number'"
          v-model="funct.quantity"
        />
      </div>
      <div class="com">
        <div class="com_title">Approach:</div>
        <InputComponent
          :place-holder="'approaches'"
          :type="'number'"
          v-model="funct.approach"
        />
      </div>
    </div>
    <div class="button">
      <button :class="isFull ? 'btn' : 'notActive'" @click="() => addData()">
        Add
      </button>
    </div>
  </div>
</template>
<script setup>
import InputComponent from "@/components/InputComponent.vue";
import { ref, computed, inject } from "vue";
import axios from "axios";
let isFull = false;
const funct = ref({
  title: "",
  approach: 0,
  quantity: 0,
  isEveryDay: true,
});
const data = inject("days");
const firstDay = inject("firstDay");
const isclick = inject('isAddClick');
const addDataFromArr = inject('addDataFromArr');
const emit = defineEmits(['closePage']);
const today = new Date();

const checkData = () => {
  console.log(funct.value);

  if (
    funct.value.title == "" ||
    funct.value.approach <= 0 ||
    funct.value.quantity <= 0
  ) {
    return false;
  }
  return true;
};

const addData = async () => {
  const newData = {};
  newData.title = funct.value.title;
  newData.approach = funct.value.approach;
  newData.quantity = funct.value.quantity;
  newData.isEveryDay = funct.value.isEveryDay;
  const {data:dfg} = await axios.post(`https://d08619ba4a5f18bd.mokky.dev/exercises`, newData);
  isclick();
};

isFull = computed(() => {
  return checkData();
});
</script>
<style scoped>
.line {
  width: 100%;
  display: flex;
  gap: 20px;
}
.blank {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.notActive {
  background-color: rgb(152, 151, 151);
  pointer-events: none;
}
select {
  padding: 15px 20px;
  background-color: rgb(231, 226, 255);
  border-radius: 12px;
  border: none;
  outline: none;
  width: 240px;
}
.button {
  display: flex;
  justify-content: end;
}
button {
  padding: 10px 20px;
  border: none;
  background-color: rgb(124, 34, 241);
  color: #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn:hover {
  background-color: rgb(87, 16, 181);
}
.com {
  width: 33%;
}
.com_title {
  margin-bottom: 5px;
  color: #ccc;
}
</style>
