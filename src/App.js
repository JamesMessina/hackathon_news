import React, { Component } from 'react'; 
import axios from 'axios'; 

import './App.css';

import ListStories from './ListStories'

class StoryList extends Component{
  constructor(props){
    super(props)

    this.state = {
      isLoading: true, 
      stories: [],
      searchTerm: "",
      searchType: "",
      isClicked: false
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

  handleClick = (value) =>{
    this.setState({searchType: value})
  }

  handleButtonClick = () =>{
    if(this.state.isClicked === false){
      this.setState({isClicked: true})
    }else{
      this.setState({isClicked: false})
    }
  }

  filterSearchByDate = (term) =>{
    return(item) => {
      return (
        item.created_at.toLowerCase().includes(term.toLowerCase())
      )
    }
  }

  filterSearchByAuthor = (term) =>{
    return(item) => {
      return (
        item.author.toLowerCase().includes(term.toLowerCase())
      )
    }
  }

  
  render(){
    return (
      <div className="App">
      <header className="App-header">
        <form style = {{fontSize: "20px"}}>
          <input name="searchTerm" placeholder="search by author or date" type="text" value={this.state.searchTerm} onChange={(e) =>{this.handleChange(e)}}/>
          <input type="radio" id="author" checked={this.state.searchType === 'author'} onClick ={() => {this.handleClick('author')}}/>
          <label for="author">Author</label>
          <input type="radio" id="date" checked={this.state.searchType === 'date'} onClick ={() => {this.handleClick('date')}} />
          <label for="date">Date</label>
        </form>
        <button onClick={this.handleButtonClick}>List All Stories</button>
        {this.state.isClicked ?
          <ListStories stories={this.state.stories}/> :
          <div></div>
        }
        {
          (this.state.searchTerm && this.state.searchType === 'date') ?
          <ListStories stories={this.state.stories.filter(this.filterSearchByDate(this.state.searchTerm))}/> :
          (this.state.searchTerm && this.state.searchType === 'author') ?
          <ListStories stories={this.state.stories.filter(this.filterSearchByAuthor(this.state.searchTerm))}/> :
          <div></div>
          
        }
      </header>
      </div>
    );
  }
} 

export default StoryList;
