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
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardid"&equalTo="${boardId}"`).then((response) => {
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

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Boards.json?orderBy="userid"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createBoard = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Boards.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/Boards/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchResponse) => {
          resolve(patchResponse);
        }).catch((error) => reject(error));
    });
});

const updateBoard = (boardObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseUrl}/boards/${boardObj.firebaseKey}.json`, boardObj)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const deleteBoard = (boardFirebaseKey) => axios.delete(`${baseUrl}/Boards/${boardFirebaseKey}.json`)
  .then(() => {
    axios.get(`${baseUrl}/pin-boards.json?orderBy="boardId"&equalTo="${boardFirebaseKey}"`)
      .then((response) => {
        const responseArray = Object.values(response);
        responseArray.forEach((respArr) => {
          const pinBoardArray = Object.keys(respArr);
          pinBoardArray.forEach((id) => {
            deletePinBoard(id);
          });
        });
      });
  });

const deletePinBoard = (pinid) => axios.delete(`${baseUrl}/pin-boards/${pinid}.json`);

const createBoardToPin = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/pin-boards.json`, obj).then((response) => {
      axios.patch(`${baseUrl}/pin-boards/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchResponse) => {
          resolve(patchResponse);
        }).catch((error) => reject(error));
    });
});

export default {
  getAllUserBoards,
  getBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardPins,
  createBoardToPin,
};
