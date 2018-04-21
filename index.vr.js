import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Sound
} from 'react-vr';

export default class ReactVR_MicDrop extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('bg.jpg')}/>
        {/* <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello
        </Text> */}
        <Model
          source={{
            obj: asset('untitled.obj'),
            mtl: asset('untitled.mtl')
          }}
          style={{
            color: "#666",
            transform: [
              {translate: [0, 0, -4]},
              {scale: 0.25}
            ]
          }}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('ReactVR_MicDrop', () => ReactVR_MicDrop);
