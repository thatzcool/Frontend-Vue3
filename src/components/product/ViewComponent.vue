<script setup>

import {useProductView} from "../../hooks/useGetProduct.jsx";

const {product, handleClickList, handleClickModify} = useProductView()

</script>

<template>

  <div>Product View Component</div>

  <div>
    <label>Pno</label>
    <input type="text" name="pno" :value="product.pno" readonly>
  </div>

  <div>
    <label>Name</label>
    <input type="text" name="pname" :value="product.pname" readonly>
  </div>
  <div>
    <label>Price</label>
    <input type="number" name="price"  :value="product.price" readonly>
  </div>

  <div>
    <label>Content</label>
    <input type="text" name="content" :value="product.content" readonly>
  </div>

  <div>
    <label>Writer</label>
    <input type="text" name="writer" :value="product.writer" readonly >
  </div>

  <div>
    <div class="flex m-2 p-2 justify-end">
      <button type="button" class="listBtn" @click="handleClickList">List</button>
      <button type="button" class="modifyBtn" @click="handleClickModify">Modify</button>
    </div>
  </div>


  <div>
    <ul v-if="product.imageList.length > 0" >
      <li v-for="imgName in product.imageList" :key="imgName">
        <img :src="`http://localhost:8080/${imgName}`" />
      </li>
    </ul>
  </div>

</template>

<style scoped>
.listBtn {
  background-color: #4CAF50; /* Green */
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
.modifyBtn {
  background-color: #008CBA; /* Blue */
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

