import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import { StatusBar } from 'expo-status-bar';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import { debounce } from 'lodash';
import { useRouter } from 'expo-router';

var page = 1;

const HomeScreen = () => {

  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const scrollRef = useRef(null);
  const [isEndReached, setIsEndReached] = useState(false);

  useEffect(() => {
    fetchImages();
  },[]);

  const fetchImages = async (params = {page: 1}, append = true) => {

    console.log('params: ', params, append);

    let res = await apiCall(params);
    if(res.success && res?.data?.hits){
        if(append)
            setImages([...images, ...res.data.hits])
        else
            setImages([...res.data.hits])
    }
}

  const handleChangeCategory = (cat) =>{
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params = {
        page,
    }
    if(cat) params.category = cat;
    fetchImages(params, false);
  }

  const handleSearch = (text) => {
    setSearch(text);
    if(text.length>2){
        //search for this text
        page = 1;
        setImages([]);
        setActiveCategory(null); //clear category when searching
        fetchImages({page, q: text}, false);
    }

    if(text==''){
        //reset results
        page = 1;
        searchInputRef?.current?.clear();
        setImages([]);
        setActiveCategory(null);  //clear category when searching
        fetchImages({page}, false);
    }
  }

  const clearSearch = () => {
    setSearch('');
    searchInputRef?.current?.clear();
  }

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if(scrollOffset >= bottomPosition - 1){
        if(!isEndReached){
            setIsEndReached(true);
            console.log('reached the bottom of scrollview');
            // fetch more images
            ++page;
            let params = {
                page,
            }
            if(activeCategory) params.category = activeCategory;
            if(search) params.q = search;
            fetchImages(params);
        }
    }else if(isEndReached){
        setIsEndReached(false);
    }
  }

  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({
        y:0,
        animated: true,
    })
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  //console.log('active category: ', activeCategory);

  return (
    <View style={[styles.container, {paddingTop}]}>
      <StatusBar style="light"/>

      {/* header */}
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
            <Text style={styles.title}>
                Fotura
            </Text>
        </Pressable>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5} // how often scroll event will fire while scrolling (in ms)
        ref={scrollRef}
        contentContainerStyle={{gap: 15}}
      >
        {/* searchBar */}
        <View style={styles.searchBar}>
            <View style={styles.searchIcon}>
                <Feather name='search' size={24} color={theme.colors.neutral(0.4)} />
            </View>
            <TextInput
                placeholder='Buscar foto de perfil...'
                placeholderTextColor= {theme.colors.neutral(0.3)}
                //value={search}
                ref={searchInputRef}
                onChangeText={handleTextDebounce}
                style={styles.searchInput}
            />
            {
                search ? (
                    <Pressable onPress={()=> handleSearch('')} style={styles.closeIcon}>
                        <Ionicons name='close' size={24} color={theme.colors.neutral(0.6)} />
                    </Pressable>
                ) : null
            }
        </View>
        {/* Categories */}
        <View style={styles.categories}>
            <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>
        </View>
        {/* images masonry grid */}
        <View>
            {
                images.length > 0 && <ImageGrid images = {images} router={router} />
            }
        </View>
        {/* loading */}
        <View style={{marginBottom: 70, marginTop: images.length > 0 ? 10 : 70}}>
            <ActivityIndicator size='large' />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
        backgroundColor: theme.colors.grayBG_dark,
    },
    header: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.9),
    },
    searchBar: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.neutral(0.1),
        backgroundColor: theme.colors.black,
        padding: 6,
        paddingLeft: 10,
        borderRadius: theme.radius.lg,
    },
    searchIcon: {
        padding: 8,
    },
    searchInput: {
        flex: 1,
        borderRadius: theme.radius.sm,
        paddingVertical: 10,
        fontSize: hp(1.8),
        color: theme.colors.neutral(0.9),
    },
    closeIcon: {
        backgroundColor: theme.colors.neutral(0.1),
        padding: 8,
        borderRadius: theme.radius.sm,
    }
})

export default HomeScreen