import {View, Text} from 'react-native';
import InputForm from './inputForm';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-elements';
import ultis from '../../ultis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
export default AddNewDepartmentScreen = ({route,navigation}) => {
  const [departmentName, setDepartmentName] = React.useState('');
  const [address, setAddress] = React.useState('');
  return (
    <View>
      <InputForm
        title="Tên khoa viện"
        value={departmentName}
        onChange={(text) => {
          setDepartmentName(text);
        }}
        textSecure={false}
      />
      <InputForm
        title="Địa chỉ"
        value={address}
        onChange={(text) => {
          setAddress(text);
        }}
        textSecure={false}
      />
      <Button
        title="Xác nhận"
        onPress={async () => {
          if (
            departmentName !== '' &&
            address !== '' 
          ) {
            const data = {
              departmentName,
              address,
            }
            //await ultis.postData('users',data)
            await fetch(`https://5f91384ae0559c0016ad7349.mockapi.io/departments`,{
              method:'POST',
              body:JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            await route.params.setStateAPI()
            navigation.navigate('Phòng ban')
          }
        }}
      />
    </View>
  );
};
