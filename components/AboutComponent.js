import React, {Component} from "react";
import {FlatList, View, Text, StyleSheet} from 'react-native';
import { Card } from 'react-native-elements';
import { color } from "react-native-elements/dist/helpers";
import { ListItem, Avatar } from 'react-native-elements';
import {LEADERS} from '../shared/leaders';
import { ScrollView } from 'react-native-virtualized-view';
//import { LEADERS } from '../shared/leaders';
import { baseUrl } from '../shared/baseUrl';

class RenderLeadership extends Component {
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

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders
  }
};

class About extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      leaders: LEADERS
    };*/
  }
  render() {
    <Card style={styles.container}>
      <View style={styles.lineTitle}>
            <Text style={styles.title}>Corporate Leadership</Text>
          </View>
          <View style={styles.flexText}>
          <RenderLeadership leaders={this.props.leaders.leaders} />
          </View>
      </Card>
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