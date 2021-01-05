import {View, Text} from 'react-native';
import InputForm from './inputForm';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-elements';
import ultis from '../../ultis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
export default AddNewEmployeeScreen = ({route,navigation}) => {
  const [userName, setUserName] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [userRole, setUserRole] = React.useState('');
  const [department, setDepartment] = React.useState('');
  return (
    <View>
      <InputForm
        title="Tên đăng nhập"
        value={userName}
        onChange={(text) => {
          setUserName(text);
        }}
        textSecure={false}
      />
      <InputForm
        title="Mật khẩu"
        value={userPassword}
        onChange={(text) => {
          setUserPassword(text);
        }}
        textSecure={true}
      />
      <InputForm
        title="Tên nhân viên"
        value={name}
        onChange={(text) => {
          setName(text);
        }}
        textSecure={false}
      />
      <Picker
        selectedValue={userRole}
        onValueChange={(value) => {
          setUserRole(value);
        }}>
        <Picker.Item label="Quản lý" value="admin" />
        <Picker.Item label="Nhân viên" value="user" />
      </Picker>
      <InputForm
        title="Khoa viện"
        value={department}
        onChange={(text) => {
          setDepartment(text);
        }}
        textSecure={false}
      />
      <Button
        title="Xác nhận"
        onPress={async () => {
          if (
            userName !== '' &&
            userPassword !== '' &&
            name !== '' &&
            userRole !== '' &&
            department !== ''
          ) {
            const data = {
              userLoginId: userName,
              userPassword,
              userName: name,
              userCreatedTime: new Date(),
              userCreatedBy: await AsyncStorage.getItem('currentUserName'),
              departmentId: department
            }
            //await ultis.postData('users',data)
            await fetch(`https://5f91384ae0559c0016ad7349.mockapi.io/users`,{
              method:'POST',
              body:JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            await route.params.setStateAPI()
            navigation.navigate('Nhân viên')
          }
        }}
      />
    </View>
  );
};
