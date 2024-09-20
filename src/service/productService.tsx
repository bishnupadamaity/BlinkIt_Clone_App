import axios from "axios";
import { BASE_URL } from "./config";

export const getAllCategories = async () => {
    try {
        console.log(`${BASE_URL}/categories`);
        const res = await axios.get(`${BASE_URL}/categories`);
        // console.log(res.data)
        
        return res.data;
    } catch (error: any) {
        console.log("Error fetching categories : ", error)
        return []
    }
}
export const getProductsByCategoryId = async (id:string) => {
    try {
        console.log(`${BASE_URL}/products/${id}`);
        const res = await axios.get(`${BASE_URL}/products/${id}`);
        
        return res.data;
    } catch (error: any) {
        console.log("Error fetching products : ", error)
        return []
    }
}