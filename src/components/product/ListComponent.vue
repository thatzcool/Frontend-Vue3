<script setup>

import useProductList from "../../hooks/useProductList.jsx";
import {onMounted, ref, watch} from "vue";

const {refData, getData, handleClickPage, pageNums, handleClickView} = useProductList()

onMounted(() => {
  getData()
})

</script>

<template>

  <div>
  <div>Product List Component</div>

  <ul>
    <li v-for="product in refData.content" :key="product.pno">
      <div @click="() => handleClickView(product.pno) ">
        <div>
          {{product.productImage}}
        </div>
        <div>
          {{product.pno}}
        </div>
        <div>
          {{product.pname}}
        </div>
        <div>
          {{product.price}}
        </div>
      </div>
    </li>
  </ul>

  <ul class="paging">
    <li v-for="num in pageNums" :key="num"  class="p-2">
      <div @click="() => handleClickPage(num)" >{{num}}</div>
    </li>
  </ul>
  </div>
</template>

<style scoped>
.paging {
  @apply flex m-3 p-2 justify-center list-none;
}

.paging li {
  @apply p-2;
}

</style>