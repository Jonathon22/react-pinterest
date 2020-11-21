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

const updateBoard = (dataObject) => axios.patch(`${baseUrl}/Boards/${dataObject.firebaseKey}.json`, dataObject);

export {
  getAllUserBoards,
  getBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
};
