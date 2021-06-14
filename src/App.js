import React, { Component } from 'react'; 
import axios from 'axios'; 

import './App.css';

class StoryList extends Component{
  constructor(props){
    super(props)

    this.state = {
      isLoading: true, 
      stories: [],
      searchTerm: ""
    }
  }

  componentDidMount(){
    axios.get('http://hn.algolia.com/api/v1/search')
    .then(res => {
      const stories = res.data.hits
      console.log(stories)
      this.setState({isLoading: false, stories : stories})
    })
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  
  render(){
    return (
      <div className="App">
      <header className="App-header">
        <form>
          <label>Search:</label>
          <input name="searchTerm" type="text" placeholder="title, author, date..." value={this.state.searchTerm} onChange={(e) =>{this.handleChange(e)}}></input>
        </form>
      </header>
      </div>
    );
  }
} 

export default StoryList;
