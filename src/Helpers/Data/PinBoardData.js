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

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards${pinId}.json`)
    .then((resp) => {
      resolve(Object.values(resp.data));
    }).catch((error) => reject(error));
});

export default { getAllPins, getPin };
