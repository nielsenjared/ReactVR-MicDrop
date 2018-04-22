# ReactVR + Sound

Simple React VR app demonstrating model import and animation, sound, and button clicks.

## Getting Started with ReactVR

Install react-vr-cli:

`npm install -g react-vr-cli`

Create a new ReactVR app: `react-vr init ReactVR-MicDrop`

Uppercase is the naming convention as react-vr-cli will generate a class component using the name you provide.

Change into the newly created directory and start the app:
```
cd ReactVR-MicDrop
npm start
```

Open http://localhost:8081/vr/

Well, hello there...

## Equirectangular Images

ReactVR uses equirectangular images to create 3D scenes. [Flickr](https://www.flickr.com/search/?text=equirectangular) is a great place to search for them. Find one, download it, and move it to the static_assets directory of your VR app.

On line 14 of index.vr.js, replace `chess-world.jpg` with your equirectangular image.

Save and refresh your app.

## Importing Models

In a nutshell, a digital 3D model is a file outlining coordinates (vertices) in space. You can create and download models using [Google Blocks](https://poly.google.com/blocks). [Blendswap](https://www.blendswap.com/) is an excellent repository of models created using Blender.

Find and download a model and move the .obj and .mtl files to static_assets.

Again, if you want to build the demo, clone or download this repo and use the included models.

In index.vr.js, add `Model` to your react-vr import statement.
```
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
} from 'react-vr';
```
Under your Pano component, add a new Model component:
```
<Model
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
/>
```

## Adding Light

From react-vr, import AmbientLight and PointLight:
```
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
  PointLight
} from 'react-vr';
```
Under the Pano component, add AmbientLight and PointLight components:
```
<AmbientLight intensity={0.5} />
<PointLight
  style={{
    color: 'white',
    transform: [
      {translate: [0, 0, 0]}
    ]
  }}
/>
```
To the Model component add a lit property:
```
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
/>
```

Reload your scene to verify that your model imported and is lit.

## Adding Sound

To add sound to a VR scene we need to import the Sound component from react-vr.
```
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
  PointLight,
  Sound
} from 'react-vr';
```

Because we are working with 3D sound, we need to put Sound components inside parent components so that the sound has a point of origin, like so:
```
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
    source={{ wav: asset('drums.wav') }}
    loop={true}
  />
</Model>
```

The drums loop should now be emanating from the speaker. The channel balance will change as you move your point of view in the scene.


## Animating Models

Import from react-vr the Animated component and from react-native the Easing component:
```
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
  PointLight,
  Sound,
  Animated
} from 'react-vr';

import {
  Easing
} from 'react-native';
```

Declare a component to animate using the Animated component:
`const AnimatedModel = Animated.createAnimatedComponent(Model);`

In order to animate a model, we need to use state. At the top of the ReactVR_Blender component, add:
```
state = {
  rotation: new Animated.Value(0)
}

componentDidMount() {
  this.rotate();
}
```
Create a rotate method:
```
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
```

Create a new AnimatedModel component:
```
<AnimatedModel
  lit
  source={{
    obj: asset('mic.obj')
  }}
  style={{
    color: "#666",
    transform: [
      {translate: [0, 0, -4]},
      {rotateX: this.state.rotation},
      {rotateY: this.state.rotation},
      {rotateZ: this.state.rotation}
    ]
  }}
/>
```

## Buttons

There's one more component we need to import, VrButton.
```
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
```

We wrap VrButton around any component we want to make 'clickable'. Because triggering sound effects on interaction is very common in VR, we have a built in method `onClickSound` that we can pass to our VrButton, like so:
```
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
```

Mic drop...

## Sources and Resources
* [Image by NikonFDSLR](https://www.flickr.com/photos/nikonfdslr/27500115614/in/photolist-9DBTYK-9kp9MK-9jHdwV-6gC7zK-HU6hho-MX8M3q)
* [Samples by CelloCubano](https://www.looperman.com/users/loops/219480)
* [ReactVR Sound](https://facebook.github.io/react-vr/docs/sound.html)
* [ReactVR VrButton](https://facebook.github.io/react-vr/docs/vrbutton.html)
