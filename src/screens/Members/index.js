import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import styles from './styles'
import navigationStrings from '../../constants/navigationStrings'
import { AuthContext } from '../../context/AuthContext'
import useMakeRequest from '../../hooks/useMakeRequest'
import constant from '../../constants/constant'
import { showAlert, showErrorMsg } from '../../utils/Helper'
import Loading from '../../components/Loading'
import NoDataFound from '../../components/NoDataFound'

const Members = ({ navigation, route }) => {
  const { group } = route.params;
  const [data, setData] = useState([]);
  const { userToken } = useContext(AuthContext)
  //customer fetch hook
  const { getData } = useMakeRequest();
  const [loading, setLoading] = useState(false);
  const renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate(navigationStrings.MEMBER_TRANSACTION, { item: item })}
      >
        <View style={styles.infoContainer}>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Member ID : </Text>
            <Text style={styles.name}>{item.MEMBER_ID}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Member No.  : </Text>
            <Text style={styles.name}>{item.MEMBER_NO}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Member Name : </Text>
            <Text style={styles.name}>{item.accountInfo?.ACC_NAME}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Member Code : </Text>
            <Text style={styles.name}>{item.accountInfo?.ACC_CODE}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.phone}>Phone no : </Text>
            <Text style={styles.name}>{item.accountInfo?.ACC_PHONE}</Text>
          </View>
        </View>

      </TouchableOpacity>
    )
  }

  //fetching group members
  useEffect(() => {
    console.log('refresh called');
    getMembers();
  }, []);


  //fetching all members
  const getMembers = async () => {
    try {
      setLoading(true);
      console.log('inside try block')
      let url = `${constant.BASE_URL}/api/staff/group/members?group_id=${group}`;
      console.log('url', url);
      let headers = { 'access-token': userToken };
      let res = await getData(url, headers);
      console.log('members res: ', res?.responseData);
      if (res?.responseCode == 200) {
        setData(res?.responseData)
      }

      else {
        showErrorMsg();
      }
    } catch (error) {
      console.log('lsit expense res api error', error);
      showErrorMsg();
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Header
        title={"MEMBERS"}
        showBackButton={true}

      />
      {/* FlatList to render the data */}
      {loading ? (
        <Loading />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
        // keyExtractor={(item) => {item.MEMBER_ID.toString()}}
        />
      ) : (
        <NoDataFound />
      )}

    </View>
  )
}

export default Members
