import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Route } from './Route';

export default interface BaseViewModel<E> {

    onEvent(event: E): void;

    setNavigation(navigation: NativeStackNavigationProp<Route, keyof Route>): void;
    
    /** exposes react hook to udpate UI */
    updateUI(value: React.SetStateAction<number>): void;
}