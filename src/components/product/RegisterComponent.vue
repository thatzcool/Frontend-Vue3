<script setup>
import UploadComponent from "./UploadComponent.vue";
import {useTokenStore} from "../../stores/tokenStore.jsx";
import {ref} from "vue";
import {deleteServerFile} from "../../api/uploadApi.jsx";
import {postProduct} from "../../api/productApi.jsx";
import {useRouter} from "vue-router";
import ResultModal from "../common/ResultModal.vue";


const {savedMid} = useTokenStore()

const inputProductData = {
  pname: "",
  price: 0,
  content: "",
  writer:savedMid(),
  imageList: [ ]
}

const initResult = {
  title: "",
  content: "",
  complete: false,
}

const product = ref({...inputProductData})

const result = ref({...initResult} )

const router = useRouter()


const setUploadResult = (uploadedFileNames) => {
  console.log("uploadedFileNames", uploadedFileNames);
  product.value.imageList.push(...uploadedFileNames)
}


const handleClickDeleteImage = (fileName) => {

  deleteServerFile(fileName).then(() => {

    product.value.imageList = product.value.imageList.filter(imgName => imgName !== fileName)

  })
}

const handleClickRegisster = () => {
  postProduct(product.value).then(data => {
    console.log(data)
    result.value.title = `등록성공`
    result.value.content = ` ${data.pno} 번 상품이 등록되었습니다. `
    result.value.complete = true
  })
}

const closeModal = () => {
  console.log("closeModal")
  product.value = {...inputProductData}
  result.value = {...initResult}
  router.push({path: "/product/list"})
}


</script>

<template>

  <ResultModal v-if="result.complete" :title="result.title" :content="result.content"  @close="closeModal"/>

  <div class="text-5xl">Product Register Component</div>

  <div>
    <label>Name</label>
    <input type="text" name="pname" v-model="product.pname" >
  </div>
  <div>
    <label>Price</label>
    <input type="number" name="price"  v-model="product.price" >
  </div>

  <div>
    <label>Content</label>
    <input type="text" name="content" v-model="product.content">
  </div>

  <div>
    <label>Writer</label>
    <input type="text" name="writer" v-model="product.writer" readonly >
  </div>

  <div>
    <UploadComponent @setUploadResult="setUploadResult"/>
  </div>

  <div>

    <ul v-if="product.imageList.length > 0" >

      <li v-for="(image,idx) in product.imageList" :key="idx">
        <div >
          <img :src="`http://localhost:8080/s_${image}`">
          <button @click="() => handleClickDeleteImage(image)">x</button>
        </div>
      </li>

    </ul>
  </div>

  <div>
    <button class="addBtn" @click="handleClickRegisster">REGISTER</button>
  </div>


</template>

<style scoped>

.addBtn {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.divTitle {
  @apply w-1/6 p-2
}

.divInput {
  @apply w-5/6 border-2 p-2
}

</style>