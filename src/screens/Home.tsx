import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {init} from '../geolocation-service/main';

export default function Home() {
  const [position, setPosition] = useState('');

  useEffect(() => {
    init().then(response => {
      if (response) {
        console.log(response);
        setPosition(String(response));
      }
    });
  }, []);

  return <Text>{position}</Text>;
}
