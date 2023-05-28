import 'react-native-gesture-handler';
import * as React from 'react';
import ProductCard from '../Components/ProductCard';
import api from '../Requests/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, ActivityIndicator, FlatList, Modal, Text } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { StyleSheet } from 'react-native';
import { SearchBar, Input } from '@rneui/themed';
function SecondPage() {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState("");
    let filteredDatax
    const handleSearch = (text) => {
        setSearch(text);
        if (text == '') {
            setFilteredData(data)
        } else {
            filteredDatax = data.filter((item) =>
                item.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filteredDatax)
        }
    };

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const LoadData = async () => {
        try {
            const result = await api.getProducts()
            setData(result.products)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        LoadData()
    }, []);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <View>
            <View style={{height:responsiveHeight(10),alignItems:'center',justifyContent:'center'}}>

            
            <Input
                placeholder="Ürün Aratın..."
                onChangeText={handleSearch}
                containerStyle={{marginTop:30}}
                inputContainerStyle={{
                    height: responsiveHeight(7), borderRadius: 30, backgroundColor: 'orange',alignSelf:'center',justifyContent:'center',paddingLeft:30
                }}
                value={search}
            />
            </View>
            <FlatList
                numColumns={2}
                data={filteredData.length == 0 ? data : filteredData}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item }) => <ProductCard category={item.category} rating={item.rating} description={item.description} toggle={toggleOverlay} images={item.images} title={item.title} price={item.price} brand={item.brand}></ProductCard>}
                keyExtractor={item => item.id}
            />
        </View>
    );
            }
export default SecondPage;