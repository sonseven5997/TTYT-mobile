import React from "react";
import { Text, View, TextInput } from "react-native";

export default InputForm = (props) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'SegoeUI-Regular',
          fontSize: 17,
          color: '#666666',
          marginBottom: 8,
        }}>
        {props.title}
      </Text>
      <TextInput
        onChangeText={props.onChange}
        value={props.value}
        secureTextEntry={props.textSecure}
        style={{
          fontFamily: 'SegoeUI-Regular',
          fontSize: 17,
          color: '#000000',
          borderBottomColor: '#93c22f',
          borderStyle: 'solid',
          borderBottomWidth: 1,
          marginBottom: 8,
        }}
      />
    </View>
  );
};
