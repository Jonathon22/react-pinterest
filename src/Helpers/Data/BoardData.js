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

const getAllBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createBoard = (data) => axios.post(`${baseUrl}/Boards.json`, data).then((response) => {
  const update = { firebaseKey: response.data.name };
  axios.patch(`${baseUrl}/Boards/${response.data.name}.json`, update)
    .catch((error) => console.warn(error));
});

const updateBoard = (dataObject) => axios.patch(`${baseUrl}/boards/${dataObject.firebaseKey}.json`, dataObject);

export {
  getBoards,
  getAllBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
};
