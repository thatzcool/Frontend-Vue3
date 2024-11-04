import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {deleteProduct, getProduct, putProduct} from "../api/productApi.jsx";

export const useProductView = () => {

    const route = useRoute()

    const pno = route.params.pno

    const product = ref({
        pno:0,
        pname:'',
        price:0,
        content:'',
        writer:'',
        imageList:[]
    })

    const router = useRouter()

    onMounted(() => {

        console.log(`Product View Component Mounted ${pno}`)

        getProduct(pno).then(data => {
            console.log(data)
            product.value = data
        }).catch(err => {
            console.log(err)
            router.push("/product/list")
        })
    })



    const handleClickList = () => {
        console.log("handleClickList")
        router.push({path: "/product/list", query: route.query})
    }

    const handleClickModify = () => {
        console.log("handleClickModify")
        router.push({path: `/product/modify/${pno}`, query: route.query})
    }


    const handleClickDelete = (callback) => {
        console.log("handleClickDelete")
        deleteProduct(pno).then(serverResult => {
            console.log(serverResult)
            callback(route, router)
        })
    }

    const handleModifyCall = (callback) => {

        console.log("handleModifyCall")

        putProduct(product.value).then(serverResult => {
            console.log(serverResult)
            callback(route, router)
        })


    }




    return {
        product,
        handleClickList,
        handleClickModify,
        handleClickDelete,
        handleModifyCall
    }
}
