# URL Shortner Client

## Table of contents

1. [Description](#description)
2. [Quick feature summary](#quick-feature-summary)
3. [Tech stack](#tech-stack)
4. [Install & Run](#install--run)
5. [Usage](#usagedemo)

## Description

### Note: A lot more information about the "guts" of this project can be found on the API github (https://github.com/DanilLinkov/UrlShortner)  page so please consider reading it if interested.

URL Shortner client is a front-end React app that provides the ability to store long URLs and access them with a shorter version. Functionality for viewing the list of created ShortUrls, deleting, editing and sharing them is also provided. Custom Ids and expiration dates can also be used for the ShortUrls. All of the features are available to both authenticated and anonymous users and anonymous users are identified between sessions.

An instance of this front-end React app is hosted on Azure here: https://shorturlclient.azurewebsites.net/app

This project makes use of URL Shortner API and a lot more information on it can be found with the following links:

- Source code and documentation: https://github.com/DanilLinkov/UrlShortner
- Azure hosted instance: https://shorturlapi.azurewebsites.net/

The API also makes use of a Key Generation Service (personal project created for this) which can be found here: 

- Source code and documentation: https://github.com/DanilLinkov/KeyGenerationService
- Azure hosted instance: https://kgsapikeyusagefunction.azurewebsites.net/

## Quick feature summary

- Anonymous and Authenticated user support.
- Register and login using session based authentication.
- Create ShortUrls given a valid long URL, a custom Id and a custom expiration date if desired.
- View, edit, delete and share created ShortUrls which are retrieved based on the user's session cookie where anonymous users also contain an encrypted GUID cookie to allow them to be identified between sessions.
- Navigate to ShortUrls and be guided to the stored long url under it's Id.
- Responsive web design allowing for good viewing experience on a variety of screen sizes.
- Hosted on Azure

## Tech stack

- React
- Typescript
- Material UI
- Azure for hosting

API Tech stack can be found in the github link provided above

## Install & run

- `git clone https://github.com/DanilLinkov/UrlShortnerClient.git`
- In a command window at the root level of the project run `npm install` followed by  `npm start`

## Usage/Demo

A link to the hosted instance of this is provided above.

### Home
![image](https://user-images.githubusercontent.com/67947005/152104754-76cf8792-9562-4b11-bf2c-432efe1b3a6c.png)

### My URLs
![image](https://user-images.githubusercontent.com/67947005/152104787-14b27fe7-8a90-4121-a98d-0d8614d5160b.png)
![image](https://user-images.githubusercontent.com/67947005/152104847-f16d6c87-0191-49b8-87c2-f39317c8c04a.png)

### Register & Login
![image](https://user-images.githubusercontent.com/67947005/152104864-46cf5028-9430-4db6-8739-7d52bb0eb113.png)
![image](https://user-images.githubusercontent.com/67947005/152104883-77cf0040-5315-47cf-b84c-19d81ab581bf.png)



