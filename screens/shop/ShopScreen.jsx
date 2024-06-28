import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ShopBox from '../../components/shopBox/ShopBox';
import SearchInput from '../../components/searchInput/SearchInput';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import Searching from '../../assets/searching.svg';
import axios from 'axios';
import ProductCard from '../../components/productCard/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

const host = "http://172.16.32.27:8000";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

const ShopScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (searchValue.length > 0) {
                try {
                    const response = await axios.get(`${host}/api/products/search`, {
                        params: { name: searchValue }
                    });
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            } else {
                setProducts([]);
            }
        };

        if (searchValue.length > 0) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [searchValue]);

    const backButtonClickHandler = () => {
        navigation.navigate("Dashboard");
    };

    const searchValueChangeHandler = (value) => {
        setSearchValue(value);
    };

    const addProductsHandler = (product) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (prevSelectedProducts.some((selectedProduct) => selectedProduct.id === product.id)) {
                return prevSelectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id);
            } else {
                return [...prevSelectedProducts, product];
            }
        });
    };

	const gotoCardHandler = () => {
		navigation.navigate('Cart');
	}
	const addProducToCardHandler = async () => {
		
		try {
            const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => { 
				console.log(error); 
				throw error; 
			});
            
            // Prepare data for the request
            const requestData = {
                userId: parseInt(userId),
                products: selectedProducts.map(product => {return {
                    productId: parseInt(product.id),
                    quantity: 1, // Assuming quantity is 1 for each product added
                }}),
            };
            // Send POST request to add products to cart
            const response = await axios.post(`${host}/api/cart`, requestData);

			showMessage({
				message: "Successfully added to cart",
				type: "success",
					autoHide: false,
					duration: 60000,
					icon: "success",
			});
            // Clear selected products after adding to cart
            setSelectedProducts([]);
			navigation.navigate('Cart');

        } catch (error) {
			showMessage({
				message: "Can not add these products to card",
				type: "danger",
					autoHide: false,
					duration: 60000,
					icon: "danger",
			});
        }

	}
    return (
        <View style={styles.container}>
            <View style={styles.screenHeaderContainer}>
                <ReturnHomeButton onClick={backButtonClickHandler} />
                <Text style={styles.pageHeader}>Shop</Text>
                <ShopBox onClick={gotoCardHandler}/>
            </View>
            <SearchInput 
                placeholder="search for salon or product" 
                width={viewportWidth}
                height={60}
                cancelButtonColor="#fff"
                backgroundColor="#3d5c98"
                onChange={(value) => { searchValueChangeHandler(value) }}
            />
            <ScrollView>
                {
                    products.length > 0 ? 
                    (
                        products.map((product, index) => (
                            <ProductCard 
                                key={index} 
                                product={product} 
                                addProductsHandler={addProductsHandler} 
                                selected={selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)} 
                            />
                        ))
                    ) :
                    <View style={{ alignItems: 'center', gap: 12, paddingTop: viewportHeight / 6 }}>
                        <Searching />
                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 20 }}>Find products by search input above</Text>
                    </View>
                }
            </ScrollView>
            {selectedProducts.length > 0 && 
                <View style={styles.addProductsButton}>
                    <TouchableOpacity style={styles.addProductscontainer} onPress={addProducToCardHandler}>
						<Text style={styles.addText}>Add 
							<Text style={styles.selectedCount}>
								to cart
							</Text> 
						</Text>
					</TouchableOpacity>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: viewportHeight,
        width: viewportWidth,
        backgroundColor: "#3d5c98",
        paddingTop: 60,
    },
    screenHeaderContainer: {
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    carouselImage: {
        width: viewportWidth - 12,
        height: '100%',
    },
    mainMenu: {
        marginTop: 5,
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: '#3d5c98',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    pageHeader: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '700'
    },
    addProductsButton: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        paddingHorizontal: 5,
    },
	addProductscontainer: {
		height: viewportHeight/15,
		borderRadius: 50,
		backgroundColor: '#3d5c98',
		alignItems: 'center',
	},
	addText: {
		fontSize: 19,
		fontWeight: "700",
		alignSelf: 'center',
		lineHeight: viewportHeight/15,
		color: '#fff'
	},
});

export default ShopScreen;
