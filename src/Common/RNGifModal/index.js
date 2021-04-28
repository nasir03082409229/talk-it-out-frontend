import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react'
import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { InputSearch, GiphyItem } from './components'
import { useDebounce, useTrending, useSearch } from './utilities'
import { SvgXml } from "react-native-svg";
export default GiphyModal = forwardRef((props, ref) => {
  const { giphyApiKey, onSelectGif } = props

  // ref
  const bottomSheetRef = useRef(null)

  // variables
  const [searchText, setSearchText] = useState('')
  const [selfShow, setSelfShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const snapPoints = useMemo(() => [0, '90%'], [])
  const debouncedSearchText = useDebounce(searchText, 1000)

  useImperativeHandle(ref, () => ({
    show() {
      setSelfShow(true)
      bottomSheetRef.current.expand()
    },
    close() {
      setSelfShow(false)
      bottomSheetRef.current.close()
    },
  }))

  // api calls hooks
  const {
    data: trendingArray,
    fetchMore: fetchMoreTrendingGif,
    resetValues: resetValuesTrending,
  } = useTrending(giphyApiKey, selfShow)

  const {
    data: searchArray,
    fetchMore: fetchMoreSearchGif,
    resetValues: resetValuesSearch,
  } = useSearch(debouncedSearchText, giphyApiKey, selfShow)

  const handleSheetChanges = useCallback((index) => {
    if (index == 0) {
      resetValuesTrending()
      resetValuesSearch()
      setSearchText('')
    }
  }, [])

  const renderHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <InputSearch
            onChangeText={(t) => {
              setSearchText(t)
            }}
            value={searchText}
          />
        </View>
        <TouchableOpacity onPress={() => bottomSheetRef.current.close()} style={{ justifyContent: 'center', marginRight: 10 }}>
          <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
<path id="Close_-_simple-line-icons" data-name="Close - simple-line-icons" d="M10,20a9.837,9.837,0,0,1-3.9-.781A9.95,9.95,0,0,1,.781,13.9,9.845,9.845,0,0,1,0,10,9.837,9.837,0,0,1,.781,6.1,9.947,9.947,0,0,1,6.1.781,9.837,9.837,0,0,1,10,0a9.845,9.845,0,0,1,3.9.781A9.95,9.95,0,0,1,19.219,6.1,9.837,9.837,0,0,1,20,10a9.845,9.845,0,0,1-.781,3.9A9.952,9.952,0,0,1,13.9,19.219,9.845,9.845,0,0,1,10,20ZM10,1.25a8.488,8.488,0,0,0-3.408.693A8.831,8.831,0,0,0,1.943,6.592a8.728,8.728,0,0,0,0,6.817,9.067,9.067,0,0,0,1.876,2.783,8.869,8.869,0,0,0,2.773,1.885,8.728,8.728,0,0,0,6.817,0,8.884,8.884,0,0,0,2.774-1.885,9.08,9.08,0,0,0,1.875-2.783A8.474,8.474,0,0,0,18.75,10a8.474,8.474,0,0,0-.693-3.408,8.823,8.823,0,0,0-4.648-4.649A8.488,8.488,0,0,0,10,1.25Zm3.1,12.461a.6.6,0,0,1-.44-.175L10,10.879,7.344,13.535a.622.622,0,0,1-.879-.879L9.122,10,6.465,7.344a.622.622,0,0,1,.879-.879L10,9.122l2.656-2.657a.622.622,0,0,1,.879.879L10.879,10l2.656,2.656a.615.615,0,0,1-.439,1.055Z" fill="#4a4a4a"/>
</svg>`} />
        </TouchableOpacity>
      </View>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <GiphyItem
        onPress={() => {
          onSelectGif(item)
          bottomSheetRef.current.close()
        }}
        item={item}
      />
    )
  }

  const renderList = () => {
    const isSearchActive = searchText.length != 0
    const data = isSearchActive ? searchArray : trendingArray
    const fetchMore = isSearchActive ? fetchMoreSearchGif : fetchMoreTrendingGif
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#512DA8' />
        </View>
      )
    }
    return (
      <BottomSheetFlatList
        data={data}
        renderItem={renderItem}
        renderSectionHeader={renderHeader}
        onEndReachedThreshold={0.9}
        onEndReached={fetchMore}
        keyExtractor={(item, index) => `-----------${index}`}
      />
    )
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      {renderHeader()}
      {renderList()}
    </BottomSheet>
  )
})
