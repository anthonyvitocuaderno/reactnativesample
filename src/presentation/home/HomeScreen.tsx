
import { Button } from 'react-native-paper';
import React, { useState } from 'react'
import { RouterProps } from '../../__core/Route';
import { useViewModels } from '../../__core/ViewModelProvider';
import HomeEvent from './HomeEvent';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/MapMarker';

export default function HomeScreen({ navigation }: RouterProps<"Home">): React.JSX.Element {

  const homeViewModel = useViewModels().home

  const [state, setState] = useState(0)



  homeViewModel.setNavigation(useNavigation())
  homeViewModel.updateUI = setState

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      homeViewModel.onEvent(HomeEvent.Focused)
    });

    return unsubscribe;
  }, [navigation]);


  const markers: JSX.Element[] = [];
  let count = 0
  homeViewModel.trains.forEach((train) => {

    train.lines.forEach((mainLine) => {
      markers.push(
        <MapMarker
          key={count}
          title={mainLine.name.en}
          coordinate={{
            latitude: mainLine.lat,
            longitude: mainLine.lng
          }} />
      )
      count += 1;
      // mainLine.stations.forEach((station) => {
      //   markers.push(
      //     <MapMarker
      //       key={count}
      //       title={station.name.en}
      //       coordinate={{
      //         latitude: station.location.lat,
      //         longitude: station.location.lng
      //       }} />
      //   )
        
      //   count += 1;
      //   // station.lines.forEach((stationLine) => {
      //   //   // NOTHING TO DO HERE
      //   // })
      // })
    })
  })


  return (
    <View style={styles.container}>

      <MapView
        toolbarEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        showsScale={true}
        style={[styles.map, { bottom: homeViewModel.initMap}] }
        region={homeViewModel.region}
      >

        { markers }

      </MapView>
      {!homeViewModel.isTrainLoaded ?
        <Button

          style={styles.button}
          mode="contained"
          disabled={homeViewModel.isBusy}
          onPress={() => {
            console.log('HomeScreen.onStartPressed');
            homeViewModel.onEvent(HomeEvent.StartPressed)
          }
          }>
          START
        </Button>
        :
        <Button

          style={styles.button}
          mode="contained"
          disabled={homeViewModel.isBusy}
          onPress={() => {
            console.log('HomeScreen.onClearPressed');
            homeViewModel.onEvent(HomeEvent.ClearPressed)
          }
          }>
          CLEAR
        </Button>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    flex: 0,
    margin: 16
  },
  map: {
    flex: 1
  }
})