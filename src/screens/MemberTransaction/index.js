import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import styles from './styles'
import colors from '../../constants/colors'
import Button from '../../components/Button'

const MemberTransaction = ({ route }) => {
  const { data } = route.params;

  const paymentData = [
    { rcptNo: 27161, rcptDate: '08/11/2020', instlNo: '1', amount: '1000', rate: '5295', weight: '0.188' },
    { rcptNo: 27762, rcptDate: '20/12/2022', instlNo: '2', amount: '1000', rate: '5873', weight: '0.210' },
    { rcptNo: 28286, rcptDate: '11/09/2022', instlNo: '3', amount: '1000', rate: '5991', weight: '0.172' },
    { rcptNo: 28739, rcptDate: '26/10/2021', instlNo: '4', amount: '1000', rate: '7925', weight: '0.181' },
    { rcptNo: 29296, rcptDate: '10/05/2023', instlNo: '5', amount: '1000', rate: '4985', weight: '0.183' },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ ...styles.itemContainer, marginBottom: index == paymentData.length - 1 ? 90 : 20 }}>
        <View style={styles.customerInfoContainer}>
          <Text style={styles.heading}>Transaction History</Text>
          <Text style={styles.heading}>{item.rcptDate}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>Reciept No: {item.rcptNo}</Text>
          <Text style={styles.detailText}>Instal No: {item.instlNo}</Text>
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
        <View style={styles.rowContainer}>
          <Text style={styles.heading}>Weight</Text>
          <Text style={styles.heading}>{item.weight}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Header
        title={"MY TRANSACTIONS"}
        showBackButton={true}
      />
      <View style={styles.profileContainer}>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ ...styles.heading, textTransform: 'capitalize' }}>{data.name}</Text>
          <Text style={styles.infoText}>Phone : {data.phoneNumber}</Text>
          <Text style={{ ...styles.infoText }}>Member id: {data.id} </Text>
          <Text style={{ ...styles.infoText }}>Group : {data.groupCode} </Text>
          <Text style={{ ...styles.infoText }}>Address : {data.address} </Text>
        </View>
      </View>
      {/* <Button
      /> */}
      <View style={styles.filterContainer}>
        <Button
        title='Make payment for this month'
        />
      </View>
      <FlatList
        data={paymentData}
        renderItem={renderItem}
      />
    </View>
  )
}

export default MemberTransaction