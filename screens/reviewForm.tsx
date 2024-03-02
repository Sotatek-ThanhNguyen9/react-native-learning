import React from 'react';
import {Button, KeyboardAvoidingView, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {globalStyles} from '../styles/global';

export default function ReviewForm({addReview}: any) {
  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView>
        <Formik
          initialValues={{title: '', body: '', rating: ''}}
          onSubmit={(values, actions) => {
            actions.resetForm();
            addReview(values);
          }}>
          {props => (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Review title"
                onChangeText={props.handleChange('title')}
                value={props.values.title}
              />

              <TextInput
                style={globalStyles.input}
                multiline
                placeholder="Review details"
                onChangeText={props.handleChange('body')}
                value={props.values.body}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Rating (1 - 5)"
                onChangeText={props.handleChange('rating')}
                value={props.values.rating}
                keyboardType="numeric"
              />

              <Button
                color="maroon"
                title="Submit"
                onPress={() => props.handleSubmit()}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
}
