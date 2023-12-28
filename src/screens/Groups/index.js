import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import styles from './styles'
import navigationStrings from '../../constants/navigationStrings'

const index = ({ navigation }) => { 
    const data = [
        { id: 201, name: 'John Doe', groupCode: 'ABCD123' },
        { id: 202, name: 'Jane Smith', groupCode: 'EFGH456' },
        { id: 203, name: 'Alice Johnson', groupCode: 'IJKL789' },
        { id: 204, name: 'Bob Williams', groupCode: 'MNOP456' },
        { id: 205, name: 'Eva Brown', groupCode: 'QRST123' },
        { id: 206, name: 'Michael Davis', groupCode: 'UVWX789' },
        { id: 207, name: 'Sophia Martinez', groupCode: 'YZAB567' },
        { id: 208, name: 'David Garcia', groupCode: 'CDEF234' },
        { id: 209, name: 'Olivia Miller', groupCode: 'GHIJ901' },
        { id: 210, name: 'William Jones', groupCode: 'KLMN345' },
    ];
      const renderItem = ({ item, index }) => {
    
        return (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate(navigationStrings.MEMBERS)}
          >
            <View style={styles.infoContainer}>
              <View style={styles.detailContainer}>
                <Text style={styles.phone}>Group Name : </Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.phone}>Group Code: </Text>
                <Text style={styles.name}>{item.groupCode}</Text>
              </View>
            </View>
    
          </TouchableOpacity>
        )
      }
    
      return (
        <View style={styles.container}>
          <Header
            title={"GROUPS"}
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

export default index