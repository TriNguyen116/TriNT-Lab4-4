import React, {Component} from "react";
import {View, Text, StyleSheet} from 'react-native';
import { Card } from 'react-native-elements';
import { color } from "react-native-elements/dist/helpers";
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
  render() {
    return (
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <Card style={styles.card}>
          <View style={styles.lineTitle}>
            <Text style={styles.title}>Contact Information</Text>
          </View>
          <View style={styles.flexText}>
            <Text style={styles.text}>121, Clear Water Bay Road</Text>
            <Text style={styles.text}>Clear Water Bay, Kowloon</Text>
            <Text style={styles.text}>HONG KONG</Text>
            <Text style={styles.text}>Tel: +852 1234 5678</Text>
            <Text style={styles.text}>Fax: +852 8765 4321</Text>
            <Text style={styles.text}>Email:confusion@food.net</Text>
          </View>
      </Card>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  lineTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },

  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 15,
  },

flexText: {
  display: 'flex',
  gap: 15,
},

text: {
  color: 'black',
}
})
export default Contact;