import axios from 'axios';

const baseUrl = 'https://react-pinterest-ce7b3.firebaseio.com';

const getBoards = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Boards.json`)
    .then((resp) => {
      resolve(Object.values(resp.data));
    })
    .catch((error) => reject(error));
});

export default { getBoards };
