import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import styles from './styles'
import colors from '../../constants/colors'
import Button from '../../components/Button'
import ModalSelector from 'react-native-modal-selector'
import Input from '../../components/input'
import fontFamily from '../../styles/fontFamily'
import AntDesign from 'react-native-vector-icons/AntDesign'
import navigationStrings from '../../constants/navigationStrings'


const MemberTransaction = ({ route, navigation }) => {
  const { data } = route.params;

  const paymentData = [
    { rcptNo: 27161, rcptDate: '08/11/2020', instlNo: '1', amount: '1000', rate: '5295', weight: '0.188' },
    { rcptNo: 27762, rcptDate: '20/12/2022', instlNo: '2', amount: '1000', rate: '5873', weight: '0.210' },
    { rcptNo: 28286, rcptDate: '11/09/2022', instlNo: '3', amount: '1000', rate: '5991', weight: '0.172' },
    { rcptNo: 28739, rcptDate: '26/10/2021', instlNo: '4', amount: '1000', rate: '7925', weight: '0.181' },
    { rcptNo: 29296, rcptDate: '10/05/2023', instlNo: '5', amount: '1000', rate: '4985', weight: '0.183' },
  ];
  //payment type
  const [paymentOptions] = useState([
    { key: 1, label: 'Scheme' },
    { key: 2, label: 'Other' },
  ]);
  //history type
  const [transactionHistory] = useState([
    { key: 1, label: 'Fixed Scheme' },
    { key: 2, label: 'Unfixed Scheme' },
    { key: 3, label: 'Other' }
  ]);
  //select payment type
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const onSelectPayment = () => {
    setSelectedPaymentType('');
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedPaymentType('');
    setModalVisible(false);
  };
  const onPymentTypeChange = (value) => {
    setSelectedPaymentType(value);
  };
  const onPaymentSubmit = () => {
    if (selectedPaymentType.label === 'Scheme') {
      navigation.navigate(navigationStrings.SCHEME_PAYMENT); // Navigate to SchemePayment.js
    } else if (selectedPaymentType.label === 'Other') {
      navigation.navigate(navigationStrings.OTHER_PAYMENT); // Navigate to OtherPayment.js
    }
  };

  //select transaction history type
  const [modalVisible2, setModalVisible2] = useState(false)
  const [selectedHistoryType, setSelectedHistoryType] = useState('');
  const onSelectHistory = () => {
    setSelectedHistoryType('');
    setModalVisible2(true);
  };
  const closeModal2 = () => {
    setSelectedHistoryType('');
    setModalVisible2(false);
  };
  const onHistoryTypeChange = (value) => {
    setSelectedHistoryType(value);
  };
  const onHistorySubmit = () => {
    if (selectedHistoryType.label === 'Fixed Scheme') {
      navigation.navigate(navigationStrings.FIXED_HISTORY, { paymentData: paymentData }); // Navigate to SchemePayment.js
    } else if (selectedHistoryType.label === 'Unfixed Scheme') {
      navigation.navigate(navigationStrings.UNFIXED_HISTORY, { paymentData: paymentData }); // Navigate to OtherPayment.js
    } else if (selectedHistoryType.label === 'Other') {
      navigation.navigate(navigationStrings.OTHER_HISTORY, { paymentData: paymentData });
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset necessary state variables when the screen comes into focus
      setModalVisible(false);
      setSelectedPaymentType('');
      setModalVisible2(false);
      setSelectedHistoryType('');
    });

    return unsubscribe;
  }, [navigation]);
  const viewReciept = 'Generate Reciept >'
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ ...styles.itemContainer, marginBottom: index == paymentData.length - 1 ? 90 : 20 }}>
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
          <Text style={{ ...styles.heading, textTransform: 'capitalize' }}>{data.name}</Text>
          <Text style={styles.infoText}>Phone : {data.phoneNumber}</Text>
          <Text style={{ ...styles.infoText }}>Member id: {data.id} </Text>
          <Text style={{ ...styles.infoText }}>Group : {data.groupCode} </Text>
          <Text style={{ ...styles.infoText }}>Address : {data.address} </Text>
        </View>
      </View>
      {/* <View style={styles.filterContainer}>
        <Button title={'Make payment'} onPress={() => onSelectPayment()} />
        <Button title={'Transaction History'} onPress={() => onSelectHistory()} />
      </View> */}
      <FlatList data={paymentData} renderItem={renderItem} />
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.modalHeading}>Payment Type</Text>
              <TouchableOpacity onPress={closeModal} >
                <AntDesign
                  name='close'
                  size={22}
                  color={colors.darkBlack}
                />
              </TouchableOpacity>
            </View>
            <ModalSelector
              data={paymentOptions}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => onPymentTypeChange(option)}
              search={false}
              listType="FLATLIST"
              //searchText="Search Quotation Type"
              optionTextStyle={{ textAlign: 'left', padding: 2, color: 'black', fontFamily: fontFamily.regular, fontSize: 14 }}
              searchTextStyle={{ fontSize: 14, fontFamily: fontFamily.regular, }}
              optionContainerStyle={{ backgroundColor: '#fff' }}
              optionStyle={{ borderBottomColor: '#fff' }}
              cancelContainerStyle={{ backgroundColor: '#fff' }}
              cancelTextStyle={{ color: 'black', fontFamily: fontFamily.regular, }}
              cancelText="Cancel"
            >
              <Input
                placeHolder="Select Payment Type"
                value={selectedPaymentType.label}
                editable={false}
                inputStyle={{ marginTop: 10 }}
                rightIcon={'chevron-down'}
                onPressRight={() => console.log('clicked')}
              />

            </ModalSelector>
            <Button
              title={'Submit'}
              btnStyle={styles.submit}
              onPress={() => onPaymentSubmit()}
            />
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.modalHeading}>Transaction History</Text>
              <TouchableOpacity onPress={closeModal2} >
                <AntDesign
                  name='close'
                  size={22}
                  color={colors.darkBlack}
                />
              </TouchableOpacity>
            </View>
            <ModalSelector
              data={transactionHistory}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => onHistoryTypeChange(option)}
              search={false}
              listType="FLATLIST"
              //searchText="Search Quotation Type"
              optionTextStyle={{ textAlign: 'left', padding: 2, color: 'black', fontFamily: fontFamily.regular, fontSize: 14 }}
              searchTextStyle={{ fontSize: 14, fontFamily: fontFamily.regular, }}
              optionContainerStyle={{ backgroundColor: '#fff' }}
              optionStyle={{ borderBottomColor: '#fff' }}
              cancelContainerStyle={{ backgroundColor: '#fff' }}
              cancelTextStyle={{ color: 'black', fontFamily: fontFamily.regular, }}
              cancelText="Cancel"k
            >
              <Input
                placeHolder="Select Payment Type"
                value={selectedHistoryType.label}  
                editable={false}
                inputStyle={{ marginTop: 10 }}
                rightIcon={'chevron-down'}
                onPressRight={() => console.log('clicked')}
              />
            </ModalSelector>
            <Button
              title={'Submit'}
              btnStyle={styles.submit}
              onPress={() => onHistorySubmit()}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default MemberTransaction