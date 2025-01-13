import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Link, useRouter } from "expo-router";
import i18n from "../utils/language/i18n";
import WebView from 'react-native-webview';

const LanguageSelection = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    { label: "English", value: "en" },
    { label: "বাংলা", value: "bn" },
    { label: "ગુજરાતી", value: "gu" },
    { label: "हिन्दी", value: "hi" },
    { label: "ಕನ್ನಡ", value: "kn" },
    { label: "മലയാളം", value: "ml" },
    { label: "मराठी", value: "mr" },
    { label: "ਪੰਜਾਬੀ", value: "pa" },
    { label: "தமிழ்", value: "ta" },
    { label: "తెలుగు", value: "te" },
  ];

  const dfMessengerHtml = `
  <html>
    <head>
      <link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css">
      <script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
      <style>
        df-messenger {
          z-index: 999;
          position: fixed;
          --df-messenger-font-color: #1a1a1a;
          --df-messenger-font-family: 'Segoe UI', Roboto, system-ui;
          --df-messenger-chat-background: #f8fafc;
          --df-messenger-message-user-background: #2563eb;
          --df-messenger-message-bot-background: #ffffff;
          --df-messenger-button-color: #2563eb;
          --df-messenger-chat-border-radius: 12px;
          --df-messenger-message-border-radius: 16px;
          --df-messenger-input-box-color: #ffffff;
          --df-messenger-input-font-color: #1a1a1a;
          --df-messenger-input-placeholder-font-color: #6b7280;
          --df-messenger-button-hover-color: #1d4ed8;
          --df-messenger-chat-padding: 16px;
          bottom: 20px;
          right: 20px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }

        df-messenger-chat {
          width: 380px !important;
          height: 520px !important;
        }

        df-messenger-message {
          margin: 8px 0;
          padding: 12px 16px;
          font-size: 15px;
          line-height: 1.5;
        }

        df-messenger-message[agent="user"] {
          color: #ffffff;
        }

        df-messenger-titlebar {
          background: #2563eb;
          padding: 16px;
          border-radius: 12px 12px 0 0;
        }

        df-messenger-input {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin: 8px;
          padding: 12px;
        }
      </style>
    </head>
    <body>
      <df-messenger
        location="asia-south1"
        project-id="ondc-seller-app-447005"
        agent-id="b3563bc0-3b20-46ce-b517-893726e02209"
        language-code="en"
        max-query-length="-1">
        <df-messenger-chat-bubble 
          chat-title="ONDC Support"
          chat-subtitle="We typically reply in a few minutes"
          placeholder-text="Type your message here...">
        </df-messenger-chat-bubble>
      </df-messenger>
    </body>
  </html>
`;

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.value);
    i18n.changeLanguage(language.value);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-2">
      <View>
        <Image
          source={require("../assets/images/ONDC-banner.png")}
          style={{ width: 300, height: 250 }}
        />
      </View>
      <View className="m-2 flex-row items-center justify-center">
        <Image
          source={require("../assets/images/language-icon.png")}
          style={{ width: 55, height: 55 }}
        />
        <Text className="text-2xl font-bold m-4">Select your language</Text>
      </View>

      <View className="h-[300px]">
        <ScrollView className="w-[250px] px-2" persistentScrollbar={true}>
          {languages.map((language) => (
            <Button
              variant="outline"
              key={language.value}
              onPress={() => handleLanguageSelect(language)}
              className={`p-2 my-1 border bg-white ${
                selectedLanguage === language.value
                  ? "border-blue-500 bg-gray-100"
                  : "border-gray-300"
              }`}
            >
              <Text>{language.label}</Text>
            </Button>
          ))}
        </ScrollView>
      </View>

      {selectedLanguage && (
        <Button
          size="lg"
          variant="destructive"
          onPress={() => router.push("/(docVerification)")}
          className="mt-4 w-[250px] bg-blue-500 active:bg-blue-400"
        >
          <Text className="text-white font-semibold text-xl">Next</Text>
        </Button>
      )}
      
      <View style={{ position: 'absolute', bottom: 0, right: 0, width: 300, height: 400 }}>
        <WebView
          source={{ html: dfMessengerHtml }}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </View>
  );
};

export default LanguageSelection;
