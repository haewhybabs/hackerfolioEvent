# hackerfolioEvent

## Installation
follow the following commands to get it started:

* git clone https://github.com/haewhybabs/hackerfolioEvent.git
* npm install , to install all the dependencies used in package.json
* start the server with "nodemon"

## Documentation
There are 6 endppoints for the API
* **Registration** : post request to;   "servername"/user/registration , with **fullName,email,password,password_confirmation and phoneNumber for the input post**

*  **Login :** post request to ; "servername"/user/login , with **email** and **password** for the input post
* **Create Event :** post request to ; "servername"/event/create...**eventName, venue,info,type(1=>online, 0=>offline), and the authorization token** is required for the post
* **Admin Event Action :** post request to ; "servername"/event/admin-action .This is to approve or reject an event . The *authorization* token and must be an admin specified on the system are required for the request
* **Admin Event List  :** post request to ; "servername"/event/admin-event-list.The *authorization* token, *an admin access*  are required for the request
* **User Event List :** post request to ; "servername"/event/event-list.The *authorization* token is required

#### PostMan Collection link
https://www.getpostman.com/collections/c23c8bd8439ed787be45

## Author
**Ayobami Babalola**
