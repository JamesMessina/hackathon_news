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
      isClicked: false,
      selectedOption: ""
    }
  }

  componentDidMount(){
    axios.get('https://hn.algolia.com/api/v1/search')
    .then(res => {
      const stories = res.data.hits
      console.log(stories)
      this.setState({isLoading: false, stories : stories})
    })
  }

  handleChange = (e) =>{
    console.log("input being typed", e.target)
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleOptionChange = (e) =>{
    this.setState({selectedOption: e.target.value})
  }

  handleButtonClick = (e) =>{
    e.preventDefault(); 
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

  clearStories = () => {
    this.setState({searchTerm: ""}); 
    this.setState({isClicked: false});
    this.setState({selectedOption: ""})
  }

  
  render(){
    return (
      <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => {this.handleButtonClick(e)}} style = {{fontSize: "20px", display: "flex", flexDirection: "column"}}>
          <input name="searchTerm" placeholder="search by author or date" type="text" value={this.state.searchTerm} onChange={(e) =>{this.handleChange(e)}}/>
          <div>
            <label>
              <input checked={this.state.selectedOption === "author"} value="author" type="radio" onChange={(e) => {this.handleOptionChange(e)}}/>
              Author
            </label>
          </div>  
          <div>
            <label>
              <input checked={this.state.selectedOption === "date"} value="date" type="radio" onChange ={(e) => {this.handleOptionChange(e)}} />
              Date
            </label>
          </div>
          <button>List Stories</button>
        </form>
        <button onClick={(e) => {this.clearStories(e)}}>Clear</button>
        {
          (this.state.searchTerm && this.state.selectedOption === 'date' && this.state.isClicked) ?
            <ListStories stories={this.state.stories.filter(this.filterSearchByDate(this.state.searchTerm))}/> :
          (this.state.searchTerm && this.state.selectedOption === 'author' && this.state.isClicked) ?
            <ListStories stories={this.state.stories.filter(this.filterSearchByAuthor(this.state.searchTerm))}/> :
          (this.state.isClicked) ?
            <ListStories stories={this.state.stories}/> :
          <div></div>
        }
      </header>
      </div>
    );
  }
} 

export default StoryList;
