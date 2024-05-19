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

- Add those environment variables to the `.env` file, replacing 'YOUR_KEY' with your actual key:

```plaintext
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
MONGODB_URI=YOUR_MONGODB_URI
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

- Edit `global.js` file, add your backend server(api services) here.

```js
export const api = 'YOUR_SERVER_ADDRESS'
```

+ Replace `com.xxxuan.IBSLover`  with your `bundleIdentifier`   and `CFBundleURLSchemes` in `app.json`

+ Run `eas build:configure` in your terminal to generate a `eas.json` file.
+ Run `eas build --profile development --platform ios `  to generate a `.ipa` file with expo.
+ Follow the instructions, download this `.ipa` file on your iPhone
+ Click the file just downloaded then run `npx expo start --dev--client` to get started **Make sure you iPhone and your mac are in the same network so you can connect**

**IMPORTANT NOTICE: 1. Presumably, your backend service should be on a remote server that can be reached. And a domain name for https configuration.(iPhone will automatically block http request)2. Ensure that the backend service is started before attempting to run the frontend.**

## TODO

- [x] Add some filters so users can choose their preferred locations (like if you don't want to use a toilet in a Walmart, you can filter that out)
- [x]  Add a list view for a more intuitive display of places
- [x] Users can add toilets to the list
- [ ] As the number of votes increases, the icon's color intensifies
- [x] Filter by the number of votes before hitting the PANIC! button
- [ ] Allow users to log in (if they like) and save their favorite toilet spots or create custom locations which are presumably tested and proven to be reliable for the user himself/herself.
- [ ] Propose existing names to users attempting to add a toilet if there is an existing one nearby within 20 meters, encouraging name consistency.
- [ ] Use Google Matrix Distance to calculate the actual distance.
- [ ] Still brainstorming...