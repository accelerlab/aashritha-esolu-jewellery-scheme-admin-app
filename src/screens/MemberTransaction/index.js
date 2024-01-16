import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import styles from './styles'
import colors from '../../constants/colors'
import Button from '../../components/Button'
import ModalSelector from 'react-native-modal-selector'
import Input from '../../components/input'
import fontFamily from '../../styles/fontFamily'
import AntDesign from 'react-native-vector-icons/AntDesign'
import navigationStrings from '../../constants/navigationStrings'
import { AuthContext } from '../../context/AuthContext'
import useMakeRequest from '../../hooks/useMakeRequest'
import constant from '../../constants/constant'
import { showAlert } from '../../utils/Helper'


const MemberTransaction = ({ route, navigation }) => {
  const { item } = route.params;
  const [data, setData] = useState([]);
  const { userToken } = useContext(AuthContext)
  const { getData } = useMakeRequest();

  //fetching reciept details
  useEffect(() => {
    console.log('refresh called');
    getReciept();
  }, []);

  const getReciept = async () => {
    try {
      console.log('inside try block')
      let url = `${constant.BASE_URL}/api/receipt/list?member_id=${item.MEMBER_ID}`;
      console.log('url', url);
      let headers = { 'access-token': userToken };
      let res = await getData(url, headers);
      console.log('members res: ', res?.responseData);
      if (res?.responseCode == 200) {
        setData(res?.responseData)
      }

      else {
        showAlert('Error', 'Error occured');
      }
    } catch (error) {
      console.log('lsit expense res api error', error);
      showAlert('Error', 'Error occured');
    }
  };

  const viewReciept = 'Generate Reciept >'
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ ...styles.itemContainer, marginBottom: index == item.length - 1 ? 90 : 20 }}>
        <View style={styles.customerInfoContainer}>
          <Text style={styles.detailText}>Reciept No: <Text style={styles.heading}>{item.rcptNo}</Text></Text>
          <Text style={styles.heading}>{item.rcptDate}</Text>
        </View>
        <View style={[styles.detailContainer, styles.rowContainer]}>
          <Text style={styles.heading}>Instal No</Text>
          <Text style={styles.heading}>{item.instlNo}</Text>
        </View>
        <View style={{ ...styles.detailContainer, paddingTop: 0 }}>
          {/* Staff Expense Array */}
          <View style={styles.rowContainer}>
            <Text style={styles.heading}>Amount</Text>
            <Text style={styles.heading}>Rate</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text numberOfLines={1} style={styles.infoText}>{item.amount}</Text>
            <Text style={styles.infoText}>{item.rate}</Text>
          </View>
        </View>
        <View style={[styles.detailContainer, styles.rowContainer]}>
          <Text style={styles.heading}>Weight</Text>
          <Text style={styles.heading}>{item.weight}</Text>
        </View>
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
        // onPress={() => {
        //     setSelectedIndex(index);
        //     //navigation.navigate(navigationStrings.BILLS_DETAILS, { id: item?.expense_id, status: item?.status, staffData: user })
        // }}
        >

          <Text style={styles.detailText}>{viewReciept}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Header title={"MEMBER TRANSACTIONS"} showBackButton={true} />
      <View style={styles.profileContainer}>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ ...styles.heading, textTransform: 'capitalize' }}>{item.accountInfo.ACC_NAME}</Text>
          <Text style={{ ...styles.infoText }}>Member id: {item.MEMBER_ID} </Text>
          <Text style={{ ...styles.infoText }}>Member Code: {item.accountInfo.ACC_CODE} </Text>
          <Text style={{ ...styles.infoText }}>Group id : {item.GROUP_ID} </Text>
          <Text style={styles.infoText}>Phone : {item.accountInfo.ACC_PHONE}</Text>
        </View>
      </View>
      {/* <View style={styles.filterContainer}>
        <Button title={'Make payment'} onPress={() => onSelectPayment()} />
        <Button title={'Transaction History'} onPress={() => onSelectHistory()} />
      </View> */}
      <FlatList
        data={data}
        renderItem={renderItem}
      />


    </View>
  )
}

export default MemberTransaction