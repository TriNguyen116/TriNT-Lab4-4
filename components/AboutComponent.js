import React, {Component} from "react";
import {FlatList, View, Text, StyleSheet} from 'react-native';
import { Card } from 'react-native-elements';
import { color } from "react-native-elements/dist/helpers";
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
//import { LEADERS } from '../shared/leaders';
import { baseUrl } from '../shared/baseUrl';
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders
  }
};
class RenderHistory extends Component {
  render() {
    return(
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
    )
  }
}
class RenderLeadership extends Component {
  render() {
    const { leaders } = this.props; 

    return (
      <Card>
        <View style={styles.lineTitle}>
          <Text style={styles.title}>Corporate Leadership</Text>
        </View>
        <FlatList
          data={leaders} 
          renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  }
  renderLeaderItem(item, index) {
    return (
        <ListItem key={index}>
            <Avatar rounded source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title style={styles.nameTitle}>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}

class About extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      leaders: LEADERS
    };*/
  }
  render() {
    return (
      <ScrollView>
        <RenderHistory></RenderHistory>
        <RenderLeadership leaders={this.props.leaders.leaders}></RenderLeadership>
      </ScrollView>
    )

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
export default connect(mapStateToProps)(About);