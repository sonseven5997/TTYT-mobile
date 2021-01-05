import {View, Text} from 'react-native';
import React from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Button, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default EmployeesScreen = ({navigation}) => {
  const [role,setRole] = React.useState('')
  AsyncStorage.getItem('role').then(res=>{setRole(res)})
  const [users, setUsers] = React.useState([]);
  function getList() {
    return fetch(
      `https://5f91384ae0559c0016ad7349.mockapi.io/users`,
    ).then((data) => data.json());
  }
  const setStateAPI = () => {
    getList().then((items) => {
      setUsers(items);
    });
  };
  setStateAPI();
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          borderColor: '#666666',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          disabled={
            AsyncStorage.getItem('currentUserRole') !== 'admin' ? true : false
          }
          style={{flex: 1}}
          onPress={() => {
            navigation.navigate('employeesDetailScreen', {
              userID: item.userID,
              userLoginId: item.userLoginId,
              userPassword: item.userPassword,
              userName: item.userName,
              userRole: item.userRole,
              userCreatedTime: item.userCreatedTime,
              userCreatedBy: item.userCreatedBy,
              userUpdatedTime: item.userUpdatedTime,
              userUpdatedBy: item.userUpdatedBy,
              departmentId: item.departmentId,
            });
          }}>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 13,
              color: '#93c22f',
              marginBottom: 4,
            }}>
            {item.userName}
          </Text>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 15,
              color: '#000000',
              marginBottom: 4,
            }}>
            {item.userRole}
          </Text>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 15,
              color: '#666666',
              marginBottom: 4,
            }}>
            {item.departmentId}
          </Text>
        </TouchableOpacity>
        <View>
          <Button
            disabled={role !== 'admin' ? true : false}
            icon={<Icon name="brush-outline" type="ionicon" size={20} />}
            buttonStyle={{
              margin: 2,
              backgroundColor: '#ffffff',
              borderRadius: 50,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#666666',
            }}
          />
          <Button
            disabled={role !== 'admin' ? true : false}
            icon={<Icon name="trash" type="ionicon" size={20} />}
            buttonStyle={{
              margin: 2,
              backgroundColor: '#ffffff',
              borderRadius: 50,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#666666',
            }}
            onPress={async () => {
              await fetch(
                `https://5f91384ae0559c0016ad7349.mockapi.io/users/${item.userID}`,
                {
                  method: 'DELETE',
                },
              );
              await getList().then((items) => {
                setUsers(items);
              });
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderColor: '#666666',
          borderBottomWidth: 1,
        }}>
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
          />
        </View>
        <Button
          disabled={role !== 'admin' ? true : false}
          icon={<Icon name="add" type="ionicon" size={30} />}
          title="Thêm nhân viên mới"
          buttonStyle={{
            backgroundColor: '#ffffff',
            paddingRight: 4,
            marginHorizontal: 0,
          }}
          titleStyle={{
            color: '#666666',
            fontSize: 17,
            fontFamily: 'SegoeUI-Regular',
          }}
          iconContainerStyle={{paddingHorizontal: 0}}
          onPress={() => {
            navigation.navigate('addNewEmployeeScreen', {setStateAPI});
          }}
        />
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        extraData={users}
        keyExtractor={(item) => {
          return item.userID.toString();
        }}
      />
    </View>
  );
};
