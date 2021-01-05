import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default HistoryScreen = ({route, navigation}) => {
  const [history, setHistory] = React.useState([]);
  function getList() {
    return fetch(
      'https://5f91384ae0559c0016ad7349.mockapi.io/maintains',
    ).then((data) => data.json());
  }
  const [text, setText] = React.useState('');
  getList().then((items) => {
    setHistory(items);
    console.log(history)
  });
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          borderColor: '#666666',
          borderBottomWidth: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            fontFamily: 'SegoeUI-Regular',
            fontSize: 15,
            color: '#000000',
            marginBottom: 4,
          }}>
          {item.equipmentId}
        </Text>
        <Text
          style={{
            fontFamily: 'SegoeUI-Regular',
            fontSize: 15,
            color: '#000000',
            marginBottom: 4,
          }}>
          {item.created}
        </Text>
        <Text
          style={{
            fontFamily: 'SegoeUI-Regular',
            fontSize: 15,
            color: '#000000',
            marginBottom: 4,
          }}>
          {item.createdBy}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View >
        <View>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="search"
              type="ionicon"
              size={30}
              containerStyle={{justifyContent: 'center'}}
            />
            <TextInput
              placeholder="Tìm kiếm"
              style={{
                color: '#666666',
                fontSize: 17,
                fontFamily: 'SegoeUI-Regular',
              }}
              maxLength={20}
              value={text}
              onChangeText={(e) => {
                setText(e);
                // let arr = [];
                // history.forEach((element) => {
                //   if (element.equipmentId.findIndexOf(e) !== -1) {
                //     arr.push(element);
                //   }
                // });
                // setHistory(arr);
              }}
            />
          </View>
          
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={history}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          extraData={history}
          // keyExtractor={(item) => {
          //   return item.id.toString();
          // }}
          style={{flex: 1, backgroundColor: '#FFFFFF'}}
        />
      </View>
      <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={async () => {
              navigation.navigate('loginScreen');
              await AsyncStorage.removeItem('currentUserName');
              await AsyncStorage.removeItem('currentUserRole');
            }}>
            <Text
              style={{
                color: '#666666',
                fontSize: 17,
                fontFamily: 'SegoeUI-Regular',
                textAlign: 'center',
              }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
    </View>
  );
};
