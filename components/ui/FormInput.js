
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function FormInput ({ value , onChangeText , placeholder , Icon , keyboardType="default"}) {

    const [focused, setFocused] = React.useState(false);

   return (
     <View style={[styles.inputContainer, focused ? styles.focused : styles.blured]}>
             <Icon size={20} color="#99a1af" style={styles.inputIcon} />
              <TextInput
                placeholder={placeholder}
                placeholderTextColor="#99a1af"
                secureTextEntry = {placeholder.toLowerCase().includes('••••••••')}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                onFocus={()=>{setFocused(true)}}
                onBlur={()=>{setFocused(false)}}
                keyboardType={keyboardType}
              />
            </View>
   )
};

const styles =  StyleSheet.create({
inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1, 
  },
  focused : {
     borderColor: '#2FAE78',
  },
  blured : {
     borderColor: '#ebe6e7',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    outlineWidth: 0,
  },
})