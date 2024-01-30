import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import styles from './style';
import Header from '../../components/Header';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import useMakeRequest from '../../hooks/useMakeRequest';
import constant from '../../constants/constant';
import {showAlert, showErrorMsg} from '../../utils/Helper';
import {AuthContext} from '../../context/AuthContext';
import NoDataFound from '../../components/NoDataFound';
import {useFocusEffect} from '@react-navigation/native';
import colors from '../../constants/colors';
import PushNotification from 'react-native-push-notification';
import Loading from '../../components/Loading';
import navigationStrings from '../../constants/navigationStrings';
import {FlashList} from '@shopify/flash-list';
const Notification = ({navigation}) => {
  const {userToken, refreshNotificationList} = useContext(AuthContext);
  //const tabBarHeight = useBottomTabBarHeight();
  const [data, setData] = useState([]);
  const {getData, editData} = useMakeRequest();
  //intial loading
  const [initialLoading, setInitialLoading] = useState(false);

  //fetching notification data
  useEffect(() => {
    getNotificationData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('insdie call back');
      //only notifcation list if admin creates the receipt
      if (refreshNotificationList.current) {
        console.log('receipt generated refreshing notification screen');
        getNotificationData();
        refreshNotificationList.current = false;
      }
    }, []),
  );

  //fetching notification data
  const getNotificationData = async () => {
    try {
      setInitialLoading(true);
      let url = `${constant.BASE_URL}/api/notification/list`;
      console.log('url', url);
      let headers = {'access-token': userToken};
      let res = await getData(url, headers);
      console.log('notification api res', res);
      if (res?.responseCode == 200) {
        setData(res?.responseData);
      }
    } catch (error) {
      console.log('list notification api error', error);
      showErrorMsg();
    } finally {
      setInitialLoading(false);
    }
  };

  const handleNotifcation = async (index, item) => {
    try {
      //read notification
      if (item?.is_read) {
        console.log('read notifcation');
        navigation.navigate(navigationStrings.MEMBERS_SINGLE_TRANSACTION, {
          mem_id: item.member_id,
          payment_id: item.payload_data,
        });
        return;
      }
      console.log('unread notifcation');
      //unread notifcation
      //updating notification status as read
      let url = `${constant.BASE_URL}/api/notification/control/${item?.notification_id}`;
      console.log('url', url);
      let headers = {
        'access-token': userToken,
        'Content-Type': 'application/json',
      };
      let body = {
        is_read: '1',
      };
      let res = await editData(url, headers, body);
      console.log('notification status update api res', res);
      if (res?.responseCode == 200) {
        //updating notification status as read in flatlis
        let updatedData = [...data];
        updatedData[index] = {...updatedData[index], is_read: 1};
        setData(updatedData);
      }
      navigation.navigate(navigationStrings.MEMBERS_SINGLE_TRANSACTION, {
        mem_id: item.member_id,
        payment_id: item.payload_data,
      });
    } catch (error) {
      console.log('notification update status api error', error);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.itemContainer,
          //marginBottom: index == lastindex ? tabBarHeight + 5 : 0,
          backgroundColor: item?.is_read
            ? 'rgba(215, 189, 226, 0.3)'
            : colors.lightBlue,
        }}
        onPress={() => handleNotifcation(index, item)}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.time}>
            {item?.date} {item?.time}
          </Text>
        </View>
        <Text style={styles.body}>{item?.message}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Header title="Notifications" showBackButton={true} />
      {initialLoading ? (
        <Loading />
      ) : data.length > 0 ? (
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.notification_id}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={500}
        />
      ) : (
        <NoDataFound />
      )}
    </View>
  );
};

export default Notification;
