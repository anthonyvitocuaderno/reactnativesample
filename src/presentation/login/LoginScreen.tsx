
import { Button, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native'
import { useViewModels } from '../../__core/ViewModelProvider';
import LoginEvent from './LoginEvent';
import { RouterProps } from '../../__core/Route';
import { View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ navigation }: RouterProps<"Login">): React.JSX.Element {

    const loginViewModel = useViewModels().login

    const [_, setState] = useState(0)

    loginViewModel.setNavigation(useNavigation())
    loginViewModel.updateUI = setState

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loginViewModel.onEvent(LoginEvent.Focused)
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.formFields}
                mode="outlined"
                label="Email Address"
                placeholder="eve.holt@reqres.in"
                defaultValue={loginViewModel.email}
                disabled={loginViewModel.isBusy}
                inputMode='email'
                keyboardType='email-address'
                onChangeText={text => {
                    console.log('LoginScreen.onEmailChangeText', text)
                    loginViewModel.onEvent(new LoginEvent.EmailChangeText(text))
                }}
            // right={<TextInput.Affix text="/100" />}
            />
            <TextInput
                style={styles.formFields}
                mode="outlined"
                label="Password"
                placeholder="just type anything"
                defaultValue={loginViewModel.password}
                disabled={loginViewModel.isBusy}
                secureTextEntry={true}
                inputMode='text'
                keyboardType='visible-password'
                onChangeText={text => {
                    console.log('LoginScreen.onPasswordChangeText', text)
                    loginViewModel.onEvent(new LoginEvent.PasswordChangeText(text))
                }}
            // right={<TextInput.Affix text="/100" />}
            />

            {loginViewModel.error !== undefined ?
                <Text style={{ color: 'red' }}>{loginViewModel.error}</Text>
                : null
            }

            <Button
                style={styles.formFields}
                disabled={loginViewModel.isBusy}
                mode="contained"
                onPress={() => {
                    console.log('LoginScreen.onLoginPressed');
                    loginViewModel.onEvent(LoginEvent.LoginPressed)
                }
                }>
                LOG IN
            </Button>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    formFields: {
        marginVertical: 8
    }
})