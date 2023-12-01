import React from 'react';

const SocialInteraction = ({ likes, comments }) => {
    return (
        <div>
            <p>Likes: {likes}</p>
            <p>Comments: {comments}</p>
        </div>
    );
}

export default SocialInteraction;
