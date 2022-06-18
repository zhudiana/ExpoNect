import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../Shared_screens/FormContainer";
import Input from "../Shared_screens/Input";
import Error from "../Shared_screens/Error";

//context API
import AuthGlobal from "../../../Context/store/AuthGlobal";
import { loginUser } from "../../../Context/actions/Auth.actions";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("MainTabScreen");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("please fill in your credintials");
    } else {
      loginUser(user, context.dispatch);
      console.log(user);
    }
  };

  return (
    <FormContainer>
      <Input
        placeholder={"enter email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder={"enter password"}
        name={"password"}
        id={"password"}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View>
        {error ? <Error message={error} /> : null}
        <Button title="Login" onPress={() => handleSubmit()} />
      </View>
    </FormContainer>
  );
};

export default Login;
