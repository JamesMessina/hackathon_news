import React from 'react'; 

import StoryCard from './StoryCard'

function ListStories(props){
    return(
        <ol>
            {props.stories.map((story, index) =>{
                return(
                    <StoryCard
                    key={index}
                    index={index}
                    url={story.url}
                    title={story.title}
                    author={story.author}
                    points={story.points}
                    comments={story.num_comments}
                    date={story.created_at}/>
                )
            })}
        </ol>
    )
}

export default ListStories; 