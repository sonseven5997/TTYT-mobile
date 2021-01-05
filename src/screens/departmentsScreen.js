import {View, Text, TextInput, FlatList} from 'react-native';
import React from 'react';
import {Button, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default DepartmentsScreen = ({navigation}) => {
  const [role,setRole] = React.useState('')
  AsyncStorage.getItem('role').then(res=>{setRole(res)})
  const [departments, setDepartments] = React.useState([]);
  function getList() {
    return fetch(
      'https://5f91384ae0559c0016ad7349.mockapi.io/departments',
    ).then((data) => data.json());
  }
  const setStateAPI = () => {
    getList().then((items) => {
      setDepartments(items);
    });
  };
  setStateAPI()
  // React.useEffect(() => {
  //   let mounted = true;
  //   getList().then((items) => {
  //     if (mounted) {
  //       setDepartments(items);
  //     }
  //   });
  //   console.log(departments);
  //   return () => (mounted = false);
  // }, []);
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
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 13,
              color: '#93c22f',
              marginBottom: 4,
            }}>
            {item.departmentName}
          </Text>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 15,
              color: '#000000',
              marginBottom: 4,
            }}>
            {item.address}
          </Text>
          {/* <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 15,
              color: '#666666',
              marginBottom: 4,
            }}>
            {item.id}
          </Text> */}
        </View>
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
          title="Thêm phòng ban mới"
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
          onPress={()=>{
            navigation.navigate('addNewDepartmentScreen',{setStateAPI})
          }}
        />
      </View>
      <FlatList
        data={departments}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        extraData={departments}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
      />
    </View>
  );
};
