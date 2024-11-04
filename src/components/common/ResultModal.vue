<script setup>

const props = defineProps({
  title: "",
  content: ""
});

const emit = defineEmits(['close'])

</script>


<template>
  <div
      class="outer"
      @click="() => {emit('close')}">
  <div
      class="modalBox">
    <div class="titleText">
      {{title}}
    </div>
    <div class="content">
      {{content}}
    </div>
    <div class="justify-end flex ">
      <button
          class="closeBtn"
          >Close Modal</button>
    </div>
  </div>
  </div>
</template>

<style scoped>

.outer {
  @apply fixed top-0 left-0 z-[1055] flex h-full w-full  justify-center bg-black bg-opacity-20
}
.modalBox{
  @apply absolute bg-white shadow dark:bg-gray-700 opacity-100 w-1/4 rounded  m-10 px-6 min-w-[600px]
}
.titleText {
  @apply justify-center mt-6 mb-6 text-2xl border-b-4 border-gray-500
}

.content {
  @apply text-4xl  border-orange-400 border-b-4 pt-4 pb-4
}

.closeBtn {
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}


</style>