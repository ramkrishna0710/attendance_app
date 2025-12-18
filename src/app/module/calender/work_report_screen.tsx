import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WorkReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text>WorkReportScreen</Text>
    </View>
  )
}

export default WorkReportScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})