import axios from 'axios';
import boardData from './BoardData';

const baseUrl = 'https://react-pinterest-ce7b3.firebaseio.com';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPinsOnHome = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Pins.json?orderBy="private"&equalTo=false`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getAllUserPins = (userid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Pins.json?orderBy="userid"&equalTo="${userid}"`).then((response) => {
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

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createPin = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Pins.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/Pins/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/Pins/${pinId}.json`);

const updatePin = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/Pins/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const deleteBoardPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="pinId"&equalTo="${pinId}"`)
    .then((response) => {
      const responseArray = Object.values(response);
      responseArray.forEach((respArr) => {
        const pinBoardIdsArray = Object.keys(respArr);
        pinBoardIdsArray.forEach((id) => {
          boardData.deletePinBoard(id);
        });
      });
    });
});

const deletePinsOfBoards = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/pins-boards/${firebaseKey}.json`).then((response) => { if (response.statusText === 'OK') { resolve(0); } }).catch((error) => reject(error));
});

const addPinsOfBoards = (dataObject) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins-boards.json`, dataObject).then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, update);
  }).catch((error) => reject(error));
});

export {
  getBoardPins,
  getPinsOnHome,
  getPins,
  deleteBoardPin,
  getAllUserPins,
  getPin,
  createPin,
  deletePin,
  updatePin,
  deletePinsOfBoards,
  addPinsOfBoards,
};
