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

// import { View, Text, Button, TextInput, StyleSheet } from "react-native";
// import io from "socket.io-client";
// import React, { Component } from "react";

// export default class ChattingScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chatMessage: "",
//     };
//   }

//   componentDidMount() {
//     this.socket = io("http://172.20.10.2:8000");
//   }

//   submitChatMessage() {
//     this.socket.emit("chat message", this.state.chatMessage);
//     this.setState({ chatMessage: "" });
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Chatting Screen </Text>
//         <TextInput
//           style={{ height: 40, borderWidth: 2, width: 400 }}
//           autoCorrect={false}
//           value={this.state.chatMessage}
//           onSubmitEditing={() => this.submitChatMessage()}
//           onChangeText={(chatMessage) => {
//             this.setState({ chatMessage });
//           }}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
