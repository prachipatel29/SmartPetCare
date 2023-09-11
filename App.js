import React, {useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import Navigator from './src/navigators/navigator';

export default function App() {
  const [user, setUser] = useState({});

  return (
    <NativeBaseProvider>
      <Navigator setUser={setUser} />
    </NativeBaseProvider>
  );
}
