## Why this project built?

This is an open source project aim to help you find the neareast toilet. 

Imagine someday you are about to shit in your pants, but you have no idea where to go!  And you start to search on your map "where is the nearest public toilet?" "oh no😫😫😫 There is no public toilet AT ALL!!" "where is the closest McDonald's??" "Ah! Found it". And you walk 10 minutes to get there. But what you don't know is there is a nearer place you can go to release your stomach JUST BESIDES YOU!!!  And this project is to help you avoid this situation.

## How to use this app?

Starting with this project on your smartphone, just hit `PANIC!` button. It'll show you the nearest bathroom and guide you there automatically.

WHAAAAAT? You dont like that place? That's fine! You can also click other place with `Toliet Signs`  and by clicking `navigate to that place`  you'll also get directions to that place you just clicked.

Remember turn on your `location feature`  and give this app permission to access your current location.

## Getting Started

If you're looking to get a local copy of this project up and running on your machine, make sure to follow these steps.

### Prerequisites

Before you can build this project, you'll need the following software installed:

- Ensure [NodeJs](https://nodejs.org/) is installed on your machine.

### Project Setup

- Begin by cloning the project on your local machine:

```plaintext
git clone https://github.com/xxLovy/IBSLover.git
```

- Then navigate into the directory you just cloned:

```plaintext
cd IBSLover
```

#### Backend Setup

- Navigate to the Backend directory:

```plaintext
cd Backend
```

- Create a `.env` file:

```plaintext
touch .env
```

- Add this environment variable to the `.env` file, replacing 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key:

```plaintext
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
MONGODB_URI=YOUR_MONGODB_URI
REDIS_URI=YOUR_REDIS_URI
```

- Now, install backend dependencies:

```plaintext
npm install
```

- Start the backend service:

```plaintext
node server.js
```

#### Frontend Setup

- Navigate to the frontend directory:

```plaintext
cd Frontend/IBSLover
```

- Install frontend dependencies:

```plaintext
npm install
```

- Start the frontend service, which will run in your local simulator:

```plaintext
npx expo start
```

- While inside the expo client, hit `i` for the iOS simulator or `a` for the Android simulator (note: Android has yet to be tested).

**IMPORTANT NOTICE: Ensure that the backend service is started before attempting to run the frontend.**

## TODO

- [ ] Add some filters so users can choose their preferred locations (like if you don't want to use a toilet in a Walmart, you can filter that out)
- [x]  Add a list view for a more intuitive display of places
- [ ]  Users can add toilets to the list
- [ ] Still brainstorming...