//DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-msg');
const chatRooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
})

// changing username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = newNameForm.name.value.trim();
    chatroom.addChat(`has changed their name to ${name}`);
    chatroom.updateName(name);
    newNameForm.reset();
    updateMessage.innerText = `Success! Name was updated to ${name}`;
    setTimeout(() => updateMessage.innerText = '', 2000);
})

chatRooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => {
            chatUI.render(chat);
        })
    }
})

const username = localStorage.username ? localStorage.username : 'anonymous';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));

