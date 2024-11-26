import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { wp } from '../helpers/common'
import { theme } from '../constants/theme'

const ImageCard = ({item, index, columns, router}) => {

  const isLastInRow = ()=>{
    return (index+1) % columns === 0;
  }

  return (
    <Pressable onPress={()=> router.push({pathname: 'home/image', params: {...item}})} style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
      <Image
        style={styles.image}
        source={item?.webformatURL}
        transition={100}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    imageWrapper: {
      backgroundColor: theme.colors.grayBG_dark,
      borderRadius: theme.radius.xl,
      borderCurve: 'continuous',
      overflow: 'hidden',
      marginBottom: wp(2),
    },
    spacing: {
      marginRight: wp(2),
    },
})

export default ImageCard