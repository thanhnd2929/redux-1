import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import HomeScreens from './src/screens/HomeScreens'
import store from './src/redux/store/store'

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreens />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})