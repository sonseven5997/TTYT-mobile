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

export default EquipmentsDetailScreen = ({route, navigation}) => {
  const data = route.params;
  const [history, setHistory] = React.useState([]);
  function getList() {
    return fetch(
      `https://5f91384ae0559c0016ad7349.mockapi.io/maintains`,
    ).then((data) => data.json());
  }
  const setStateAPI = () => {
    getList().then((items) => {
      setHistory(items.filter((element) => element.equipmentId == data.id));
    });
  };
  setStateAPI();
  const renderHistory = () => {
    return history.map((e) => {
      return (
        <View >
          <Text style={styles.textStyle}>Thời gian bảo trì: {e.created}</Text>
          <Text style={styles.textStyle}>Người tạo: {e.createdBy}</Text>
        </View>
      );
    });
  };
  console.log(data);
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
      <View>
        <TextDetail title={'ID: ' + data.id} />
        <TextDetail title={'Tên thiết bị: ' + data.equipmentName} />
        <TextDetail title={'Mẫu thiết bị: ' + data.equipmentModel} />
        <TextDetail title={'Xuất xứ: ' + data.equipmentOrigin} />
        <TextDetail title={'Mã seri: ' + data.equipmentSerialNumber} />
        <TextDetail title={'Nhà sản xuất: ' + data.equipmentManufacturer} />
        <TextDetail title={'Năm sản xuất: ' + data.equipmentManufactureYear} />
        <TextDetail title={'Khoa viện sử dụng: ' + data.equipmentFacultyUse} />
        <TextDetail
          title={
            'Tình trạng thiết bị: ' + data.equipmentStatus == 0
              ? 'Không hoạt động'
              : 'Hoạt động'
          }
        />
        <TextDetail title={'Thời gian tạo: ' + data.equipmentCreatedTime} />
        <TextDetail title={'Người tạo: ' + data.equipmentCreatedBy} />
        <TextDetail
          title={'Thời gian cập nhật: ' + data.equipmentUpdatedTime}
        />
        <TextDetail title={'Người cập nhật: ' + data.equipmentUpdatedBy} />
        <TextDetail title={'ID người sử dụng: ' + data.userId} />
        <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>Lịch sử bảo trì</Text>
          {renderHistory()}
        </View>
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
