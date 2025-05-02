import { API_BASE_URL } from '@/utils/config';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

type ProductImage = {
    id: number;
    product_id: number;
    image_url: string;
    created_at: string;
};

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    images: ProductImage[];
};

const Productcarrd = ({ productList = [], title }: { productList: Product[]; title: string }) => {
    const getImageUrl = (image_url: string) => {
        return image_url?.startsWith('https')
            ? image_url
            : `${API_BASE_URL}/${image_url}`;
    };

    return (
        <>
            <View className="flex-row items-center justify-between">
                <Text className="text-black font-bold text-lg mb-3">
                    {title}
                </Text>
                <TouchableOpacity>
                    <Image source={require("../../assets/images/right.png")} />
                </TouchableOpacity>
            </View>

            <View>
                {productList.length > 0 ? (
                    <Swiper
                        style={{ height: 250 }}
                        showsPagination={false}
                        autoplay={false}
                        autoplayTimeout={3}
                        loop={true}
                    >
                        {productList
                            .reduce((acc: any[], _, i: number) => {
                                if (i % 2 === 0) acc.push(productList.slice(i, i + 2));
                                return acc;
                            }, [])
                            .map((group: Product[], index: number) => (
                                <View key={index} className="flex-row justify-between px-1">
                                    {group.map((item) => {
                                        const productImage = item.images?.[0]?.image_url;
                                        const imageUrl = productImage ? getImageUrl(productImage) : null;
                                        console.log("Final URL", getImageUrl(productImage));

                                        return (
                                            <View
                                                key={item.id}
                                                className="bg-white p-3 rounded-lg shadow-md border border-gray-200 w-44"
                                            >
                                                {imageUrl ? (
                                                    <Image
                                                        source={{ uri: imageUrl }}
                                                        className="w-full h-32 rounded-lg"
                                                        resizeMode="cover"
                                                    />
                                                ) : (
                                                    <Image
                                                        source={require("../../assets/images/check.png")}
                                                        className="w-full h-32 rounded-lg"
                                                        resizeMode="cover"
                                                    />
                                                )}
                                                <Text className="text-purple-600 font-bold text-lg mt-2">
                                                    AED {item.price}
                                                </Text>
                                                <Text className="text-black font-bold mt-1">{item.name}</Text>
                                                <Text className="text-gray-600 text-sm mt-1">{item.description}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            ))}
                    </Swiper>
                ) : (
                    <Text className="text-red-600 text-center my-4">No Product To display</Text>
                )}
            </View>
        </>
    );
};

export default Productcarrd;
