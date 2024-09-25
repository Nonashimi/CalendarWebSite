<template>
  <div class="" v-if="!isLoad">
    <div class="change_nav">
      <div class="isNotEdit" v-if="!isEdit">
        <button class="change_button button" @click="() => openEdit()">
          Редактировать
        </button>
      </div>
      <div class="isEdit" v-else>
        <button class="cancel button" @click="() => closeEdit()">Отмена</button>
        <button class="save button" @click="() => saveEdit()" :class="isChanged ? '' : 'notChanged'">
          Сохранить
        </button>
      </div>
    </div>
    <div class="scrollList">
      <exerciseBlockList
        :arr="arr"
        :is-edit="isEdit"
        @clickDelete="clickDelete"
      />
      <div class="addBlock" @click="isAddOpen" >
        <img src="@\assets\icons8-сложение-100.png" alt="" />
      </div>
    </div>
  </div>
  <loading v-else />
  <addPage v-if="isAddClicked" @closePage="isAddClose" />
</template>
<script setup>
import axios from "axios";
import { ref, watch, onMounted, provide, inject } from "vue";
import addPage from "@/page/addPage.vue";
import exerciseBlockList from "@/components/exerciseBlockList.vue";
import loading from "@/components/loading.vue";

const arr = ref([]);
let dupliArr = [];
const isAddClicked = ref(false);
const isLoad = ref(true);
const isChanged = ref(false);
const isEdit = ref(false);
const days = [...inject("days").value];
const firstDay = inject("firstDay");
const today = new Date();
const idOfDay = today.getDate() - firstDay;

const fetchChangeData = async () => {
  const { data: ex } = await axios.get(
    "https://d08619ba4a5f18bd.mokky.dev/exercises"
  );
  arr.value = ex;
  dupliArr = JSON.parse(JSON.stringify(ex));
  isLoad.value = false;
};

// const defineId = () =>{
//     const id = today.getDate() - firstDay;
//   const days = [...data.value];
//   console.log(newData);

//   if (!funct.value.isEveryDay) {
//     for (let i = id; i < 17; i += 2) {
//       days[i].arr.push(newData);
//     }
//   } else {
//     for (let i = id; i < 17; i++) {
//       days[i].arr.push(newData);
//     }
//   }
// }

const isAddOpen = () => {
  isAddClicked.value = true;
};
const isAddClose = async () => {
  await fetchChangeData();
  isAddClicked.value = false;
};
const isAddClick = async() =>{
  await isAddClose();
  await saveEdit();
}

onMounted(async () => {
  await fetchChangeData();
});

const openEdit = () => {
  isEdit.value = true;
};

const closeEdit = () => {
  arr.value = JSON.parse(JSON.stringify(dupliArr));
  isEdit.value = false;
};

const saveEdit = async () => {
  isEdit.value = false;
  await changeDaysByArr();
  await postData();
  await fetchChangeData();
};

const deleteFromDays = (title) => {
  for (let i = idOfDay; i < days.length; i++) {
    let array = [];
    for (let j = 0; j < days[i].arr.length; j++) {
      if (days[i].arr[j].title != title) {
        array.push(days[i].arr[j]);
      }
    }
    days[i].arr = array;
  }
};



const postData = async () => {
  await axios.patch("https://d08619ba4a5f18bd.mokky.dev/exercises", arr.value);
  await axios.patch("https://d08619ba4a5f18bd.mokky.dev/days", days);
};

const changeDaysByArr = async () => {
  for (let i = idOfDay; i < days.length; i++) {
    const list = [];
    for (let j = 0; j < arr.value.length; j++) {
      const dayFunction = {};
      if (!arr.value[j].isEveryDay && i % 2 == 0) {
        dayFunction.title = arr.value[j].title;
        dayFunction.sum = arr.value[j].quantity * arr.value[j].approach;
        dayFunction.approach = arr.value[j].approach;
        let count = 0;
        for (let k = 0; k < days[i].arr.length; k++) {
          const dayEx = days[i].arr[k];
          if (dayEx.title == dayFunction.title) {
            count = dayEx.count;
          }
        }
        count = dayFunction.sum > count ? count : dayFunction.sum;
        dayFunction.isComplete = count >= dayFunction.sum;
        dayFunction.count = count;
      } else if(arr.value[j].isEveryDay) {
        dayFunction.title = arr.value[j].title;
        dayFunction.sum = arr.value[j].quantity * arr.value[j].approach;
        dayFunction.approach = arr.value[j].approach;
        let count = 0;
        for (let k = 0; k < days[i].arr.length; k++) {
          let dayEx = days[i].arr[k];
          if (dayEx.title == arr.value[j].title) {
            count = dayEx.count;
          }
        }
        count = dayFunction.sum > count ? count : dayFunction.sum;
        dayFunction.isComplete = count >= dayFunction.sum;
        dayFunction.count = count;
      }
      if(Object.keys(dayFunction).length != 0){
        list.push(dayFunction);
      }
    }
    days[i].arr = list;
  }
  console.log(days);
};

const clickDelete = async (id) => {
  let idOfArr = arr.value.findIndex((a) => a.id === id);
  let title = arr.value[idOfArr].title;
  arr.value = [...arr.value].filter((a) => a.id != id);
  deleteFromDays(title);
};

watch(
  arr,
  () => {
    const temp = JSON.parse(JSON.stringify(arr.value));
    isChanged.value = !dupliArr.every(
      (value, index) => JSON.stringify(value) === JSON.stringify(temp[index])
    );
  },
  { deep: true }
);

provide("isAddClose", isAddClose);
provide('isAddClick', isAddClick);
</script>
<style scoped>
.scrollList {
  max-height: 70vh;
  overflow: hidden;
  overflow: auto;
  padding: 0 10px;
}
.notChanged {
  opacity: 0.5;
}
.addBlock {
  background-color: #d5d5d5;
  margin: 20px 0 20px 5px;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  width: 685px;
}
.addBlock:hover {
  background-color: #e6e3e3;
}
.addBlock img {
  width: 30px;
}
.button {
  background-color: #d5d5d5;
  border: none;
  padding: 10px 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
}
.button:hover {
  background-color: #e6e3e3;
}
.change_nav {
  display: flex;
  justify-content: end;
  padding: 10px 20px 5px;
}

.isEdit {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
