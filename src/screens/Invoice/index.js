import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import useMakeRequest from '../../hooks/useMakeRequest';
import constant from '../../constants/constant';

const Invoice = ({ navigation, route }) => {
    const { id } = route.params;
    const [data, setData] = useState([]);
    const { userToken } = useContext(AuthContext)
    const { getData, postData } = useMakeRequest();
    useEffect(() => {
        getInvoice();
    }, []);
    const getInvoice = async () => {
        try {
            console.log('inside try block');
            let url = `${constant.BASE_URL}/api/receipt/list?member_id=${id}`;
            console.log('url', url);
            let headers = { 'access-token': userToken };
            let res = await getData(url, headers);
            console.log('members res: ', res?.responseData);
            if (res?.responseCode == 200) {
                setData(res?.responseData);
                console.log('response recipt: ', res?.responseData);
            } else {
                showAlert('Error', 'Error occured');
            }
        } catch (error) {
            console.log('lsit payment res api error', error);
            showAlert('Error', 'Error occured');
        }
    };
    return (
        <View>
            <Text>Invoice</Text>
        </View>
    )
}

export default Invoice

const styles = StyleSheet.create({})