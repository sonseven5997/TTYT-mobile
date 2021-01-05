const equipments = [
  {
    id: 4,
    equipmentName: 'May chup X quang',
    equipmentModel: null,
    equipmentOrigin: null,
    equipmentSerialNumber: null,
    equipmentManufacturer: null,
    equipmentManufactureYear: null,
    equipmentFacultyUse: null,
    equipmentImage: null,
    equipmentStatus: 0,
    equipmentCreatedTime: null,
    equipmentCreatedBy: null,
    equipmentUpdatedTime: null,
    equipmentUpdatedBy: null,
    userId: null,
  },
  {
    id: 8,
    equipmentName: 'Máy điện tim 6 căn',
    equipmentModel: 'ECG-1250K',
    equipmentOrigin: 'Nhật Bản',
    equipmentSerialNumber: '14051',
    equipmentManufacturer: 'Nihon Kohden',
    equipmentManufactureYear: '2020',
    equipmentFacultyUse: 'Bệnh lý tuyến giáp',
    equipmentImage: null,
    equipmentStatus: 0,
    equipmentCreatedTime: '2020-11-19T16:13:26.000+00:00',
    equipmentCreatedBy: 'user1',
    equipmentUpdatedTime: null,
    equipmentUpdatedBy: null,
    userId: null,
  },
  {
    id: 10,
    equipmentName: 'Máy đo nhiệt độ bằng hồng ngoại AR862F',
    equipmentModel: 'ECG-1250K',
    equipmentOrigin: 'Nhật Bản',
    equipmentSerialNumber: '14052',
    equipmentManufacturer: 'Nihon Kohden',
    equipmentManufactureYear: '2019',
    equipmentFacultyUse: 'Bệnh lý tuyến giáp',
    equipmentImage: null,
    equipmentStatus: 0,
    equipmentCreatedTime: '2020-11-19T16:24:37.000+00:00',
    equipmentCreatedBy: 'user1',
    equipmentUpdatedTime: null,
    equipmentUpdatedBy: null,
    userId: '11',
  },
];

const users = [
  {
    userID: 5,
    userLoginId: 'user1',
    userPassword: '1',
    userName: 'Hoang Son',
    userRole: 'Quản lý',
    userCreatedTime: '2020-11-19T16:03:47.000+00:00',
    userCreatedBy: null,
    userUpdatedTime: null,
    userUpdatedBy: null,
    departmentId: null,
  },
  {
    userID: 11,
    userLoginId: 'admin1',
    userPassword: 'admin',
    userName: 'thao',
    userRole: 'admin',
    userCreatedTime: null,
    userCreatedBy: null,
    userUpdatedTime: null,
    userUpdatedBy: null,
    departmentId: '1',
  },
];

const history = [];

const departments = [
  {
    id: 6,
    departmentName: 'abcabc',
    address: 'abcabc',
  },
  {
    id: 7,
    departmentName: 'abcabc',
    address: 'abcabc',
  },
  {
    id: 8,
    departmentName: 'abcabc',
    address: 'abcabc',
  },
];

export {equipments, users, history, departments};
