import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';

const Header = ({
  title,
  additionalButtons,
  showBackButton,
  onPress,
}) => {
  const navigation = useNavigation();
  const {notificationCount} = useContext(AuthContext);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.rowContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => (onPress ? onPress() : navigation.goBack())}>
            <AntDesign size={25} color={colors.black} name="arrowleft" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rowContainer}>
        {additionalButtons &&
          additionalButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => button.onPress()}
              style={{marginLeft: 20}}>
              <Ionicons
                size={button.size}
                color={button.color || colors.black}
                name={button.icon}
              />
              {button.icon === 'notifications-outline' &&
                notificationCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>
                      {notificationCount}
                    </Text>
                  </View>
                )}
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default Header;
