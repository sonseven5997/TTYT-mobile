import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import ultis from '../../ultis';

const TextDetail = (props) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{props.content}</Text>
      <TextInput
        style={styles.textStyle}
        value={props.title}
        onChangeText={props.onChange}
      />
    </View>
  );
};

export default EquipmentsDetailScreen = ({route, navigation},props) => { 
  
  console.log(props);
  const [status, setStatus] = React.useState(data.equipmentStatus);
  const [name, setName] = React.useState(data.equipmentName);
  const [model, setModel] = React.useState(data.equipmentModel);
  const [origin, setOrigin] = React.useState(data.equipmentOrigin);
  const [serialNumber, setSerialNumber] = React.useState(
    data.equipmentSerialNumber,
  );
  const [manufacturer, setManufacturer] = React.useState(
    data.equipmentManufacturer,
  );
  const [manufactureYear, setManufactureYear] = React.useState(
    data.equipmentManufactureYear,
  );
  const [facultyUse, setFacultyUse] = React.useState(data.equipmentFacultyUse);
  const [user, setUser] = React.useState(data.userId);
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
            navigation.navigate('Thiết bị');
          }}
        />
        <View></View>
      </View>
      
      <ScrollView >
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'SegoeUI-Regular',
            color: '#000000',
            marginHorizontal: 16,
            paddingTop: 4,
          }}>
          ID: {data.id}
        </Text>
        <TextDetail
          content="Tên thiết bị:"
          title={name}
          onChange={(text) => {
            setName(text);
          }}
        />
        <TextDetail
          content="Mẫu thiết bị:"
          title={model}
          onChange={(text) => {
            setModel(text);
          }}
        />
        <TextDetail
          content="Xuất xứ:"
          title={origin}
          onChange={(text) => {
            setOrigin(text);
          }}
        />
        <TextDetail
          content="Mã series:"
          title={serialNumber}
          onChange={(text) => {
            setSerialNumber(text);
          }}
        />
        <TextDetail
          content="Nhà sản xuất:"
          title={manufacturer}
          onChange={(text) => {
            setManufacturer(text);
          }}
        />
        <TextDetail
          content="Năm sản xuất:"
          title={manufactureYear}
          onChange={(text) => {
            setManufactureYear(text);
          }}
        />
        <TextDetail
          content="Khoa viện sử dụng:"
          title={facultyUse}
          onChange={(text) => {
            setFacultyUse(text);
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'SegoeUI-Regular',
              color: '#000000',
              marginHorizontal: 16,
              paddingTop: 4,
            }}>
            Trạng thái
          </Text>
          <View style={{marginHorizontal: 16, paddingTop: 4}}>
            <Picker
              selectedValue={status}
              onValueChange={(value) => {
                setStatus(value);
              }}>
              <Picker.Item label="Hoạt động" value={1} />
              <Picker.Item label="Không hoạt động" value={0} />
            </Picker>
          </View>
        </View>
        <TextDetail
          content="ID người sử dụng:"
          title={user}
          onChange={(text) => {
            setUser(text);
          }}
        />
      <Button title="Xác nhận" onPress={async ()=>{
        
        const dataToEdit = {
          id: data.id,
          equipmentName: name,
          equipmentModel:model,
          equipmentOrigin:origin,
          equipmentSerialNumber:serialNumber,
          equipmentManufacturer:manufacturer,
          equipmentManufactureYear:manufactureYear,
          equipmentFacultyUse:facultyUse,
          equipmentStatus:status,
          equipmentUpdatedTime: new Date(),
          equipmentUpdatedBy: await AsyncStorage.getItem('currentUserName'),
          userId: user 
        }
        await ultis.putData(data.id,'equipments',dataToEdit)
        navigation.navigate('Thiết bị')
      }}/>
      </ScrollView>
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
