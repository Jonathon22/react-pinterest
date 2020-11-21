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

export {
  getBoardPins,
  getPin,
  getAllUserPins,
  getPins,
};
