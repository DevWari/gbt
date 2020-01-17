import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from "react-native";

export default class ImagePlaceholder extends Component {
  static defaultProps = {
    duration: 750,
    showActivityIndicator: true,
    resizeMode: "cover",
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fadeAnim: new Animated.Value(1),
      loadFailed:false
    };
  }

  render() {
    let {loadFailed} = this.state
    return (
      <TouchableOpacity disabled={this.props.onPress==null} onPress={()=>this.props.onPress()} 
        style={[this.props.style, {backgroundColor:'#ccc', overflow:'hidden'}]}>
        <Image
          onLoadEnd={this._onProgress.bind(this)}
          style={[{flex:1, resizeMode:'cover'}, this.props.style, {borderWidth:0, marginTop:0}]}
          source={this.props.source}
          onError = {()=>{this.setState({loadFailed:true})}}
          onLoad={()=>this.setState({loadFailed:false})}
        />
        {this._renderPlaceholder.bind(this)()}
      </TouchableOpacity>
    );
  }

  _onProgress(event) {
    // const progress = event.nativeEvent.loaded / event.nativeEvent.total;
    this.setState({ isLoading: false });
  }

  _renderPlaceholder() {
    return (
      <Animated.View style={this._getPlaceholderStyles()}>
        <Image
          style={[{width:'100%', height:'100%', resizeMode:'cover', position:'absolute', left:0, top:0}, this.props.style, {borderWidth:0, marginTop:0}]}
          source={this.props.placeholder}
        />
        {this._renderActivityIndicator()}
      </Animated.View>
    );
  }

  _getPlaceholderStyles() {
    let container = [{width:'100%', height:'100%', left:0, top:0, position:'absolute'}];
    if (!this.state.isLoading && !this.state.loadFailed) {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: this.props.duration
      }).start();
      container.push({ opacity: this.state.fadeAnim });
    }
    return container;
  }

  _renderActivityIndicator() {
    if (this.props.showActivityIndicator) {
        return (
          <ActivityIndicator
            style={{flex:1}}
            animating={this.state.isLoading}
          />
        );
    } else {
      return null;
    }
  }
}