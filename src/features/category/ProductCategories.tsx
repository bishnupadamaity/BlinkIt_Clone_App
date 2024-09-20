import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader';
import { Colors } from '@utils/Constants';
import Sidebar from './Sidebar';
import { getAllCategories, getProductsByCategoryId } from '@service/productService';
import CustomText from '@components/ui/CustomText';
import ProductList from './ProductList';
import WithCart from '@features/cart/WithCart';

const ProductCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [products, setProducts] = useState<any>(null);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
    const [productsLoading, setProductsLoading] = useState<boolean>(false);

    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true);
            const data = await getAllCategories();
            setCategories(data);
            if (data && data.length > 0) {
                setSelectedCategory(data[0]);
            }
        } catch (error) {
            console.log("Fetch Categories Error: ", error);
        } finally {
            setCategoriesLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    const fetchProducts = async (categoryId: string) => {
        try {
            setProductsLoading(true);
            const data = await getProductsByCategoryId(categoryId);
            setProducts(data);
            
        } catch (error) {
            console.log("Fetch Products Error: ", error);
        } finally {
            setProductsLoading(false);
        }
    }
    useEffect(() => {
        if(selectedCategory?._id) {
            fetchProducts(selectedCategory?._id);
        }
    }, [selectedCategory])
    return (
        <View style={styles.mainContainer}>
            <CustomHeader title={selectedCategory?.name || "Categories"} search />
            <View style={styles.subContainer}>
                {
                    categoriesLoading ? (<ActivityIndicator size={'small'} color={Colors.text} />) : (
                        <Sidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryPress={(category: any) => setSelectedCategory(category)}
                        />
                    )
                }
                {
                    productsLoading ? (<ActivityIndicator size={'large'} color={Colors.text} style={styles.center} />) : (
                        <ProductList data={products || []}  />)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default WithCart(ProductCategories)