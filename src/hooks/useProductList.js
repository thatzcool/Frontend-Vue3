// useProductList.js
import { computed, ref, watch, onMounted } from "vue";
import { getProducts } from "../api/productApi.js";
import { useRoute, useRouter } from "vue-router";

export const useProductList = () => {
  const router = useRouter();
  const route = useRoute();

  const refData = ref({
    content: [],
    number: 0,
    totalPages: 0,
  });

  // Function to fetch product data
  const getData = async () => {
    try {
      const data = await getProducts(route.query.page, route.query.size);
      refData.value = data;
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  // Computed property for generating page numbers
  const pageNums = computed(() => {
    console.log("Computed pageNums");
    const arr = [];
    const current = refData.value.number;

    // Show current, two previous, and two next pages
    for (let i = current - 1; i <= current + 3; i++) {
      if (i > 0 && i <= refData.value.totalPages) {
        arr.push(i);
      }
    }
    return arr;
  });

  // Function to handle page navigation
  const handleClickPage = (num) => {
    console.log("Navigating to page:", num);
    router.push({ query: { page: num, size: 10, time: Date.now() } });
  };

  // Function to view a specific product
  const handleClickView = (mno) => {
    console.log("Viewing product:", mno);
    router.push({
      path: `/product/view/${mno}`,
      query: route.query,
    });
  };

  // Watch for changes in route query to fetch data
  watch(
    () => route.query,
    async () => {
      console.log("Route query changed; fetching data.");
      await getData();
    },
    { deep: true }
  );

  // Fetch data when the component is first mounted
  onMounted(() => {
    getData();
  });

  return { refData, getData, pageNums, handleClickPage, handleClickView };
};

export default useProductList;
