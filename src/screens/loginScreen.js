import {View, Text, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from 'react-native-elements';
import ultis from '../../ultis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputForm from './inputForm';

export default LoginScreen = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const getUsername = (text) => {
    setUsername(text);
  };
  const getPassword = (text) => {
    setPassword(text);
  };
  const onPressLogin = async () => {
    const data = {
      userLoginId: username,
      userPassword: password,
    };
    const res = await ultis.postData('users/login', data);

    if (res.userID !== 0) {
      await AsyncStorage.setItem('role', res.userRole);
      await AsyncStorage.setItem('id', res.userID.toString());
      navigation.navigate('mainScreen');
    } else {
      alert('Bạn đã nhập sai tên đăng nhập hoặc mật khẩu');
    }

    // if (await response.userID !== 0) {
    //   navigation.navigate('mainScreen',{role: response.userRole});
    // } else {
    //   alert('Bạn đã nhập sai tên đăng nhập hoặc mật khẩu')
    // }
  };

  // useEffect(()=>{
  //     fetch('https://floating-eyrie-61483.herokuapp.com/api/equipments',{
  //       method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //       headers: {
  //         'Content-Type': 'application/json'
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       }
  //     }).then(response=>console.log("TestApi",reszzzzzzz)).catch()
  // },[])
  return (
    <View
      style={{
        paddingHorizontal: 32,
        flex: 1,
        justifyContent: 'center',
        paddingTop: 64,
      }}>
      <Text style={{fontFamily: 'SegoeUI-Regular', fontSize: 40, flex: 1}}>
        Quản lý thiết bị y tế
      </Text>
      <View style={{flex: 3}}>
        <Text
          style={{
            marginBottom: 40,
            fontFamily: 'SegoeUI-Regular',
            fontSize: 17,
            color: '#666666',
          }}>
          Đăng nhập để tiếp tục
        </Text>
        <InputForm
          title="Tên đăng nhập"
          onChange={getUsername}
          value={username}
          textSecure={false}
        />
        <InputForm
          title="Mật khẩu"
          onChange={getPassword}
          value={password}
          textSecure={true}
        />
        <Button
          title="Đăng nhập"
          onPress={onPressLogin}
          buttonStyle={{
            height: 50,
            backgroundColor: '#93c22f',
            borderRadius: 8,
          }}
          containerStyle={{marginTop: 24}}
          titleStyle={{fontFamily: 'SegoeUI-Regular', fontSize: 17}}
        />
      </View>
    </View>
  );
};
