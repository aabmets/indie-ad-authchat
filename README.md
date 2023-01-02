# Indie AD AuthChat

## Description

This is a small project for my portfolio to showcase the implementation of an authenticated chatroom  
using Vite + React with Bootstrap for the front-end and PocketBase PaaS for the back-end. Alltogether,  
this project took about two workweeks to complete and contains about 1700 lines of code. 

## How to use

The project folder contains a simple batch script "run_server.bat", which will run the PocketBase server  
and open your default web browser to the URL that is being served by the local PocketBase instance.

## Features

### Authentication

1. Login, logout and account registration.
1. Login and account registration forms use modal windows. 
1. Client-side password strength validation for registration form.
1. Server-side username availability check for registration form.
1. User notification through browser alerts in case of errors.
1. Responsive and mobile screen versions of the auth page.

### Chatroom

1. It has an active-users list, a messages list and message input field.
1. Server-side database changes propagate in realtime to all active users.
1. The current user has a different avatar icon than the other users.
1. The messages list autoscrolls to the bottom when new messages arrive and the user has not scrolled up.
1. When the user has scrolled up to see older messages, a "Back to newer" button is shown at the bottom of the chat window.
1. Scrolling to the top of the current messages list will cause the client to fetch more messages from the server.
1. The notification "No more messages" is shown at the top of the chat window when the client has fetched all messages from the server.
1. Hovering the mouse over a message will display a tooltip about the author and the timestamp of the message.
1. Responsive and mobile screen versions of the chatroom.