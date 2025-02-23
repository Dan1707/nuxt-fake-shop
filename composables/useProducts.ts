export const useProducts = () => {
  const supabase = useSupabaseClient();
  const productsArr = ref<any>([]);
  const isLoading = ref(true);
  const store = useGlobalStore();
  const productsLength = ref<number | null>(null);

  const fetchProductsArr = async () => {
    isLoading.value = true;
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .range(store.pagStart, store.pagEnd - 1);

      if (error) throw error;

      productsArr.value = products;
    } catch (error) {
      console.error(`Error with fetching main data: ${error}`);
      productsArr.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const fetchByTitle = async (productName: string) => {
    store.pagStart = 0;
    store.pagEnd = store.productsQuantity;

    const letters = /[a-zA-Z]/g;

    if (letters.test(productName) && productName.length !== 0) {
      try {
        const { data, error } = await supabase
          .from("products")
          .select()
          .textSearch("title", productName);

        if (error) {
          throw error;
        } else if (data.length !== 0) {
          console.log(data);
          productsArr.value = [...data];
          productsLength.value = data.length;
        }
      } catch (error) {
        console.log(`Error with input fetching: ${error}`);
      }
    } else {
      fetchProductsArr();
      fetchProductsLength();
    }
  };

  const fetchByCategory = async (category: any) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select()
        .eq("category", category);

      if (error) {
        throw error;
      } else {
        productsArr.value = [...data];
        productsLength.value = data.length;
        console.log(productsArr.value, productsLength.value);
      }
    } catch (error) {
      console.log(`Error with fetching by category: ${error}`);
    }
  };

  const fetchProductsLength = async () => {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select();
      if (error) throw error;
      return (productsLength.value = products.length);
    } catch (error) {
      console.error(`Error with fetching products count: ${error}`);
      return null;
    }
  };

  return {
    fetchProductsArr,
    productsArr,
    isLoading,
    productsLength,
    fetchByTitle,
    fetchProductsLength,
    fetchByCategory,
  };
};
