import axios from 'axios';

const baseUrl = 'https://react-pinterest-ce7b3.firebaseio.com';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getAllUserPins = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Pins.json?orderBy="userid"&equalTo="${uid}"`).then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const getPins = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Pins.json`)
    .then((response) => {
      const pins = response.data;
      const pinsArray = [];
      if (pins) {
        Object.keys(pins).forEach((boardId) => {
          pinsArray.push(pins[boardId]);
        });
      }
      resolve(pinsArray);
    })
    .catch((error) => reject(error));
});

const getPin = (pinid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Pins/${pinid}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const deletePinsOfBoards = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/pins-boards/${firebaseKey}.json`).then((response) => { if (response.statusText === 'OK') { resolve(0); } }).catch((error) => reject(error));
});

const createPin = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Pins.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/Pins/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const deletePin = (pinuid) => axios.delete(`${baseUrl}/Pins/${pinuid}.json`);

const updatePin = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/Pins/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

export {
  getBoardPins,
  getPins,
  deletePinsOfBoards,
  getAllUserPins,
  getPin,
  createPin,
  deletePin,
  updatePin,
};
