import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="home/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="home/image"
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            animation: 'fade'
          }}
        />
      </Stack>
    </>
  );
};

export default Layout;