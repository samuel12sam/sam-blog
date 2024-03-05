import { ActivityIndicator, ImageBackground, Image, ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface loadingImageProps {
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  source: ImageSourcePropType;
  alt: string;
  activityIndicatorStyle?: StyleProp<ViewStyle>;
  activityIndicatorSize?: number | 'small' | 'large' | undefined;
  activityIndicatorColor?: string;
}
export default function LoadingImage({
  style,
  resizeMode = 'cover',
  alt,
  source,
  activityIndicatorStyle,
  activityIndicatorSize,
  activityIndicatorColor,

}: loadingImageProps) {
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false)
  // console.log(style)


  return (
    <ImageBackground alt={alt} onLoadEnd={() => setImageLoaded(true)} style={[{ borderRadius: 10, width: '100%', aspectRatio: 16 / 9, justifyContent: 'center', backgroundColor: '#82828288', overflow: 'hidden' }, style]} resizeMode={resizeMode} source={source}>
      {!imageLoaded && <ActivityIndicator style={activityIndicatorStyle} size={activityIndicatorSize} color={activityIndicatorColor} />}
    </ImageBackground>
  )

}

const styles = StyleSheet.create({})