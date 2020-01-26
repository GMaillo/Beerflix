'use strict';
import { setBeerComment } from './api.js';
import { toggle, renderLoader } from './ui.js';

const commentEventHandler = beerId => {
    const commentSection = document.querySelector('.detail-comments-section');
    const sendButton = document.querySelector('.send-comment-button');    
    const commentCounterIcon = document.querySelector('#comment-counter-container');

    sendButton.addEventListener('click', async evt => {
        evt.preventDefault();
        const commentText = document.querySelector('.create-comment-textarea');        
        const spanError = document.querySelector('.detail-comments-creation-section span.error');

        if (commentText.value === "") { 
            if(spanError.classList.contains('hide'))
                toggle(spanError)('hide', 'show');
            return;
        }
        
        toggle(spanError)('show', 'hide');
        renderLoader('hide', 'show');
        await setBeerComment( beerId, commentText.value );
        window.location.reload();
    });

    commentCounterIcon.addEventListener('click', () => {
        scrollToCommentsSection();
    });

    const scrollToCommentsSection = () => {
        window.scrollTo(commentSection.offsetLeft, commentSection.offsetTop);
    };
}

const renderCommentBox = () => {
    const commentSection = document.querySelector('.detail-comments-creation-section');

    commentSection.innerHTML = `
        <span class="error hide">You must write a comment!!!!!</span>
        <textarea class="create-comment-textarea" placeholder="Write your comment ;)" name="" id="" cols="25" rows="15"></textarea>
        <button class="input send-comment-button submit-button">Send</button>
    `;
};

export { commentEventHandler, renderCommentBox };