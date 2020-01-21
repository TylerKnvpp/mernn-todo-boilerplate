import React, { useState, useEffect } from "react";
import {
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen() {
  const [inputState, setInput] = useState("");
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(res => console.log(res.express));
  }, []);

  async function handleSubmit() {
    const response = await fetch("http://localhost:3000/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputState)
    });
    const body = await response.text();
    setResponse({ responseToPost: body });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text
          style={{
            fontWeight: "900",
            fontSize: 24,
            marginTop: 200,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          Express Server Form
        </Text>
        <View
          style={{
            backgroundColor: "#F2EFEE",
            height: 75,
            marginTop: 20,
            marginBottom: "auto"
          }}
        >
          <TextInput
            style={{ color: "black", fontSize: 50 }}
            value={inputState}
            onChangeText={text => setInput(text)}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              borderRadius: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              backgroundColor: "#25aae1",
              padding: 5,
              height: 40,
              width: 80
            }}
          >
            <Text style={{ color: "white", fontWeight: "800", padding: 5 }}>
              Submit
            </Text>
          </TouchableOpacity>
          {response ? (
            <Text style={{ marginTop: 10, marginLeft: 20 }}>
              Request: {response.responseToPost}
            </Text>
          ) : (
            <Text style={{ marginTop: 10, marginLeft: 20 }}>Request:</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
