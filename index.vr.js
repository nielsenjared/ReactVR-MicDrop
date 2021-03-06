import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
  AmbientLight,
  PointLight,
  Sound,
  VrButton
} from 'react-vr';

import {
  Easing
} from 'react-native';

const AnimatedModel = Animated.createAnimatedComponent(Model);

export default class ReactVR_MicDrop extends React.Component {
  state = {
    rotation: new Animated.Value(0)
  }

  componentDidMount() {
    this.rotate();
  }

  rotate = () => {
    this.state.rotation.setValue(0);
    Animated.timing(
      this.state.rotation,
      {
        toValue: 360,
        duration: 10000,
        easing: Easing.linear,
      }
    ).start(this.rotate);
  }

  render() {
    return (
      <View>
        <Pano source={asset('bg.jpg')}/>
        <AmbientLight intensity={0.5} />
        <PointLight
          style={{
            color: 'white',
            transform: [
              {translate: [0, 0, 0]}
            ]
          }}
        />
        <Text
          style={{
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [
              {translate: [0, 0, 4]},
              {rotateY: 180},
            ],
          }}>
          Grab the mic!
        </Text>
        <Model
          lit
          source={{
            obj: asset('speaker.obj'),
            mtl: asset('speaker.mtl')
          }}
          style={{
            color: "#666",
            transform: [
              {translate: [4, 0, 0]},
              {scale: 0.25},
              {rotateZ: 180},
              {rotateX: 180}
            ]
          }}
        >
          <Sound
            source={{ wav: asset('drums.wav') }}
            loop={true}
          />
        </Model>
        <Model
          lit
          source={{
            obj: asset('speaker.obj'),
            mtl: asset('speaker.mtl')
          }}
          style={{
            color: "#666",
            transform: [
              {translate: [-4, 0, 0]},
              {scale: 0.25}
            ]
          }}
        >
          <Sound
            source={{ wav: asset('choir.wav') }}
            loop={true}
          />
        </Model>
        <VrButton
          onClickSound={{ wav: asset('mic.wav') }}
          >
        <AnimatedModel
          lit
          source={{
            obj: asset('mic.obj'),
            mtl: asset('mic.mtl')
          }}
          style={{
            color: "#666",
            transform: [
              {translate: [0, 0, -4]},
              {scale: 0.5},
              {rotateX: this.state.rotation},
              {rotateY: this.state.rotation},
              {rotateZ: this.state.rotation}
            ]
          }}
        />
      </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('ReactVR_MicDrop', () => ReactVR_MicDrop);
