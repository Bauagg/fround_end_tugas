import axios from "axios";

const GetDataProduct = async (search, tag, category) => {
    let url = 'http://localhost:3000/product'

    if (search && tag) {
        url += `?searchProduct=${search}&searchTag=${tag}&searchCategory=${category}`;
    } else if (search) {
        url += `?searchProduct=${search}`;
    } else if (tag) {
        url += `?searchTag=${tag}`;
    } else if (category) {
        url += `?searchCategory=${category}`
    }

    try {
        const response = await axios.get(url);
        const result = response.data.datas;
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export { GetDataProduct }