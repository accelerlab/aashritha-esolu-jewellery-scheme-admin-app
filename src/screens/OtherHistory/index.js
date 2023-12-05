import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from '../../components/Header'

const OtherHistory = ({route}) => {
  const { paymentData } = route.params;
  
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ ...styles.itemContainer, marginBottom: index == paymentData.length - 1 ? 90 : 20 }}>
        <View style={styles.customerInfoContainer}>
          <Text style={styles.detailText}>Reciept No: <Text style={styles.heading}>{item.rcptNo}</Text></Text>
          <Text style={styles.heading}>{item.rcptDate}</Text>
        </View>
        <View style={styles.detailContainer}>
          {/* <Text style={styles.detailText}>Reciept No: {item.rcptNo}</Text> */}
          <Text style={styles.detailText}>Instal No: <Text style={styles.heading}>{item.instlNo}</Text></Text>
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
      <Header title={"OTHER"} showBackButton={true} />
      <FlatList
      data={paymentData}
      renderItem={renderItem} />
    </View>
  ) 
}

export default OtherHistory
