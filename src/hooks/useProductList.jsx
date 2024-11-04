import {computed, ref, watch} from "vue";
import {getProducts} from "../api/productApi.jsx";
import {useRoute, useRouter} from "vue-router";




export const useProductList = () => {

    const moveRouter = useRouter()

    const route = useRoute()

    const refData = ref({
        content:[],
        number:0,
        totalPages:0,
    })


    const getData = () => {
        getProducts(route.query.page, route.query.size).then(data => {
            refData.value = data
        })
    }

    const pageNums = computed(() => {

        console.log("computed pageNums ")

        let arr = []

        const current = refData.value.number
        //이전 2 다음 2
        console.log("current", current)

        for (let i = current -1 ; i <= current + 3   ; i++) {
            if(i <= 0 || i > refData.value.totalPages) {
                continue
            }
            arr.push(i)
        }
        return arr
    })

    const handleClickPage = (num) => {
        console.log("handleClickPage", num)
        moveRouter.push({query: {page:num, size:10, time:Date.now()}})

    }

    const handleClickView = (mno) => {
        console.log("handleClickRead", mno)
        moveRouter.push({
            path: `/product/view/${mno}`,
            query: route.query
        })
    }

    watch(
        () => route.query,
        (newVal, oldVal) => {
            console.log("watch", newVal, oldVal)
            getData()
        },
        {deep: true}
    )


    return {refData, getData, pageNums, handleClickPage, handleClickView}
}

export default useProductList