<template>
        <input :type="type" name="" id="" :placeholder="placeHolder" :value = "modelValue" @input = "updateValue">
</template>

<script setup> 
const props = defineProps({
 placeHolder: String,
 type: {
    type:String,
    default: "text"
 },
 modelValue: [String, Number]
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) =>{
    emit('update:modelValue', event.target.value);
}
</script>
<style scoped>

input{
    padding: 15px 20px;
    background-color: rgb(231, 226, 255);
    border: none;
    width: 100%;
    border-radius: 12px;
    outline: none;
}



</style>