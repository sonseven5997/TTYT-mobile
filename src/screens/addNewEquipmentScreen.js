import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import InputForm from './inputForm';
import {Button, Icon} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import ultis from '../../ultis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default AddNewEquipmentScreen = ({navigation,route}) => {
  const [equipmentName, setEquipmentName] = React.useState('');
  const [equipmentModel, setEquipmentModel] = React.useState('');
  const [equipmentOrigin, setEquipmentOrigin] = React.useState('');
  const [equipmentSerialNumber, setEquipmentSerialNumber] = React.useState('');
  const [equipmentManufacturer, setEquipmentManufacturer] = React.useState('');
  const [
    equipmentManufactureYear,
    setEquipmentManufactureYear,
  ] = React.useState('');
  const [departments, setDepartments] = React.useState([]);
  const [selectedDepartment, setSelectedDepartment] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  //let departments = await ultis.fetchData('departments');
  //let users = await ultis.fetchData('users');
  function getList() {
    return fetch(
      'https://5f91384ae0559c0016ad7349.mockapi.io/departments',
    ).then((data) => data.json());
  }
  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setDepartments(items);
      }
    });
    console.log(departments);
    return () => (mounted = false);
  }, []);
  const pickerItem = () => {
    return departments.map((e, i) => {
      return (
        <Picker.Item
          label={e.departmentName}
          value={e.departmentName}
          key={i}
        />
      );
    });
  };
  return (
    <View style={{backgroundColor: '#FFFFFF', padding: 8, flex:1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height:70,
        }}>
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
            navigation.navigate('Thiết bị');
          }}
        />
        <View></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
        <InputForm
          title="Tên thiết bị"
          value={equipmentName}
          onChange={(text) => {
            setEquipmentName(text);
          }}
          textSecure={false}
        />
        <InputForm
          title="Mẫu thiết bị"
          value={equipmentModel}
          onChange={(text) => {
            setEquipmentModel(text);
          }}
          textSecure={false}
        />
        <InputForm
          title="Xuất xứ"
          value={equipmentOrigin}
          onChange={(text) => {
            setEquipmentOrigin(text);
          }}
          textSecure={false}
        />
        <InputForm
          title="Mã series"
          value={equipmentSerialNumber}
          onChange={(text) => {
            setEquipmentSerialNumber(text);
          }}
          textSecure={false}
        />
        <InputForm
          title="Nhà sản xuất"
          value={equipmentManufacturer}
          onChange={(text) => {
            setEquipmentManufacturer(text);
          }}
          textSecure={false}
        />
        <InputForm
          title="Năm sản xuất"
          value={equipmentManufactureYear}
          onChange={(text) => {
            setEquipmentManufactureYear(text);
          }}
          textSecure={false}
        />
        <View>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 17,
              color: '#666666',
              marginBottom: 8,
            }}>
            Khoa viện sử dụng
          </Text>
          <Picker
            selectedValue={selectedDepartment}
            onValueChange={(value) => {
              setSelectedDepartment(value);
            }}>
            {pickerItem()}
          </Picker>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 17,
              color: '#666666',
              marginBottom: 8,
            }}>
            Trạng thái
          </Text>
          <Picker
            selectedValue={status}
            onValueChange={(value) => {
              setStatus(value);
            }}>
            <Picker.Item label="Hoạt động" value={1} />
            <Picker.Item label="Không hoạt động" value={0} />
          </Picker>
        </View>
        <Button
          title="Xác nhận"
          onPress={async () => {
            
            if (
              equipmentName !== '' &&
              equipmentModel !== '' &&
              equipmentOrigin !== '' &&
              equipmentManufactureYear !== '' &&
              equipmentManufacturer !== '' &&
              equipmentSerialNumber !== '' &&
              selectedDepartment !== null
            ) {
              let data = {
                equipmentName,
                equipmentModel,
                equipmentOrigin,
                equipmentSerialNumber,
                equipmentManufacturer,
                equipmentManufactureYear,
                equipmentFacultyUse: selectedDepartment,
                equipmentImage: null,
                equipmentStatus: status,
                equipmentCreatedTime: new Date(),
                equipmentCreatedBy: await AsyncStorage.getItem('currentUserName'),
                equipmentUpdatedTime: null,
                equipmentUpdatedBy: null,
                userId: null,
              };
              //await ultis.postData('equipments', data);
              await fetch(`https://5f91384ae0559c0016ad7349.mockapi.io/equipments/`,{
                method:"POST",
                body:JSON.stringify(data),headers: {
                  'Content-Type': 'application/json'
                }
              })
              await route.params.setStateAPI()
              navigation.navigate('Thiết bị');
            } else {
              alert('Bạn hãy nhập đầy đủ thông tin!');
            }
          }}
        />
      </ScrollView>
    </View>
  );
};
