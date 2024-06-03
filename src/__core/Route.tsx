import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type Route = {

   Login: undefined;
   Home: undefined;

   ParentScreen: undefined;
   ChildScreen: {slug: string};
};

export interface RouterProps<T extends keyof Route> {
   navigation: NativeStackNavigationProp<Route, T>
}