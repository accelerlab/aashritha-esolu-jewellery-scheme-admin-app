import { Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import useMakeRequest from '../../hooks/useMakeRequest';
import constant from '../../constants/constant';
import { showAlert, showErrorMsg } from '../../utils/Helper';
import Header from '../../components/Header';
import moment from 'moment';
import styles from './styles';
import Loading from '../../components/Loading';
import NoDataFound from '../../components/NoDataFound';

const Invoice = ({ navigation, route }) => {
    const { mem_id } = route.params;
    const { pymt_id } = route.params;

    console.log("paymen id",pymt_id);
    const [data, setData] = useState([]);
    const { userToken } = useContext(AuthContext)
    const { getData } = useMakeRequest();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getInvoice();
    }, []);
    const getInvoice = async () => {
        try {
            setLoading(true);
            console.log('inside try block');
            let url = `${constant.BASE_URL}/api/receipt/list?member_id=${mem_id}&pymtitem_id=${pymt_id}`;
            console.log('url', url);
            let headers = { 'access-token': userToken };
            let res = await getData(url, headers);
            console.log('res: ', res);
            if (res?.responseCode == 200) {
                setData(res?.responseData[0]);
                console.log('response data: ', res?.responseData[0]);
            } else {
                showErrorMsg();
                //console.log('response recipt: ', res?.responseData);
            }
        } catch (error) {
            console.log('lsit payment res api error', error);
            showErrorMsg();
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <Header title={'RECEIPT'} showBackButton={true} />
            {loading ? (
                <Loading />
            ) : (
                <View
                    style={{
                        ...styles.itemContainer,
                        marginBottom: data == data.length - 1 ? 90 : 20,
                    }}
                >
                    <View style={styles.customerInfoContainer}>
                        <Text style={styles.detailText}>
                            Receipt Id: <Text style={styles.heading}>{data.RCPT_ID}</Text>
                        </Text>
                        <Text style={styles.heading}>{moment(data.RCPT_DATE).format('DD/MM/YYYY')}</Text>
                    </View>
                    {/* <View style={[styles.detailContainer, styles.rowContainer]}>
                        <Text style={styles.heading}>Member Id</Text>
                        <Text style={styles.heading}>{data.MEMBER_ID}</Text>
                    </View> */}
                    <View style={[styles.detailContainer, styles.rowContainer]}>
                        <Text style={styles.heading}>Receipt Type</Text>
                        <Text style={styles.heading}>{data.TYPE}</Text>
                    </View>
                    <View style={[styles.detailContainer, styles.rowContainer]}>
                        <Text style={styles.heading}>Receipt Number</Text>
                        <Text style={styles.heading}>{data.RCPT_NO}</Text>
                    </View>
                    <View style={[styles.detailContainer, styles.rowContainer]}>
                        <Text style={styles.heading}>Receipt Amount</Text>
                        <Text style={styles.heading}>{data.RCPT_AMOUNT}</Text>
                    </View>
                </View>
            )}


        </View>
    )
}

export default Invoice
