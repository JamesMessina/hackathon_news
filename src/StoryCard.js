import React, { useState } from 'react'; 


function StoryCard(props){
    const { title, url, author, points, comments, date } = props; 
    const [count, setCount] = useState(0); 

    return(
        <li style={{listStyle: "none", lineHeight: "2.0", borderBottom: "2px solid"}}>
            <a style={{color:"lightgreen", textDecoration:"none", fontStyle: "italic", fontSize: "35px"}} href={url}>{title}</a>
            <h4> author: {author} ||<span> points: {points} ||</span> <span> No. of Comments: {comments} || <span> Date: {date}</span></span></h4>
            <button onClick={() => setCount(count + 1)}>💗Likes: {count}</button>
        </li>
    )
}

export default StoryCard;  