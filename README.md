# Indie AD AuthChat

## Description

This is a small project for my portfolio to showcase the implementation of an authenticated chatroom  
using Vite + React with Bootstrap for the front-end and PocketBase PaaS for the back-end. Altogether,  
this project took about two workweeks to complete and contains about 1700 lines of code.

Almost all of the code and logic was created by myself, with only a tiny fraction taken directly from  
the Bootstrap documentation. No help was obtained from any tutorial videos nor third-parties and  
the internet was only used for reading related documentation and troubleshooting bugs.  

## How to use

The project folder contains a simple batch script "run_server.bat", which will run the PocketBase server  
and open your default web browser to the URL that is being served by the local PocketBase instance.

## Features

### Authentication

1. Login, logout and account registration capability.
1. Login and account registration forms use modal windows. 
1. Client-side username and password validation for the registration form.
1. Input fields display invalid state using form feedback components.
1. Notification of network or backend errors through browser alerts.
1. Responsive and mobile screen versions of the auth page.

### Chatroom

1. It has an active-users list, a messages list and a message input field.
1. Server-side database changes propagate in realtime to all active users.
1. The current user has a different avatar icon than the other users.
1. A typing indicator is shown for each user who is currently typing into the input field.
1. The messages list autoscrolls to the bottom when new messages arrive and the user has not scrolled up.
1. When the user has scrolled up to see older messages, a "Back to newer" button is shown at the bottom of the chat window.
1. Scrolling to the top of the current messages list will cause the client to fetch more messages from the server.
1. The notification "No more messages" is shown at the top of the chat window when the client has fetched all messages from the server.
1. Messages are aligned either left or right depending if their author is the current user or other users.
1. Successive messages by the same user have the username and avatar icon hidden in order to compact the view.
1. Hovering the mouse over a message will display a tooltip about the author and the timestamp of the message.
1. Users are able to submit their messages using the Enter key on the keyboard.
1. Responsive and mobile screen versions of the chatroom.
