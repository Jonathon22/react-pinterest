import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../Helpers/Data/authData';
import boardData from '../../Helpers/Data/BoardData';
import {
  createPin,
  updatePin,
  deletePinsOfBoards,
  addPinsOfBoards,
} from '../../Helpers/Data/pinData';

class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    private: this.props.pin?.private || false,
    userid: this.props.pin?.userid || '',
    description: this.props.pin?.description || '',
    boards: [],
    success: false,
  }

   boardsRef = React.createRef();

   componentDidMount() {
     const userid = getUser();
     boardData.getBoards(userid).then((response) => {
       this.setState({
         userid,
         boards: response,
       });
     });
   }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(
        `pinterest/${this.state.userid}/${Date.now()}${e.target.files[0].name}`,
      );
      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.firebaseKey === '') {
      const newPin = {
        name: this.state.name,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        firebaseKey: this.state.firebaseKey,
        userid: this.state.userid,
        private: this.state.private,
      };
      createPin(newPin).then((response) => {
        const pinBoard = {
          boardId: this.boardsRef.current.value,
          pinId: response.data.firebaseKey,
          userid: this.state.userid,
        };
        boardData.createBoardToPin(pinBoard);
      }).then(() => {
        this.props.onUpdate?.(this.props.boardId);
        this.setState({
          success: true,
        });
      });
    } else {
      boardData.getPinsBoards(this.state.firebaseKey).then((response) => {
        response.forEach((item) => {
          const newArray = Object.values(item);
          if (newArray.includes(this.state.firebaseKey)) {
            deletePinsOfBoards(item.firebaseKey);
          }
        });
      });
      const newPin = {
        firebaseKey: this.state.firebaseKey,
        description: this.state.description,
        name: this.state.name,
        imageUrl: this.state.imageUrl,
        private: this.state.private.value,
        userid: this.state.userid,
        website: this.state.website,
      };
      updatePin(newPin).then((response) => {
        const pinBoardObj = {
          boardId: this.boardsRef.current.value,
          pinId: response.data.firebaseKey,
          userid: this.state.userid,
        };
        addPinsOfBoards(pinBoardObj);
      })
        .then(() => {
          this.props.onUpdate?.(this.props.pin.firebaseKey);
          this.setState({ success: true });
        });
    }
  };

  render() {
    const { success, boards } = this.state;
    return (
      <>
      { success && (<div className="alert alert-success" role="alert">Pin Was Updated/Created!</div>)
      }
      <form onSubmit={this.handleSubmit}>
        <h1>Pin Form</h1>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Pin Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Pin Description'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='imageUrl'
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an Image URL or Upload a File'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          className='m-2'
          type='file'
          id='myFile'
          name='filename'
          accept='image/*'
          onChange={this.handleChange}
        />
        <p>Set Pin To Public or Private</p>
        <select
          name='private'
          className='form-control form-control-md'
          value={this.state.private}
          onChange={this.handleChange} >
            <option value={'true'}>Private</option>
            <option value={'false'}>Public</option>
        </select>
        <p className='select-board'>Select Board</p>
        <select ref={this.boardsRef} className='form-control form-control-md'>
        {Object.keys(boards).length && boards.map((board) => (
              <option key={board.firebaseKey} value={board.firebaseKey}>{board.name}</option>
        ))}
        </select>
        <button className='btn btn-success'>Submit</button>
      </form>
      </>
    );
  }
}

export default PinForm;
