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
const Notification = ({navigation}) => {
  const {userToken, getNotificationCount, notificationCount} =
    useContext(AuthContext);
  //const tabBarHeight = useBottomTabBarHeight();
  const [data, setData] = useState([]);
  const {getData, editData} = useMakeRequest();

  //pagination hooks
  const [currentPage, setCurrentPage] = useState(1);
  //intial loading
  const [initialLoading, setInitialLoading] = useState(true);
  //laod more loading
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastindex, setLastIndex] = useState('');
  const [noData, setNoData] = useState(false);
  const flatListRef = useRef(null);

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const unsubscribe = API.subscribe(userId, user => setUser(user));

  //     return () => unsubscribe();
  //   }, [userId])
  // );
  //getting notification count
  useFocusEffect(
    useCallback(() => {
      console.log('inside notfiicatin usefocus effect', notificationCount);
      console.log('current page no ', currentPage);
      //new notification arrived refresh flatlist
      if (notificationCount > 0) {
        //clearing all notification
        PushNotification.removeAllDeliveredNotifications();
        //resetting all hooks
        setHasMore(true);
        setNoData(false);
        scrollToTop();
        if (currentPage == 1) {
          //manuall fetching notification
          console.log('manually fetching data');
          getNotificationData();
        } else {
          setCurrentPage(1);
        }
      }
    }, [notificationCount]),
  );

  //fetching notification data
  const getNotificationData = async () => {
    try {
      setIsLoading(true);
      console.log('data left', hasMore);
      console.log('page no', currentPage);
      let url = `${constant.BASE_URL}/api/notification/list?page=${currentPage}&limit=10`;
      console.log('url', url);
      let headers = {'access-token': userToken};
      let res = await getData(url, headers);
      console.log('notification api res', res);
      if (res?.responseCode == 200) {
        //no data validation
        if (currentPage == 1 && res?.responseData.length == 0) {
          setNoData(true);
        }
        //initial data
        else if (currentPage == 1 && res?.responseData.length > 0) {
          setData(res?.responseData);
          setLastIndex(res?.responseData.length - 1);
          //only once we  getting notification unread count
          getNotificationCount();
        }
        //pagination data
        else if (currentPage > 1 && res?.responseData.length > 0) {
          setData([...data, ...res?.responseData]);
          setLastIndex([...data, ...res?.responseData].length - 1);
        }
        //no data left in the db
        else {
          console.log('setting no data as false');
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log('list notification api error', error);
      showErrorMsg();
    } finally {
      setIsLoading(false); //load more item loader screen
      setInitialLoading(false); //first time loading
    }
  };

  const handleNotifcation = async (index, item) => {
    try {
      //read notification
      if (item?.is_read) {
        console.log('read notifcation');
        navigation.navigate(navigationStrings.INVOICE, {
          mem_id: item.member_id,
          pymt_id: item.paymentInfo[0].PYMTITEM_ID,
        })
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
      navigation.navigate(navigationStrings.ORDER_DETAILS, {
        id: item?.track_id,
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
          backgroundColor: item?.is_read ? 'rgba(215, 189, 226, 0.3)' : colors.lightBlue,
        }}
        onPress={() => handleNotifcation(index, item)}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.time}>{item?.time}</Text>
        </View>
        <Text style={styles.body}>{item?.message}</Text>
      </TouchableOpacity>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={{marginTop: -75}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    if (hasMore && !isLoading) {
      setCurrentPage(currentPage + 1);
    } else {
      console.log('no more data left in the db');
    }
  };

  useEffect(() => {
    console.log('fetch notification called', currentPage);
    getNotificationData();
  }, [currentPage]);
  return (
    <View style={styles.container}>
      <Header title="Notifications" showBackButton={true} />

      {noData && <NoDataFound />}
      {initialLoading ? (
        <Loading />
      ) : (
        data.length > 0 && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.notification_id}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
          />
        )
      )}
    </View>
  );
};

export default Notification;
