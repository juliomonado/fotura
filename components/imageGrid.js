import { View, StyleSheet } from 'react-native'
import React from 'react'
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from './imageCard';
import { getColumnCount, wp } from '../helpers/common';

const ImageGrid = ({images, router}) => {

  const columns = getColumnCount();
  const columnWidth = wp(100) / columns - wp(2) * (columns -1) / columns;

  return (
    <View style={styles.container}>
        <MasonryFlashList
            data={images}
            numColumns={columns}
            initialNumToRender = {1000}
            contentContainerStyle={styles.listContainerStyle}
            renderItem={({ item, index }) => (
                <ImageCard router={router} item={item} columnWidth={columnWidth} index={index}/>
            )}
            estimatedItemSize={columnWidth}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
    },
    listContainerStyle: {
        paddingHorizontal: wp(2),
    }
})

export default ImageGrid