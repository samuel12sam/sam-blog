import { ActivityIndicator, ImageBackground, ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface loadingImageProps {
    style?:StyleProp<ImageStyle>;
    resizeMode?: ImageResizeMode;
    source: ImageSourcePropType;
    activityIndicatorStyle?: StyleProp<ViewStyle>;
    activityIndicatorSize?: number | 'small' | 'large' | undefined;
    activityIndicatorColor?:string;
}
export default function LoadingImage({
    style,
    resizeMode='cover',
    source,
    activityIndicatorStyle,
    activityIndicatorSize,
    activityIndicatorColor,

}:loadingImageProps) {
    const [imageLoaded, setImageLoaded] = React.useState<boolean>(false)
  // console.log(style)
  return (
    <ImageBackground onLoadEnd={()=>setImageLoaded(true)} style={[{borderRadius:10,height:200, width:350, justifyContent:'center', backgroundColor:'#82828288', overflow:'hidden'}, style]} resizeMode={resizeMode} source={source}>
      {!imageLoaded && <ActivityIndicator style={activityIndicatorStyle} size={activityIndicatorSize} color={activityIndicatorColor}/>}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})