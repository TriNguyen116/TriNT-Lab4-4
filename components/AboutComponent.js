import React, {Component} from "react";
import {FlatList, View, Text, StyleSheet} from 'react-native';
import { Card } from 'react-native-elements';
import { color } from "react-native-elements/dist/helpers";
import { ListItem, Avatar } from 'react-native-elements';
import {LEADERS} from '../shared/leaders';
import { ScrollView } from 'react-native-virtualized-view';
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: LEADERS
    };
  }
  render() {
    return (
      <ScrollView style={styles.scrollView}>
      <Card>
          <View style={styles.lineTitle}>
            <Text style={styles.title}>Our History</Text>
          </View>
          <View style={styles.flexText}>
            <Text style={styles.text}>Started in 2010, Ristorante con Fusion quickly established itself as 
            a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that 
            can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring 
            four of the best three-star Michelin chefs in the world, you never know what will arrive on your 
            plate the next time you visit us.</Text>
            <Text style={styles.text}>The restaurant traces its humble beginnings to The Frying Pan, a successful 
            chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
          </View>
      </Card>
      <Card>
      <View style={styles.lineTitle}>
            <Text style={styles.title}>Corporate Leadership</Text>
          </View>
          <View style={styles.flexText}>
            <FlatList data={this.state.leaders}  renderItem={({ item, index }) => this.renderAboutItem(item, index)}
            keyExtractor={(item) => item.id.toString()} />
          </View>
      </Card>
      </ScrollView>
    )
  }

  renderAboutItem(item, index) {
    return (
      <ListItem key={index}>
        <Avatar rounded size={45} source={require('./images/alberto.png')} />
        <ListItem.Content>
          <ListItem.Title style={styles.nameTitle}>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  lineTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },

  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 15,
  },

flexText: {
  display: 'flex',
  gap: 15,
},

text: {
  color: 'black',
},

nameTitle: {
  color: 'black',
  fontSize: 18,
  fontWeight: '600'
},

})
export default About;
