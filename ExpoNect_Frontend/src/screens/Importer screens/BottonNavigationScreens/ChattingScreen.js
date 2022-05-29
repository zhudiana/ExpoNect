import { View, Text, Button, StyleSheet } from "react-native";

const ChattingScreen = (navigation) => {
  return (
    <View style={styles.container}>
      <Text>Chatting Screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChattingScreen;
