/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Button,
} from 'react-native';


const {width,height} = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.keyboardDidShowListener = null;
        this.keyboardWillHideListener = null;
        this.state = {
            // KeyboardShown: false,
            keyboardTopHeight:0,
            keyboardTopMarginTop:0,
        };
    }

    componentWillMount() {
        //监听键盘弹出事件
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this.keyboardDidShowHandler.bind(this));
        //监听键盘隐藏事件
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',
            this.keyboardWillHideHandler.bind(this));
    }

    componentWillUnmount() {
        //卸载键盘弹出事件监听
        if (this.keyboardDidShowListener != null) {
            this.keyboardDidShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardWillHideListener != null) {
            this.keyboardWillHideListener.remove();
        }
    }

    //键盘弹出事件响应
    keyboardDidShowHandler(event) {
        // this.setState({KeyboardShown: true});
        console.log(event.endCoordinates.height);

        this.setState({
            keyboardTopHeight:30,
            keyboardTopMarginTop:height - event.endCoordinates.height - 30,
        })
    }

    //键盘隐藏事件响应
    keyboardWillHideHandler(event) {
        // this.setState({KeyboardShown: false});

        this.setState({
            keyboardTopHeight:0,
            keyboardTopMarginTop:0,
        })
    }

    //强制隐藏键盘
    dissmissKeyboard() {
        Keyboard.dismiss();
        console.log("输入框当前焦点状态：" + this.refs.bottomInput.isFocused());

        this.setState({
            keyboardTopHeight:0,
            keyboardTopMarginTop:0,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<ScrollView style={{backgroundColor:'cyan'}}>*/}
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <TextInput
                    style={styles.textInputStyle}
                    ref="bottomInput"
                    placeholder='请输入'
                />
                {/*</ScrollView>*/}

                <View style={{
                    backgroundColor:'#eeeeee',
                    width:width,
                    height:this.state.keyboardTopHeight,
                    top:this.state.keyboardTopMarginTop,
                    position: 'absolute',
                    alignItems: 'flex-end'
                }}>
                    <Button
                        title={'完成'}
                        onPress={this.dissmissKeyboard.bind(this)}
                    />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textInputStyle: {
        height: 35,
        width:100,
        fontSize: 18,
        backgroundColor:'green',
    },
    buttonStyle: {
        fontSize: 20,
        color: 'white',
        width: 100,
        textAlign: 'center',
        backgroundColor: '#4CA300'
    },
});
