import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import styles from './styles'
import navigationStrings from '../../constants/navigationStrings'
const Members = ({ navigation }) => {
  // Array containing 10 different id and name combinations
  const data = [
    { id: 201, name: 'John Doe', phoneNumber: '123-456-7890', address: '123 Main St', groupCode: 'ABCD123' },
    { id: 202, name: 'Jane Smith', phoneNumber: '987-654-3210', address: '456 Elm St', groupCode: 'EFGH456' },
    { id: 203, name: 'Alice Johnson', phoneNumber: '111-222-3333', address: '789 Oak St', groupCode: 'IJKL789' },
    { id: 204, name: 'Bob Williams', phoneNumber: '444-555-6666', address: '101 Pine St', groupCode: 'MNOP456' },
    { id: 205, name: 'Eva Brown', phoneNumber: '777-888-9999', address: '202 Cedar St', groupCode: 'QRST123' },
    { id: 206, name: 'Michael Davis', phoneNumber: '333-222-1111', address: '303 Walnut St', groupCode: 'UVWX789' },
    { id: 207, name: 'Sophia Martinez', phoneNumber: '666-555-4444', address: '404 Maple St', groupCode: 'YZAB567' },
    { id: 208, name: 'David Garcia', phoneNumber: '999-888-7777', address: '505 Birch St', groupCode: 'CDEF234' },
    { id: 209, name: 'Olivia Miller', phoneNumber: '222-333-4444', address: '606 Spruce St', groupCode: 'GHIJ901' },
    { id: 210, name: 'William Jones', phoneNumber: '888-999-0000', address: '707 Cherry St', groupCode: 'KLMN345' },
];
  const renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate(navigationStrings.MEMBER_TRANSACTION, { data: item })}
      >
        <View style={styles.infoContainer}>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Member ID : </Text>
            <Text style={styles.name}>{item.id}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Group : </Text>
            <Text style={styles.name}>{item.groupCode}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Member Name : </Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Address : </Text>
            <Text style={styles.name}>{item.address}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Phone no : </Text>
            <Text style={styles.name}>{item.phoneNumber}</Text>
          </View>
        </View>

      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Header
        title={"MEMBERS"}
        showBackButton={false}
        leftIcon={true}
      />
      {/* FlatList to render the data */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default Members
