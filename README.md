# Indie AD AuthChat

## Description

This is a small project for my portfolio to showcase the implementation of an authenticated chatroom  
using Vite + React with Bootstrap for the front-end and PocketBase PaaS for the back-end. Altogether,  
this project took about two workweeks to complete and contains about 1700 lines of code.

Almost all of the code and logic is original, with only a tiny fraction of it taken directly from the  
Bootstrap documentation. No help was obtained from any tutorial videos, articles or third-parties and  
the internet was only used for reading related documentation, troubleshooting bugs and some CSS rules.  

## How to use

Download the whole project folder and run the included "run_server.bat" script, which starts the PocketBase  
server and opens your default web browser to the URL that is being served by the local PocketBase instance.  
Then you can just interact with the chatroom as with any other website. I would recommend you to open  
a second incognito (anonymous) tab and login with another username to see how the views differ.

## Features

### Authentication

1. Login, logout and account registration capability.
1. Login and account registration forms use modal windows. 
1. Client-side username and password validation for the registration form.
1. Input fields display invalid state using form feedback components.
1. Notification of network or backend errors through browser alerts.
1. Responsive layout for desktop, tablet and mobile screens.

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
1. Responsive layout for desktop, tablet and mobile screens.

## Limitations

+ Because this version of PocketBase that is used for this project does not support server-side functions,  
it is not possible in a reasonable manner to log out an unresponsive client who has failed to log itself out.  
It could be done unreasonably, whereby each client would have to track the heartbeat of every other  
active client, but this is not a scalable approach for larger userbases.  

+ Does not support Landscape mode on mobile devices.
