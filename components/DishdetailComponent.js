import React, { Component } from 'react';
import { View, Text, FlatList, Modal, Button, StyleSheet,TouchableOpacity, Alert, PanResponder } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import { baseUrl } from '../shared/baseUrl';
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
    comment: state.comment,
  }
};
import { postFavorite } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

class ModalContent extends Component {
  render(){
    return (
      <View style={{flex:1, alignItems:'center',marginTop:80}}>
        <Rating type='star' ratingCount={5} imageSize={40} showRating onFinishRating={this.handleRatingChange} startingValue={this.props.rating}/>

        <Input placeholder='Author' 
        leftIcon={ <Icon name='person' color='#7cc' size={35} />} 
        selectedValue={this.props.author} onValueChange={(value) => this.props.setState({ author: value })}/>
        
        <Input placeholder='Comment'
        leftIcon={ <Icon name='chat' color='#7cc' size={35} />} 
        selectedValue={this.props.comment} onValueChange={(value) => this.props.setState({ comment: value })}/>

        <TouchableOpacity style={styles.submitButton} underlayColor='#fff' 
          onPress={()=>this.props.handleComment()}>
          <Text style={styles.buttonText}>SUBMIT</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.closeButton} underlayColor='#fff' onPress={() => this.props.onPressClose()}>
          <Text style={styles.buttonText}>CLOSE</Text>
         </TouchableOpacity>
      </View>
    )
  }
  
}
class RenderDish extends Component {
  render() {
    // gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) return 1; // right to left
      return 0;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState) === 1) {
          Alert.alert(
            'Add Favorite',
            'Are you sure you wish to add ' + dish.name + ' to favorite?',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress: () => { this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite() } },
            ]
          );
        }
        return true;
      }
    });
    // render
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card {...panResponder.panHandlers}>
          <Image source={{ uri: baseUrl + dish.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{flexDirection:'row', justifyContent: 'center' }}>
            <Icon raised reverse type='font-awesome' color='#f50'
              name={this.props.favorite ? 'heart' : 'heart-o'}
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            <Icon raised reverse type='font-awesome' color='#7cc' name={'pencil'}  onPress={()=>this.props.onPressPencil()} />    
          </View>
        </Card>
      );
    }
    return (<View />);
  }
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()} />   
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating type='star' ratingCount={5} imageSize={12} startingValue={item.rating} style={{flexDirection:'row', paddingTop:5, paddingBottom:5}}/>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  };
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // favorites: []
      showModal: false,
      rating: 5,
      author: '',
      comments: '',
    };
  }
  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    const dish = this.props.dishes.dishes[dishId];
    const comments = this.props.comments.comments.filter((cmt) => cmt.dishId === dishId);
    const favorite = this.props.favorites.some((el) => el === dishId);
    const nwcomment = this.props.comment.some((el) => el === dishId);
    
    // gesture
    const detectComment = ({ moveX, moveY, dx, dy }) => {
      if (dx > 200) return 1; //left to right
      return 0;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (detectComment(gestureState) === 1) {
            this.setState({ showModal: true });
        }
        return true;
      }
    });

    return (
      <View {...panResponder.panHandlers}>
        <RenderDish dish={dish} favorite={favorite} 
          onPressFavorite={() => this.markFavorite(dishId)} 
          onPressPencil={() => this.onPressPencil()}/>
        <RenderComments comments={comments} />
        <Modal  animationType={'slide'}  visible={this.state.showModal}>
          <ModalContent
            nwcomment={nwcomment} 
           onPressClose={() => this.setState({ showModal: false })}
           handleComment={()=>this.handleComment()} 
           rating={this.state.rating}
           dishId={dishId}
           author={this.state.author}
           comment={this.state.comment}
           handleRatingChange={()=>this.handleRatingChange()}
           />
        </Modal>
      </View>
      
    );
  }
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }  
  onPressPencil() {
    this.setState({ showModal: true });
  }
  handleComment() {
    const { dishId } = this.props.route.params;
    const { rating, author, comment } = this.state;
  
    // if (!rating || !author || !comment) {
    //   Alert.alert('Error', 'Please fill in all fields.');
    //   return;
    // }
  
    // this.props.postComment(dishId, rating, author, comment);
  
    Alert.alert(
      'Submit Success',
      '',
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState({ showModal: false });
          },
        },
      ],
    );
  }
  
}

const styles = StyleSheet.create(
  {
    submitButton:{
      marginRight:40,
      marginLeft:40,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#7cc',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      width: 400,
    },

    closeButton:{
      marginRight:40,
      marginLeft:40,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#909497',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      width: 400,
    },

    buttonText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontWeight: '600',
    }
  }
)


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);