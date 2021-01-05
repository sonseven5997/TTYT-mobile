import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button, Icon} from 'react-native-elements';

const TextDetail = (props) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </View>
  );
};

export default EmployeesDetailScreen = ({route,navigation}) => {
  const data = route.params;
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          
          icon={<Icon name="chevron-back-outline" type="ionicon" size={30} />}
          title="Quay lại"
          buttonStyle={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 0,
            marginHorizontal: 0,
          }}
          titleStyle={{
            color: '#666666',
            fontSize: 17,
            fontFamily: 'SegoeUI-Regular',
          }}
          iconContainerStyle={{paddingHorizontal: 0}}
          onPress={() => {
            navigation.navigate('Nhân viên');
          }}
        />
        <View></View>
      </View>
      <View>
        <TextDetail title={'ID nhân viên: ' + data.userID} />
        <TextDetail title={'Tên đăng nhập: ' + data.userLoginId} />
        <TextDetail title={'Mật khẩu: ' + data.userPassword} />
        <TextDetail title={'Tên nhân viên: ' + data.userName} />
        <TextDetail title={'Chức vụ: ' + data.userRole} />
        <TextDetail title={'Ngày tạo: ' + data.userCreatedTime} />
        <TextDetail title={'Người tạo: ' + data.userCreatedBy} />
        <TextDetail title={'Ngày cập nhật: ' + data.userUpdatedTime} />
        <TextDetail title={'Người cập nhật: ' + data.userUpdatedBy} />
        <TextDetail title={'Khoa viện: ' + data.departmentId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    fontFamily: 'SegoeUI-Regular',
    color: '#000000',
  },
  containerStyle: {
    marginHorizontal: 16,
    paddingTop: 4,
  },
});
