# alumni-network

![GitHub repo size](https://img.shields.io/github/repo-size/Tooppa/alumni-network)

[Backend repository](https://github.com/fi-dotnet-alumni/AlumniNetworkAPI)

## Table of Contents

- [General Information](#general-information)
- [Live Demo](#live-demo)
- [Technologies](#technologies)
- [Installation and Usage](#installation-and-usage)
- [Contributors](#contributors)

## General Information

The Alumni Network web app is a group project made during the Experis Academy full stack course hosted by Noroff. Project members are listed in the [Contributors](#contributors) section. This repository contains the frontend portion of the app.

The fictional use case for the project was that both Experis and Noroff had experienced difficulties in maintaining contact with past candidates, notifying them of social events and gathering data for quality assurance purposes. Our primary task was to create an Alumni Network Portal to facilitate this kind of communication.

In the application itself users can register, log in, browse and post messages in various groups and topics, create new topics and groups, subscribe to existing topics or join groups, comment posts, edit their profile information and send private messages to other users.

In addition to the frontend, the application requires an API which can be found [here](https://github.com/fi-dotnet-alumni/AlumniNetworkAPI) and a working Keycloak authentication service. Intructions on how to set both of them up can be found in the aforementioned link.

## Live Demo

**NOTE:** When using the application for the first time you will need to create a new account. Otherwise log in with an existing account.

Live demo is currently available [here](alumni-network.vercel.app) (Hosted on Vercel)

## Technologies

The project is implemented with the following technologies:

- React
- Next.js
- React-Query
- Typescript
- Tailwind CSS
- React-Modal
- React-Infinite-Scroll

## Installation and Usage

**NOTE:** You will need _node_ and _npm_ installed on your machine

1. Clone the project repository

```sh
git clone https://github.com/Tooppa/alumni-network.git
```

2. Install dependencies

```sh
npm install
```

3. Start the development server

```sh
npm run dev
```

4. To see the application, open your browser and navigate to

```sh
localhost:3000
```

## Contributors

[Tomas Valkendorff (@Tooppa)](https://github.com/Tooppa)

[Arttu Hartikainen (@arttuhar)](https://github.com/arttuhar)

[Mikko Ryynänen (@mikkoryynanen)](https://github.com/mikkoryynanen)

[Timo Järvenpää (@TimoJarvenpaa)](https://github.com/TimoJarvenpaa)
