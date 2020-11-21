import React, { Component } from 'react';
import Boards from '../Components/Cards/BoardCard';
import { getAllUserBoards } from '../Helpers/Data/BoardData';
import BoardForm from '../Components/Forms/BoardForm';
import AppModal from '../Components/AppModal';
import getUid from '../Helpers/Data/authData';
import Loader from '../Components/Loader';

class BoardArea extends Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    getAllUserBoards(currentUserId).then((resp) => {
      console.warn(resp);
      this.setState({
        boards: resp,
      }, this.setLoading);
    });
  }

  render() {
    const { boards, loading } = this.state;
    const renderBoardsToDom = () => (
      boards.map((board) => <Boards key={board.firebaseKey} board={board} />)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal buttonLabel={'Add Board'}title={'Add Board'} btnColor={'danger'} icon={'fa-plus-circle'} className='align-right'>
            <BoardForm onUpdate={this.getBoards} />
            </AppModal>
          <h1 className='d-flex flex-wrap justify-content-center m-2'>Boards</h1>
          <div className='d-flex flex-wrap justify-content-center container'>{renderBoardsToDom()}</div>
          </>
        )}
      </>
    );
  }
}

export default BoardArea;
