## Custom React Player


*A simple and lightweight video player component that helps you customize controls for your videos.*

### 📸 Screenshots and Videos
![Screenshot 2021-07-16 at 6 26 56](https://user-images.githubusercontent.com/36559444/125951422-b7fa4fc8-cfea-4559-8091-26b6568e9820.png)
<img src="https://user-images.githubusercontent.com/36559444/125988393-f425c256-371e-46a9-a162-6cfddd297918.gif" width="970" height="600"  />

### 📦 Install

**Yarn**

```json
yarn add @folly-systems/custom-react-player
```

**npm**

```json
npm i @folly-systems/custom-react-player
```

### 🔨 Usage

**ES5**

```jsx
var CustomizableVideoPlayer= require('@folly-systems/custom-react-player');

function MyComponent(){
    var videoLink = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    
    return(
        <div>
	    <CustomizableVideoPlayer url={videoLink} />
	</div>
    )
}

module.exports = MyComponent;
```

**ES6**

```jsx
import CustomizableVideoPlayer from '@folly-systems/custom-react-player'

export const MyComponent=()=>{
    const videoLink = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    
    return(
        <div>
	    <CustomizableVideoPlayer url={videoLink} />
	</div>
    )
}

```

### 🎬 Demo Page
https://folly-systems.github.io/custom-react-player-example-app/


### 🎨 Props

Prop | Description | Default |  Required
---- | ----------- | ------- | -------
url | The url of the video |   | True 
height | Height of the video player in px | 400 | False 
width | Width of the video player in px | 500 | False
playing | The video state can be changed using this object <br /><br/>&nbsp; ◦ &nbsp; _status: Setting this property true plays the video and false pauses the video_ <br/>&nbsp; ◦ &nbsp; _time: Current playing time of the video can be changed using this property_ <br/>&nbsp; ◦ &nbsp; _speed: Playback speed of the video can be changed using this property(from 1-10)._ | false | False 
rounded | Set true for rounded edges for the video player | false | False
playerType | Set "small" for smaller video player and "big" for larger video player <br/>&nbsp; &nbsp;(It changes the size of video control icons) | small | False 
getVideoProgressDetails | The function will be called initially when the component loads and it will receive an object which has methods to get the video details {getPlaybackSpeed, getCurrentTime, getPlayingStatus} <br /><br/>&nbsp; ◦ &nbsp; _getPlaybackSpeed: This method returns playback speed of the video_ <br/>&nbsp; ◦ &nbsp; _getCurrentTime: This method returns current playing time of the video_<br/>&nbsp; ◦ &nbsp; _getPlayingStatus: This method returns a boolean value depending on the videos playing status_ | | False
controls | Customize any of the video controls by using these option: <br/><br/> &nbsp;**fullscreen** _{show:true/false , icon: Custom icon}_  <br/>&nbsp; ◦ show(false/true): false will hide the fullscreen icon. By default the icon is visible. <br/>&nbsp; ◦ icon: Add your custom fullscreen icon using this option. <br/><br/> &nbsp;**playPause** _{show:true/false , playIcon: Custom play con, pauseIcon: Custom pause icon}_  <br/>&nbsp; ◦ show(false/true): false will hide the play and pause icon. By default the icon is visible. <br/>&nbsp; ◦ playIcon: Add your custom play icon using this option. <br/>&nbsp; ◦ pauseIcon: Add your custom pause icon using this option. <br/><br/> &nbsp;**playbackSpeed** _{show:true/false , color: Custom color}_  <br/>&nbsp; ◦ show(false/true): false will hide the playback speed icon. By default the icon is visible. <br/>&nbsp; ◦ color: Change color of the playback speed text. <br/><br/> &nbsp;**volume** _{show:true/false , icon: Custom icon}_  <br/>&nbsp; ◦ show(false/true): false will hide the volume icon. By default the icon is visible. <br/>&nbsp; ◦ icon: Add your custom volume icon using this option. <br/><br/> &nbsp;**time** _{show:true/false}_  <br/>&nbsp; ◦ show(false/true): false will hide the time. By default the time is visible. <br/>&nbsp; ◦ color: Change color of the time text. | undefined | False
handleFullscreen | This function will be called when user clicks on fullscreen icon {getPlaybackSpeed, getCurrentTime, getPlayingStatus} <br /><br/>&nbsp; ◦ &nbsp; _getPlaybackSpeed: A function that returns the current playback speed_  <br/>&nbsp; ◦ &nbsp; _getCurrentTime: A function that returns the current video time._  <br/>&nbsp; ◦ &nbsp; _getPlayingStatus: A function that returns true if video is playing or else false_ | | False
onVideoProgress | This function will be called whenever the video progress event is triggered. This function will get object that has details about the video status{isPlaying, currentTime, speed, totalTime} <br /><br/>&nbsp; ◦ &nbsp; _speed: The current playback speed_  <br/>&nbsp; ◦ &nbsp; _currentTime: The current video time._  <br/>&nbsp; ◦ &nbsp; _isPlaying: True if video is playing or else false_  <br/>&nbsp; ◦ &nbsp; _totalTime: Total video duration_| | False


### 🖥 Environment Support

- Chrome
- Firefox
- Safari
- Edge

### ✨ Features

- 🦋 Lightweight. It has no additional dependencies other than React.
- 🔨 Provides lots of customization for your videos.
- 🎨 Makes use of CSS modules.
- 🛡 Written in TypeScript.


### 🔐 License

MIT. Copyright (c) 2021 folly-systems.
