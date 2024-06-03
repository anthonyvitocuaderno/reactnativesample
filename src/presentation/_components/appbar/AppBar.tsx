import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';
import AppBarEvent from './AppBarEvent';
import { useViewModels } from '../../../__core/ViewModelProvider';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function AppBar(
    { navigation, route, options, back }: NativeStackHeaderProps
) {

    const appBarViewModel = useViewModels().appBar

    const [_, setState] = useState(0)

    appBarViewModel.setNavigation(useNavigation())
    appBarViewModel.updateUI = setState

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            appBarViewModel.onEvent(AppBarEvent.Focused)
        });
    
        return unsubscribe;
      }, [navigation]);

    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction onPress={() => {
                console.log("AppBar", "onBackPressed")
                appBarViewModel.onEvent(AppBarEvent.BackPressed)
            }} /> : null}
            
            <Appbar.Content title={route.name}/>
            {appBarViewModel.isLoggedIn ? 
                <Appbar.Action
                icon="logout"
                onPress={() => {
                    console.log("AppBar", "onLogoutPressed")
                    appBarViewModel.onEvent(AppBarEvent.LogoutPressed)
                }}
            />: null
            }
            
        </Appbar.Header>
    )
    
}