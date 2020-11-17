import axios from 'axios';

const baseUrl = 'https://react-pinterest-ce7b3.firebaseio.com';

const getAllPins = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Pins.json`)
    .then((response) => {
      const Pins = response.data;
      const PinsArray = [];
      if (Pins) {
        Object.keys(Pins).forEach((boardId) => {
          PinsArray.push(Pins[boardId]);
        });
      }
      resolve(PinsArray);
    })
    .catch((error) => reject(error));
});

const getPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    const pinResponse = response.data;
    const pinArray = [];
    if (pinResponse) {
      Object.keys(pinResponse).forEach((pin) => {
        pinArray.push(pinResponse[pin]);
      });
    }
    resolve(pinArray);
  }).catch((error) => reject(error));
});

const getSinglePin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { getAllPins, getPins, getSinglePin };
