<script setup>

import {useProductView} from "../../hooks/useGetProduct.jsx";
import UploadComponent from "./UploadComponent.vue";
import {deleteServerFile} from "../../api/uploadApi.jsx";
import {putProduct} from "../../api/productApi.jsx";
import {ref} from "vue";
import ResultModal from "../common/ResultModal.vue";

const {product, handleClickList, handleClickDelete, handleModifyCall} = useProductView()


const initResult = {
  pno:0,
  title: "",
  content: "",
  callback: null
}

const result = ref({...initResult})

const handleClickPut = () => {
	console.log("handleClickPut")

	putProduct(product.value).then(data => {
		console.log(data)
	})

}

const setUploadResult = (uploadedFileNames) => {
	console.log("uploadedFileNames", uploadedFileNames);
	product.value.imageList.push(...uploadedFileNames)
}

const handleClickDeleteImage = (fileName) => {

	deleteServerFile(fileName).then(() => {
		product.value.imageList = product.value.imageList.filter(imgName => imgName !== fileName)
	})
}

const afterDelete = (route, router) => {

  result.value.pno = product.value.pno
  result.value.title = "삭제성공"
  result.value.content = `${product.value.pno} 번이 삭제되었습니다.`
  result.value.callback = () => {
    router.push({path:"/product/list", query: route.query})
    result.value = {...initResult}
  }
}

const afterPut = (route, router) => {

  result.value.pno = product.value.pno
  result.value.title = "수정성공"
  result.value.content = `${product.value.pno} 번이 수정되었습니다.`
  result.value.callback = () => {
    router.push({path:`/product/view/${product.value.pno}`, query: route.query})
    result.value = {...initResult}
  }

}






</script>

<template>

	<div>Product Modify Component</div>

  <ResultModal v-if="result.pno !== 0" :title="result.title" :content="result.content" @close="result.callback"/>

	<div>
		<label>Pno</label>
		<input type="text" name="pno" v-model="product.pno" readonly>
	</div>

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
		<input type="text" name="content" v-model="product.content" >
	</div>

	<div>
		<label>Writer</label>
		<input type="text" name="writer" v-model="product.writer" readonly >
	</div>

	<div>
		<UploadComponent @setUploadResult="setUploadResult" />
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
		<div class="flex m-2 p-2 justify-end">
			<button type="button" class="listBtn" @click="handleClickList">List</button>
			<button type="button" class="modifyBtn" @click="() => handleModifyCall(afterPut)">Modify</button>
			<button type="button" class="delBtn" @click="() => handleClickDelete(afterDelete)">Delete</button>
		</div>
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

.delBtn {
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

