import React from 'react'
import { StyleSheet, Text, TextInput, View, ActivityIndicator} from 'react-native'
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase'

export default class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null, data: null }

    static navigationOptions = {
        header: null
    }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({data: 'data fetched'});
                this.props.navigation.navigate('Main');
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        if (!this.state.data) {
            return (
              <ActivityIndicator
                animating={true}
                style={styles.indicator}
                size="large"
              />
            );
          }

        return (
            <View style={styles.container}>
                <Text>Login</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                {/* <Button title="Login" onPress={this.handleLogin} /> */}
                <Button
                    title="Login"
                    onPress={this.handleLogin} 
                />
                <Button
                    title="Don't have an account? Sign Up"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})