# The Budget Track - PWA Online/Offline Budget Tracker

The Budget Track application allows for offline access and functionality. The application allows user to add expenses and deposits to their budget online and offline. Transactions processed during offline populate the total when online is accessible.

## User Story
AS AN avid traveller
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling

## Installation

No installation required for usage unless cloning project.

Dependencies can be installed with the following command:

```sh
npm install
```
MongoDB and connection to your application required to utilize a database with application.

To run application:

```sh
node server.js
```
or

```sh
npm start
```

## Usage

The user will be able to add expenses and deposits to their budget with or without a connection.

Offline Functionality:

  * Enter deposits offline

  * Enter expenses offline

When brought back online:

  * Offline entries should be added to tracker.


The URL to the deployed application:

[Heroku Deployment](https://thebudgettrack.herokuapp.com)