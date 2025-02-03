# ONDC X BECon'25 Hackathon

## Team Details 👥
- **Team Name**: CodeOn
- **College**: Netaji Subhas University of Technology, Delhi
- **Problem Statement**: PS:3 - Revolutionizing Onboarding for Kirana Stores

### <a href="https://www.youtube.com/watch?v=pKKPCBb3KKw" target="_blank">App Demo Video</a>
### <a href="https://drive.google.com/file/d/1BAIDGt9H2TqT3sqOQAWtlcJEXJTX97nl/view?usp=sharing" target="_blank">PPT</a>

## Presentation Deck, Video Demonstration and APK File (Google Drive Link)
[Click Here](https://drive.google.com/drive/folders/1sTWvypS9DgQsAeffXuO7PUecVJ6He2zZ?usp=sharing)


## Features ✨
- **Multilingual Support** (9 different languages)  
- **Automated Document Verification**  
- **Automated Catalog Creation**  
- **Multilingual Voice Assistant** (9 different languages)  
- **Chatbot**

 <img src="https://github.com/user-attachments/assets/afa11022-001c-462b-8583-1b291a83b661" style="width: 100%; height: auto;">


## Tech Stack 💻
### Frontend
- React Native (Expo)
### Backend
- Node.js
- Express.js
- MongoDB
- Google API

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the frontend directory and add the following:
    ```env
    EXPO_PUBLIC_GOOGLE_API_KEY=
    EXPO_PUBLIC_GOOGLE_VISION_API_KEY=
    EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY=
    EXPO_PUBLIC_CLOUD_NAME=
    EXPO_PUBLIC_UPLOAD_PRESET=
    EXPO_PUBLIC_MY_API_URL=
    ```

4. Start the development server:
    ```bash
    npx expo start -c
    ```

5. Install Expo Go on your mobile device and scan the QR code to run the application.

---

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the backend directory and add the following:
    ```env
    GOOGLE_APPLICATION_CREDENTIALS=./key.json
    JWT_SECRET=
    MONGODB_URI=
    CORS_ORIGIN=*
    GOOGLE_GEMINI_API_KEY=""
    ```

4. Create a `key.json` file in the backend directory and add your Google Translation API credentials.


