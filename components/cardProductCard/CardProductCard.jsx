import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, Animated, Easing } from "react-native";
import SaleIcon from '../../assets/sale.svg';
import FastImage from 'react-native-fast-image';
import { formatCurrency } from '../../helpers/formatCurrency';
import CardShop from '../../assets/cardShop.svg';
import Checkbox from 'expo-checkbox';

const { width: viewportWidth } = Dimensions.get('screen');

const CardProductCard = (props) => {
    const [product, setProduct] = useState(props.product);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const fadeInOpacity = useRef(new Animated.Value(0)).current;
    const [isChecked, setChecked] = useState(props.selected);

    useEffect(() => {
        Animated.timing(fadeInOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, []);

    useEffect(() => {
        setChecked(props.selected);
    }, [props.selected]);

    const checkHandler = () => {
        props.selectProductHandler(product);
    };

    return (
        <View>
            <Animated.View style={{ opacity: fadeInOpacity }}>
                <View style={styles.container}>
                    <View>
                        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={checkHandler} />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, flex: 1 }}>
                        <FastImage style={styles.image} source={{ uri: product.image_url }} resizeMode="cover" />
                        <View style={styles.serviceContent}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.serviceName}>{product.product_name}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                        <CardShop />
                                        <Text>{product.salon_name}</Text>
                                    </View>
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
        width: viewportWidth - 28,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 5,
        gap: 10,
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        marginBottom: 5,
        borderRadius: 5,
    },
    image: {
        width: viewportWidth / 4.2,
        height: viewportWidth / 3.8,
        borderRadius: 5,
    },
    serviceContent: {
        justifyContent: 'space-between',
        flex: 1,
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
    checkbox: {
        margin: 8,
    },
});

export default CardProductCard;
