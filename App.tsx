/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  useColorScheme,
  View
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import {
  AppearanceMode,
  DocumentBuilder,
  DocumentType,
  EnrollmentBuilder,
  ReadingConfigurationBuilder,
  UqudoIdSDK
} from "uqudosdk-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "react-native-screens/native";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const uqudoInstance = new UqudoIdSDK();
uqudoInstance.init();

function HomeScreen({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          onPress={async () => {
            try {
              const token = "TOKEN";
              let documentBuilder = new DocumentBuilder().setDocumentType(
                "UAE_ID"
              );

              let enrollmentConfiguration = new EnrollmentBuilder()
                .setToken(token)
                .enableFacialRecognition()
                .add(documentBuilder.build())
                .setAppearanceMode(AppearanceMode.SYSTEM)
                .build();

              await uqudoInstance.enroll(enrollmentConfiguration);
            } catch (e) {
              console.log(e);
            }
          }}>
          <Text>Hello</Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black
            }
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark
            }
          ]}>
          {children}
        </Text>
      </View>
    </SafeAreaView>
  );
}


const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400"
  },
  highlight: {
    fontWeight: "700"
  }
});

export default App;
