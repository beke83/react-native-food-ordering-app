import { View, Text, TouchableOpacity, Image } from 'react-native';
import Currency from "react-currency-formatter";
import React, { useState } from 'react';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToBasket,
    removeFromBasket,
    selectBasketItems,
    selectBasketItemsWithId
} from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false)
    const dispatch = useDispatch()
    const items = useSelector((state) => selectBasketItemsWithId(state, id)); //used to get the number of items in the basket

    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }))
    }

    const removeItemFromBasket = () => {
        if(!items.length > 0) return ;
        dispatch(removeFromBasket({ id }))
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setIsPressed(!isPressed)}
                className={`bg-white border p-4 border-gray-100 ${isPressed && "border-b-0"}`}>
                <View className='flex-row'>
                    <View className='flex-1 pr-2'>
                        <Text className='text-lg mb-1'>{name}</Text>
                        <Text className='text-gray-400'>{description}</Text>
                        <Text className='text-gray-400 mt-2'>
                            <Currency quantity={price} currency="NGN" />
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: "#F3F3F4"
                            }}
                            source={{
                                uri: urlFor(image).url()
                            }}
                            className='h-20 w-20 bg-gray-300 p-4'
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {isPressed && (
                <View className='bg-white px-4'>
                    <View className='flex-row items-center space-x-2 pb-3'>
                        <TouchableOpacity onPress={removeItemFromBasket} disabled={!items.length}>
                            <MinusCircleIcon
                                color={items.length > 0 ? "#00CCBB" : "gray"}
                                size={40}
                            />
                        </TouchableOpacity>
                        <Text>{items.length}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon
                                // color={items.length > 0 ? "#00CCBB" : "gray"}
                                size={40}
                                color="#00CCBB"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

export default DishRow