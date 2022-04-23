import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../components/Context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TouchableRipple } from "react-native-paper";

const MenuScreen = () => {
  const { colors } = useTheme();
  const { signOut, toggleTheme } = React.useContext(AuthContext);

  const navigationTheme = useTheme();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
      >
        <View style={styles.menuitem}>
          {/* <MaterialIcons
            name="logout"
            style={[styles.logoutIcon, { color: colors.text }]}
          /> */}
          <Text style={[styles.logoutText, { color: colors.text }]}>
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableRipple
        onPress={() => {
          toggleTheme();
        }}
      >
        <View style={styles.preference}>
          <Text style={[styles.darkThemeStyle, { color: colors.text }]}>
            Dark Theme
          </Text>
          <View pointerEvents="none">
            <Switch value={navigationTheme.dark} />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  menuitem: {
    marginTop: 100,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 56,
  },
  logoutIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  // logoutText: {
  //   fontSize: 20,
  // },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
