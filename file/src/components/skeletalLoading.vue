<template>
<div class="skeleton-container">
    <div class="skeleton-card">
    </div>
    <div class="skeletal-functions">
    </div>
  </div>
  </template>

  <style scoped>
 .skeleton-container {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.skeleton-card {
  width: 1000px;
  height: 600px;
  background-color: rgb(213, 206, 248);
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skeletal-functions{
    position: fixed;
    bottom: 10%;
    right: 10%;
    width: 40px;
    height: 100px;
    border-radius: 30px;
    background-color: rgb(213, 206, 248);

}

.skeleton-card, .skeletal-functions{
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    background-color: rgb(219, 212, 253);
  }
  50% {
    background-color: rgb(206, 196, 254);
  }
  100% {
    background-color: rgb(219, 212, 253);
  }
}

</style>