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
import colors from '../../constants/colors';
import Button from '../../components/Button';
import ModalSelector from 'react-native-modal-selector';
import Input from '../../components/input';
import fontFamily from '../../styles/fontFamily';
import AntDesign from 'react-native-vector-icons/AntDesign';
import navigationStrings from '../../constants/navigationStrings';
import {AuthContext} from '../../context/AuthContext';
import useMakeRequest from '../../hooks/useMakeRequest';
import constant from '../../constants/constant';
import {showAlert, showErrorMsg} from '../../utils/Helper';
import moment from 'moment';
import Loading from '../../components/Loading';
import NoDataFound from '../../components/NoDataFound';
import {ProgressDialog} from 'react-native-simple-dialogs';
const MemberTransaction = ({route, navigation}) => {
  const {item} = route.params;
  const [data, setData] = useState([]);
  const {userToken} = useContext(AuthContext);
  const {getData, postData} = useMakeRequest();
  const [loading, setLoading] = useState(false);

  //fetching payment details
  useEffect(() => {
    getPaymentList();
  }, []);
  const getPaymentList = async () => {
    try {
      setLoading(true);
      console.log('inside try block');
      let url = `${constant.BASE_URL}/api/payment/list?member_id=${item.MEMBER_ID}`;
      console.log('url', url);
      let headers = {'access-token': userToken};
      let res = await getData(url, headers);
      console.log('members res: ', res?.responseData);
      if (res?.responseCode == 200) {
        setData(res?.responseData);
        console.log('response recipt: ', res?.responseData);
      } else if (res?.responseCode == 204) {
        console.log('no transaction found');
        setData(res?.responseData);
      } else {
        showAlert('Warning', res?.responseMessage);
      }
    } catch (error) {
      console.log('lsit payment res api error', error);
      showErrorMsg();
    } finally {
      setLoading(false);
    }
  };

  //createReciept
  const createReciept = async pymtitem_id => {
    try {
      console.log('generating Receipt');
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
        showAlert('Success', 'Receipt Generated');
      } else {
        showAlert('Error', 'Receipt Generation failed');
        console.log('response for Receipt: ', res);
      }
    } catch (error) {
      console.log('generate Receipt res api error', error);
      showAlert('Error', 'Error occured');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          ...styles.itemContainer,
          marginBottom: index == data.length - 1 ? 90 : 20,
        }}>
        <View style={styles.customerInfoContainer}>
          <Text style={styles.detailText}>
            Payment Id: <Text style={styles.heading}>{item?.PYMT_ID}</Text>
          </Text>
          <Text style={styles.heading}>
            {moment(item.TRANSACTION_AT).format('DD/MM/YYYY')}
          </Text>
        </View>
        {/* <View style={[styles.detailContainer, styles.rowContainer]}>
          <Text style={styles.heading}>Instal No</Text>
          <Text style={styles.heading}>{item.instlNo}</Text>
        </View> */}
        {/* <View style={{ ...styles.detailContainer, paddingTop: 0 }}>
          <View style={styles.rowContainer}> 
            <Text style={styles.heading}>Amount</Text>
            <Text style={styles.heading}>Rate</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text numberOfLines={1} style={styles.infoText}>
              {item.paymentInfo[0].PYMTITEM_AMOUNT}
            </Text>
            <Text style={styles.infoText}>{item.rate}</Text>
          </View>
        </View> */}
        <View style={[styles.detailContainer, styles.rowContainer]}>
          <Text style={styles.heading}>Amount Paid</Text>
          <Text style={styles.heading}>
            {item.paymentInfo[0].PYMTITEM_AMOUNT}
          </Text>
        </View>
        <View style={[styles.detailContainer, styles.rowContainer]}>
          <Text style={styles.heading}>Total Amount</Text>
          <Text style={styles.heading}>{item.TOTAL_AMOUNT}</Text>
        </View>
        {/* <View style={[styles.detailContainer, styles.rowContainer]}>
          <Text style={styles.heading}>Weight</Text>
          <Text style={styles.heading}>{item.weight}</Text>
        </View> */}
        {item.paymentInfo[0].IS_RCPTED == 1 ? (
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() =>
              navigation.navigate(navigationStrings.INVOICE, {
                mem_id: item.paymentInfo[0].memberInfo.MEMBER_ID,
                pymt_id: item.paymentInfo[0].PYMTITEM_ID,
              })
            }>
            <Text style={styles.detailText}>{'View Receipt >'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => createReciept(item.paymentInfo[0].PYMTITEM_ID)}>
            <Text style={styles.detailText}>{'Generate Receipt >'}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header title={'MEMBER TRANSACTIONS'} showBackButton={true} />
      <View style={styles.profileContainer}>
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={{...styles.heading, textTransform: 'capitalize'}}>
            {item.accountInfo.ACC_NAME}
          </Text>
          <Text style={{...styles.infoText}}>Member id: {item.MEMBER_ID} </Text>
          <Text style={{...styles.infoText}}>
            Member Code: {item.accountInfo.ACC_CODE}{' '}
          </Text>
          <Text style={{...styles.infoText}}>Group id : {item.GROUP_ID} </Text>
          <Text style={styles.infoText}>
            Phone : {item.accountInfo.ACC_PHONE}
          </Text>
        </View>
      </View>
      {/* <View style={styles.filterContainer}>
        <Button title={'Make payment'} onPress={() => onSelectPayment()} />
        <Button title={'Transaction History'} onPress={() => onSelectHistory()} />
      </View> */}
      {loading ? (
        <Loading />
      ) : data.length > 0 ? (
        <FlatList data={data} renderItem={renderItem} />
      ) : (
        <NoDataFound />
      )}
    </View>
  );
};

export default MemberTransaction;
