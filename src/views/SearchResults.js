import React, { Component } from 'react';
import Boards from '../Components/Cards/BoardCard';
import PinsCard from '../Components/Cards/PinsCard';
import boardData from '../Helpers/Data/BoardData';

class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchtype: '',
  }

  componentDidMount() {
    this.performSearch();
  }

    performSearch = () => {
      const searchTerm = this.props.match.params.term;
      const searchType = this.props.match.params.type;

      if (searchType === 'boards') {
        boardData.getAllUserBoards().then((resp) => {
          this.setState({
            searchTerm,
            searchType,
          });
        });
        // make api call that gets boards with search term .filter
      } else {
        // make api call that gets boards with search term .filter
        this.setState({
          // results
          searchTerm,
          searchType,
        });
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.searchTerm !== this.props.match.params.term) {
        this.performSearch();
      }
    }

    render() {
      const { results, searchType } = this.state;

      const showResults = () => (
        results.map((result) => (
          searchType === 'boards' ? <Boards key={results.firebaseKey} board={result}/> : <PinsCard key={results.firebaseKey} pin={result}/>
        ))
      );
      return (
      <div>
        <h1>Shows Results</h1>
        {showResults()}
      </div>
      );
    }
}

export default SearchResults;
