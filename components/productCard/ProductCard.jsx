import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import AddIcon from '../../assets/add.svg';
import RemoveIcon from '../../assets/remove.svg';
import SaleIcon from '../../assets/sale.svg';
import FastImage from 'react-native-fast-image';
import { formatCurrency } from '../../helpers/formatCurrency';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

const ProductCard = (props) => {
    const [product, setProduct] = useState(props.product);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const fadeInOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeInOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, []);

    const toggleSelect = () => {
        props.addProductsHandler({
            id: product.id,
            name: product.name,
        });
    };

    const toggleMoreInfo = () => {
        setShowMoreInfo(!showMoreInfo);
    };
    return (
        <View>
            <Animated.View style={{ opacity: fadeInOpacity }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <FastImage style={styles.image} source={{ uri: product.image_url }} resizeMode="cover" />
                        <View style={styles.serviceContent}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.serviceName}>{product.name}</Text>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
									<Text>{product.salon_name}</Text>
									{product.sale > 0 ? (
										<View style={styles.saleCard}>
											<SaleIcon width={20} height={20} />
											<Text style={styles.salePercent}>-{product.sale}%</Text>
										</View>
									) : (
										<View></View>
									)}
								</View>
                            </View>
                            <Text>{props.serviceSummary ? props.serviceSummary : ""}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Text style={styles.type}>
                                    Type: {product.type}
                                </Text>
                                <TouchableOpacity onPress={toggleMoreInfo}>
                                    <Text style={{color: '#007BFF', textDecorationLine: 'underline'}}>{showMoreInfo ? "Hide" : "More info"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                {product.sale > 0 ? (
                                    <View style={styles.priceContainer}>
                                        <Text style={[styles.serviceFee, styles.strikethrough]}>
                                            {formatCurrency(product.price)} <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
                                        </Text>
                                        <Text style={styles.serviceFee}>
                                            {formatCurrency(product.price - (product.price * product.sale / 100))} <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
                                        </Text>
                                    </View>
                                ) : (
                                    <Text style={styles.serviceFee}>
                                        {formatCurrency(product.price)} <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
                                    </Text>
                                )}
                                <TouchableOpacity onPress={toggleSelect}>
                                    {!props.selected ? (
                                        <AddIcon width={viewportWidth / 10} height={viewportWidth / 10} />
                                    ) : (
                                        <RemoveIcon width={viewportWidth / 10} height={viewportWidth / 10} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.View>
            {showMoreInfo && (
                <View style={styles.moreInfoContainer}>
                    <Text style={styles.moreInfoText}>Origin: {product.origin}</Text>
                    <Text style={styles.moreInfoText}>Description: {product.description}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: viewportWidth,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 5,
        gap: -15,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    image: {
        width: viewportWidth / 4.2,
        height: viewportWidth / 3.8,
        borderRadius: 5,
    },
    serviceContent: {
        justifyContent: 'space-between',
        width: 3 * viewportWidth / 4.2,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: "600",
        color: '#3c5d98',
    },
    serviceTime: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    serviceTimeText: {
        fontSize: 14,
        fontWeight: '400',
    },
    serviceFee: {
        fontSize: 15,
        color: '#111',
        fontWeight: "500",
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        color: '#888',
        marginRight: 8,
    },
    saleCard: {
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingVertical: 3,
        borderRadius: 50,
        backgroundColor: '#FFDEC0',
        alignItems: 'center',
    },
    salePercent: {
        color: '#EF7301',
        fontSize: 14,
        fontWeight: "600",
    },
    operations: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreInfoText: {
        fontSize: 14,
        color: '#000',
		fontWeight: "400",
		marginBottom: 8

    },
    moreInfoContainer: {
        padding: 10,
        backgroundColor: '#F9F9F9',
        borderRadius: 5,
        marginTop: 0,
        marginBottom: 5,
        width: viewportWidth,
    },
});

export default ProductCard;
