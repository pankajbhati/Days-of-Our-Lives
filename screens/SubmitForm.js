import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';

function SubmitForm() {
  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.container}>
            <Text style={styles.heading}>Participation Form</Text>
            <TextInput placeholder="Name" style={styles.input} />
            <TextInput placeholder="Age" style={styles.input} />
            <TextInput
              placeholder="Content Link"
              multiline={true}
              style={styles.input}
            />
            <TextInput
              placeholder="Paste your sample content here"
              multiline={true}
              numberOfLines={12}
              style={{
                width: '100%',
                borderColor: '#f7d41f',
                borderWidth: 2,
                alignSelf: 'center',
                paddingLeft: 10,
                borderRadius: 30,
                marginBottom: 20,
              }}
            />
            <Button mode="contained" style={styles.button} color="#f7d41f">
              Submit
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 60,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    width: '100%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#F7D41F',
  },
  button: {
    width: '45%',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 30,
    padding: 10,
  },
});

export default SubmitForm;
