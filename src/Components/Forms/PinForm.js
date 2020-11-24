import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../Helpers/Data/authData';
import boardData from '../../Helpers/Data/BoardData';
import { createPin, updatePin } from '../../Helpers/Data/pinData';

class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    private: this.props.pin?.private || false,
    userid: this.props.pin?.userid || '',
    description: this.props.pin?.description || '',
    boards: [],
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
      createPin(this.state)
        .then(() => {
          this.props.onUpdate();
          this.setState({
            success: true,
          });
        });
    } else {
      updatePin(this.state)
        .then(() => {
          this.props.onUpdate(this.state.firebaseKey);
          this.setState({
            success: true,
          });
        });
    }
  };

  render() {
    const { success } = this.state;
    return (
      <>
      { success && (<div className="alert alert-danger" role="alert">Board Was Created/Updated</div>)
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
        <div className='form-group'>
          <label for='private'>Private or Public</label>
          <select
            className='form-control'
            id='private'
            name='private'
            value={this.state.private}
            onChange={this.handleChange}
            require
          >
            <option>Private</option>
            <option>Public</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
      </>
    );
  }
}

export default PinForm;
