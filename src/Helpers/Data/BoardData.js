import axios from 'axios';

const baseUrl = 'https://react-pinterest-ce7b3.firebaseio.com';

const getBoards = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Boards.json`)
    .then((response) => {
      const boards = response.data;
      const boardsArray = [];
      if (boards) {
        Object.keys(boards).forEach((boardId) => {
          boardsArray.push(boards[boardId]);
        });
      }
      resolve(boardsArray);
    })
    .catch((error) => reject(error));
});

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    const pinData = response.data;
    const pinArray = [];
    if (pinData) {
      Object.keys(pinData).forEach((pin) => {
        pinArray.push(pinData[pin]);
      });
    }
    resolve(pinArray);
  }).catch((error) => reject(error));
});

const getSingleBoard = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Boards/${firebaseKey}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createBoard = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Boards.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/boards/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updateBoard = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/Boards/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

export {
  getBoards,
  getBoardPins,
  getSingleBoard,
  createBoard,
  updateBoard,
};
