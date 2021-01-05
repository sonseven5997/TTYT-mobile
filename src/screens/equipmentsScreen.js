import {View, Text, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native-gesture-handler';
import {Button, Icon} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Modal, {ModalContent} from 'react-native-modals';
import ultis from '../../ultis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default EquipmentsScreen = ({navigation}) => {
  //const role = GetRole().then(()=>{console.log(role)});
  const [role,setRole] = React.useState('')
  AsyncStorage.getItem('role').then(res=>{setRole(res)})
  const [currentUserId,setCurrentUserId] = React.useState('')
  AsyncStorage.getItem('id').then(res=>{setCurrentUserId(res)})
  const [equipments, setEquipments] = React.useState([]);
  const equipmentsForUser = equipments.filter(e => e.userId == currentUserId)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [visible, setVisible] = React.useState(false);
  const [deviceId, setDeviceId] = React.useState(null);
  const [date, setDate] = React.useState(new Date());
  function getList() {
    return fetch(
      'https://5f91384ae0559c0016ad7349.mockapi.io/equipments',
    ).then((data) => data.json());
  }
  const setStateAPI = () => {
    getList().then((items) => {
      setEquipments(items);
    });
  };
  setStateAPI();
  // useEffect(() => {
  //   let mounted=true
  //   getList().then((items) => {
  //     if (mounted) {
  //       setEquipments(items);
  //     }
  //   });
  //   console.log(equipments);
  //   return () => {
  //     return mounted=false;
  //   };
  // }, []);
  //getList()
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
          style={{flex: 1}}
          onPress={() => {
            navigation.navigate('equipmentsDetailScreen', {
              id: item.id,
              equipmentName: item.equipmentName,
              equipmentModel: item.equipmentModel,
              equipmentOrigin: item.equipmentOrigin,
              equipmentSerialNumber: item.equipmentSerialNumber,
              equipmentManufacturer: item.equipmentManufacturer,
              equipmentManufactureYear: item.equipmentManufactureYear,
              equipmentFacultyUse: item.equipmentFacultyUse,
              equipmentImage: item.equipmentImage,
              equipmentStatus: item.equipmentStatus,
              equipmentCreatedTime: item.equipmentCreatedTime,
              equipmentCreatedBy: item.equipmentCreatedBy,
              equipmentUpdatedTime: item.equipmentUpdatedTime,
              equipmentUpdatedBy: item.equipmentUpdatedBy,
              userId: item.userId,
            });
          }}>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 13,
              color: '#93c22f',
              marginBottom: 4,
            }}>
            {item.equipmentName}
          </Text>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 15,
              color: '#000000',
              marginBottom: 4,
            }}>
            {item.equipmentFacultyUse}
          </Text>
          <Text
            style={{
              fontFamily: 'SegoeUI-Regular',
              fontSize: 15,
              color: '#666666',
              marginBottom: 4,
            }}>
            {item.equipmentStatus == 0 ? 'Hoạt động' : 'Không hoạt động'}
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
            onPress={() => {
              navigation.navigate('editEquipmentScreen', {
                id: item.id,
                equipmentName: item.equipmentName,
                equipmentModel: item.equipmentModel,
                equipmentOrigin: item.equipmentOrigin,
                equipmentSerialNumber: item.equipmentSerialNumber,
                equipmentManufacturer: item.equipmentManufacturer,
                equipmentManufactureYear: item.equipmentManufactureYear,
                equipmentFacultyUse: item.equipmentFacultyUse,
                equipmentImage: item.equipmentImage,
                equipmentStatus: item.equipmentStatus,
                equipmentCreatedTime: item.equipmentCreatedTime,
                equipmentCreatedBy: item.equipmentCreatedBy,
                equipmentUpdatedTime: item.equipmentUpdatedTime,
                equipmentUpdatedBy: item.equipmentUpdatedBy,
                userId: item.userId,
              });
            }}
          />
          <Button
            disabled={role !== 'admin' ? true : false}
            icon={<Icon name="trash-outline" type="ionicon" size={20} />}
            buttonStyle={{
              margin: 2,
              backgroundColor: '#ffffff',
              borderRadius: 50,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#666666',
            }}
            onPress={async () => {
              //await ultis.deleteData(item.id, 'equipments');
              await fetch(
                `https://5f91384ae0559c0016ad7349.mockapi.io/equipments/${item.id}`,
                {
                  method: 'DELETE',
                },
              );
              setStateAPI();
            }}
          />
          <Button
            icon={<Icon name="hammer-outline" type="ionicon" size={20} />}
            buttonStyle={{
              margin: 2,
              backgroundColor: '#ffffff',
              borderRadius: 50,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#666666',
            }}
            onPress={() => {
              setDeviceId(item.id);
              console.log(deviceId);
              setVisible(true);
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
          icon={<Icon name="add" type="ionicon" size={30} />}
          title="Thêm thiết bị mới"
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
            navigation.navigate('addNewEquipmentScreen', {
              setStateAPI,
            });
          }}
        />
      </View>
      <FlatList
        data={role == 'admin' ? equipments : equipmentsForUser}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        extraData={equipments}
      />
      <Modal
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
        }}
        onHardwareBackPress={() => {
          setVisible(false);
        }}
        modalTitle={
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontFamily: 'SegoeUI-Regular',
                color: '#000000',
                paddingTop: 8,
              }}>
              Len lich bao tri
            </Text>
          </View>
        }
        width={(windowWidth * 3) / 4}
        height={windowHeight / 4}
        useNativeDriver={false}>
        <ModalContent>
          <Text style={{paddingVertical: 8}}>ID thiết bị: {deviceId}</Text>
          <DatePicker
            style={{paddingBottom: 8}}
            format="DD/MM/YYYY"
            onDateChange={(date) => {
              setDate(date);
              console.log(date);
            }}
            date={date}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button
              title="OK"
              buttonStyle={{
                height: 50,
                width: 100,
                backgroundColor: '#93c22f',
                borderRadius: 8,
              }}
              titleStyle={{fontFamily: 'SegoeUI-Regular', fontSize: 17}}
              onPress={async () => {
                const data = {
                  created: date,
                  createdBy: await AsyncStorage.getItem('currentUserName'),
                  equipmentId: deviceId,
                };
                await fetch(
                  'https://5f91384ae0559c0016ad7349.mockapi.io/maintains',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  },
                );
                setVisible(false);
              }}
            />
            <Button
              buttonStyle={{
                height: 50,
                width: 100,
                backgroundColor: '#666666',
                borderRadius: 8,
              }}
              titleStyle={{fontFamily: 'SegoeUI-Regular', fontSize: 17}}
              title="Cancel"
              onPress={() => {
                setVisible(false);
              }}
            />
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
};
