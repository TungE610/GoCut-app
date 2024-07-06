import { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import ReturnHomeButton from "../../components/returnHomeButton/ReturnHomeButton";
import CardProductCard from '../../components/cardProductCard/CardProductCard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const host = "https://salon-docker-production.up.railway.app";

const CartScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    const fetchData = async () => {
        const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => console.log(error));
        await axios.get(`${host}/api/cart`, {
            params: { customer_id: userId }
        }).then(res => {
            console.log(res.data);
            setProducts(res.data);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const returnHomeHandler = () => {
        navigation.navigate("Dashboard");
    };

    const selectProductHandler = (product) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (prevSelectedProducts.some((selectedProduct) => selectedProduct.id === product.id)) {
                return prevSelectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id);
            } else {
                return [...prevSelectedProducts, product];
            }
        });
    };

    const checkAllHandler = () => {
        if (selectAllChecked) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(products);
        }
        setSelectAllChecked(!selectAllChecked);
    };

    const calculateTotalPrice = () => {
        return selectedProducts.reduce((total, product) => {
            const price = product.sale > 0 ? product.price - (product.price * product.sale / 100) : product.price;
            return total + price;
        }, 0);
    };

    const handlePay = () => {
        console.log("payed");
    };

    useEffect(() => {
        setSelectAllChecked(selectedProducts.length === products.length);
    }, [selectedProducts, products]);
    return (
        <View style={styles.container}>
            <View style={styles.returnHomeButtonContainer}>
                <ReturnHomeButton onClick={returnHomeHandler} />
            </View>
            <View style={styles.screenTitleContainer}>
                <Text style={styles.screenTitle}>Cart</Text>
            </View>
            <ScrollView>
                {
                    products.map((product, index) => (
                        <CardProductCard
                            key={index}
                            product={product}
                            selectProductHandler={selectProductHandler}
                            selected={selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)}
                        />
                    ))
                }
            </ScrollView>
            <View style={styles.payTab}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Checkbox style={styles.checkbox} value={selectAllChecked} onValueChange={checkAllHandler} />
                    <Text style={{ fontSize: 16 }}>Select all</Text>
                </View>
                <View style={styles.totalContainer}>
                    <Text style={{ fontSize: 16 }}>Total: {calculateTotalPrice().toFixed(2)} đ</Text>
                    <TouchableOpacity
						onPress={handlePay}
						style={{
							backgroundColor: '#3d5c98',
							paddingHorizontal: 25,
							paddingVertical: 8,
							borderRadius: 5
						}}
					>
						<Text style={{color: '#fff'}}>Pay</Text>
					</TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: viewportWidth,
        height: viewportHeight,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    returnHomeButtonContainer: {
        position: 'absolute',
        width: '20%',
        flexDirection: 'row',
        alignContent: 'space-around',
        alignItems: 'center',
        marginTop: viewportHeight / 15,
        paddingLeft: viewportWidth / 20,
        zIndex: 999,
    },
    screenTitleContainer: {
        borderBottomWidth: 0.3,
        borderBottomColor: '#D9D9D9',
        paddingBottom: 15,
    },
    screenTitle: {
        width: '100%',
        fontSize: 28,
        fontWeight: "700",
        color: '#3d5c98',
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: viewportHeight / 14,
    },
    payTab: {
        height: viewportHeight / 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    checkbox: {
        margin: 8,
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});

export default CartScreen;
