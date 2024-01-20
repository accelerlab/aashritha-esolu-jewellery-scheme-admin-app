import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import styles from './styles'
import navigationStrings from '../../constants/navigationStrings'
import { AuthContext } from '../../context/AuthContext'
import useMakeRequest from '../../hooks/useMakeRequest'
import constant from '../../constants/constant'
import { showAlert } from '../../utils/Helper'

const index = ({ navigation }) => {
  const { logout, userToken } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const { getData } = useMakeRequest();
  useEffect(() => {
    console.log('refresh called');
      getGroups();
  },[] );
  const getGroups = async () => {
    try {
      console.log('inside try block')
      let url = `${constant.BASE_URL}/api/staff/groups`;
      console.log('url', url);
      let headers = { 'access-token' : userToken };
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

  const renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate(navigationStrings.MEMBERS, {group : item.group})}
      >
        <View style={styles.infoContainer}>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Group Name : </Text>
            <Text style={styles.name}>{item.group_name}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Group Code: </Text>
            <Text style={styles.name}>{item.group}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Group Type: </Text>
            <Text style={styles.name}>{item.group_type}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Installment Amount: </Text>
            <Text style={styles.name}>{item.GROUP_INSTAMOUNT}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Total Installment Amount: </Text>
            <Text style={styles.name}>{item.GROUP_TOTALINST}</Text>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
  //logout alert message
  const logooutAlert = () => {
    Alert.alert('Confirmation', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Ok', onPress: () => logout() },
    ]);
  };
  return (
    <View style={styles.container}>
      <Header
        title={'GROUPS'}
        additionalButtons={[
          {
            size: 27,
            icon: 'log-out-outline',
            onPress: logooutAlert,
            color: 'black',
          },
        ]}
      />
      {/* FlatList to render the data */}
      <FlatList
        data={data}
        renderItem={renderItem}
        //keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default index