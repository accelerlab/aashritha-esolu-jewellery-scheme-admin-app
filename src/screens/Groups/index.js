import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Header from '../../components/Header';
import styles from './styles';
import navigationStrings from '../../constants/navigationStrings';
import {AuthContext} from '../../context/AuthContext';
import useMakeRequest from '../../hooks/useMakeRequest';
import constant from '../../constants/constant';
import {showAlert, showErrorMsg} from '../../utils/Helper';
import Loading from '../../components/Loading';
import NoDataFound from '../../components/NoDataFound';
import {useFocusEffect} from '@react-navigation/native';
const Groups = ({navigation}) => {
  const {logout, userToken, getNotificationCount} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const {getData} = useMakeRequest();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log('fethcing notification count');
      getNotificationCount();
    }, []),
  );
  useEffect(() => {
    console.log('refresh called');
    getGroups();
  }, []);
  const getGroups = async () => {
    try {
      setLoading(true);
      console.log('inside try block');
      let url = `${constant.BASE_URL}/api/staff/groups`;
      console.log('url', url);
      let headers = {'access-token': userToken};
      let res = await getData(url, headers);
      console.log('members res: ', res?.responseData);
      if (res?.responseCode == 200) {
        setData(res?.responseData);
      } else {
        showErrorMsg();
      }
    } catch (error) {
      console.log('lsit expense res api error', error);
      showErrorMsg();
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate(navigationStrings.MEMBERS, {group: item.group})
        }>
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
    );
  };
  //logout alert message
  const logooutAlert = () => {
    Alert.alert('Confirmation', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Ok', onPress: () => logout()},
    ]);
  };
  return (
    <View style={styles.container}>
      <Header
        title={'GROUPS'}
        additionalButtons={[
          {
            size: 27,
            icon: 'notifications-outline',
            onPress: () => navigation.navigate(navigationStrings.NOTIFICATION),
            color: 'black',
          },
          {
            size: 27,
            icon: 'log-out-outline',
            onPress: logooutAlert,
            color: 'black',
          },
        ]}
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
  );
};

export default Groups;
