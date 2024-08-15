import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from './store/store';
import {useFonts} from 'expo-font'

export default function RootLayout() {
  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-med': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf')
  })
  
  return (
    <Provider store={store}>
      <Stack >
      <Stack.Screen
      name="index"
      options={{
        headerTitle: 'SHOPPING',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#ADD8E6' }, 
        headerTitleStyle:{fontFamily:'outfit-bold',fontSize:35}
      
      }}
    />     
      </Stack>
    </Provider>
    
  );
}
