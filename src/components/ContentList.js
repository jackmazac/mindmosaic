import React from 'react';
import ContentCard from './ContentCard';

const ContentList = ({ contents }) => {
    return (
        <div>
            {contents.map((content, index) => (
                <ContentCard key={index} title={content.title} content={content.content} />
            ))}
        </div>
    );
}

export default ContentList;
