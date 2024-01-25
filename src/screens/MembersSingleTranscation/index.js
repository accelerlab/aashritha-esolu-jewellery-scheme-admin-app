import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../components/Header';
import styles from './styles';
import navigationStrings from '../../constants/navigationStrings';
import {AuthContext} from '../../context/AuthContext';
import useMakeRequest from '../../hooks/useMakeRequest';
import constant from '../../constants/constant';
import {isObjectEmpty, showAlert, showErrorMsg} from '../../utils/Helper';
import moment from 'moment';
import Loading from '../../components/Loading';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constants/colors';
import {ProgressDialog} from 'react-native-simple-dialogs';
const MemberSingleTransaction = ({route, navigation}) => {
  const {mem_id, payment_id} = route.params;
  const [data, setData] = useState('');
  const {userToken} = useContext(AuthContext);
  const {getData, postData} = useMakeRequest();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  //fetching payment details
  useEffect(() => {
    getPaymentList();
  }, []);
  const getPaymentList = async () => {
    try {
      setLoading(true);
      console.log('inside try block');
      let url = `${constant.BASE_URL}/api/payment/list?member_id=${mem_id}&pymt_id=${payment_id}`;
      console.log('url', url);
      let headers = {'access-token': userToken};
      let res = await getData(url, headers);
      console.log('members res: ', res?.responseData);
      if (res?.responseCode == 200) {
        setData(res?.responseData[0]);
        console.log('payment  recipt: ', res?.responseData[0]);
      } else {
        showAlert('Warning', res?.responseMessage);
      }
    } catch (error) {
      console.log('list payment res api error', error);
      showErrorMsg();
    } finally {
      setLoading(false);
    }
  };

  //createReciept
  const createReciept = async pymtitem_id => {
    try {
      setLoading2(true);
      console.log('generating invoice');
      let url = `${constant.BASE_URL}/api/receipt/create?pymtitem_id=${pymtitem_id}`;
      console.log('url', url);
      let headers = {'access-token': userToken};
      let body = {
        rcpt_type: 'Receipt',
        rcpt_no: '101',
        type: 'Online',
      };
      let res = await postData(url, body, headers);
      console.log('payment item id: ', pymtitem_id);
      if (res?.responseCode == 200) {
        showAlert('Success', 'Invoice Generated');
        getPaymentList();
      } else {
        showErrorMsg();
        console.log('response for invoice: ', res);
      }
    } catch (error) {
      console.log('generate invoice res api error', error);
      showErrorMsg();
    } finally {
      setLoading2(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'MEMBER TRANSACTIONS'} showBackButton={true} />
      <ProgressDialog
        visible={loading2}
        title="Creating Receipt"
        message="Please wait..."
        titleStyle={globalStyle.loadingTitle}
        messageStyle={globalStyle.ladingText}
        activityIndicatorColor={colors.primary}
        activityIndicatorSize={'large'}
      />
      {loading ? (
        <Loading />
      ) : (
        !isObjectEmpty(data) && (
          <View
            style={{
              ...styles.itemContainer,
              marginBottom: 20,
            }}>
            <View style={styles.customerInfoContainer}>
              <Text style={styles.detailText}>
                Member Id: <Text style={styles.heading}>{mem_id}</Text>
              </Text>
            </View>
            <View style={styles.customerInfoContainer}>
              <Text style={styles.detailText}>
                Payment Id: <Text style={styles.heading}>{data?.PYMT_ID}</Text>
              </Text>
              <Text style={styles.heading}>
                {moment(data.TRANSACTION_AT).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={[styles.detailContainer, styles.rowContainer]}>
              <Text style={styles.heading}>Amount Paid</Text>
              <Text style={styles.heading}>
                {data?.paymentInfo[0]?.PYMTITEM_AMOUNT}
              </Text>
            </View>
            <View style={[styles.detailContainer, styles.rowContainer]}>
              <Text style={styles.heading}>Total Amount</Text>
              <Text style={styles.heading}>{data?.TOTAL_AMOUNT}</Text>
            </View>
            {/* <View style={[styles.detailContainer, styles.rowContainer]}>
          <Text style={styles.heading}>Weight</Text>
      <Text style={styles.heading}>{item.weight}</Text> 
        </View> */}
            {data?.paymentInfo[0].IS_RCPTED == 1 ? (
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() =>
                  navigation.navigate(navigationStrings.INVOICE, {
                    mem_id: data?.paymentInfo[0]?.memberInfo.MEMBER_ID,
                    pymt_id: data?.paymentInfo[0]?.PYMTITEM_ID,
                  })
                }>
                <Text style={styles.detailText}>{'View Invoice >'}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => createReciept(data.paymentInfo[0]?.PYMTITEM_ID)}>
                <Text style={styles.detailText}>{'Generate Invoice >'}</Text>
              </TouchableOpacity>
            )}
          </View>
        )
      )}
    </View>
  );
};

export default MemberSingleTransaction;
