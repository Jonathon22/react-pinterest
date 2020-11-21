import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../Helpers/Data/authData';
import { updateBoard, createBoard } from '../../Helpers/Data/BoardData';

class BoardForm extends Component {
  state = {
    firebaseKey: this.props.board?.firebaseKey || '',
    name: this.props.board?.name || '',
    imageUrl: this.props.board?.imageUrl || '',
    description: this.props.board?.description || '',
    userid: this.props.board?.userid || '',
  }

  componentDidMount() {
    const userid = getUser();
    this.setState({
      userid,
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      console.warn(e.target.files);
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`pinterest/${this.state.userid}/${Date.now()}/${e.target.files[0].name}`);

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
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.btn.setAttribute('disabled', 'disabled');
    if (this.state.firebaseKey === '') {
      createBoard(this.state)
        .then(() => {
          this.props.onUpdate?.();
          this.setState({
            success: true,
          });
        });
    } else {
      updateBoard(this.state)
        .then(() => {
          this.props.onUpdate?.(this.props.board.firebaseKey);
          this.setState({
            success: true,
          });
        });
    }
  }

  render() {
    const { success } = this.state;

    return (
      <>
      { success && (<div className="alert alert-danger" role="alert">Board Was Created</div>)
      }
      <form onSubmit={this.handleSubmit}>
        <h1 className='m-3'>Board Form</h1>
        <input
        type='text'
        name='name'
        value={this.state.name}
        onChange={this.handleChange}
        placeholder='Board Name'
        className='form-control form-control-lg m-1'
        required
        />
        <input
        type='text'
        name='description'
        value={this.state.description}
        onChange={this.handleChange}
        placeholder='Board Description'
        className='form-control form-control-lg m-1'
        required
        />
        <input
        type='url'
        name='imageUrl'
        value={this.state.imageUrl}
        onChange={this.handleChange}
        placeholder='Enter an Image Url or upload a file'
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
        <button ref={(btn) => { this.btn = btn; }} className="btn btn-primary m-2">Submit</button>
      </form>
      </>
    );
  }
}

export default BoardForm;
