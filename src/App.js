import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function Entries({ entries }){
  return (
    <div className="entries">
      <h1>Blog</h1>
      {entries && entries.length > 0 && entries.map(entry => {
        return(
          <div className="entry" key={entry.id}>
            <h2>{entry.title}</h2>
            <p>{entry.body}</p>
          </div>
        )
      })}
    </div>
  )
}

class App extends React.Component {
  state = {
    entries: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    axios({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET'
    })
      .then((response) => {
      this.setState({ entries: response.data })
      })
      .catch((error) => {
        this.setState({ error: true})
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render(){
    if(this.state.loading) return <p>Loading...</p>;
    if(this.state.error) return <p>Oops .. Something went wrong!</p>;
    return (
      <div className="App">
        <Entries entries={this.state.entries} />
      </div>
    );
  }
}

export default App;
