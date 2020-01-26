'use strict';

const commentTemplate = ({ dateComment, comment }) => `
    <div class="comment-section">
        <span class="comment-date">${dateComment}</span>
        <p class="comment-text">${comment}</p>
        <div class="separator-line"></div>
    </div>
`;

const renderComments = comments => {
    const selector = document.querySelector('.detail-comments-history');
    let content = '';
    
    if(comments)
        content = comments.map(commentTemplate).join('');

    selector.innerHTML = content;
};

export { renderComments };