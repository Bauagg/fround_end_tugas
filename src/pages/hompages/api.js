import axios from "axios";

const url = 'http://localhost:3000/product/'

const GetDataProduct = async () => {
    const date = await axios.get(`${url}`)
    const resoult = await date.data.datas
    return resoult
}

export { GetDataProduct }