import React,{useState, useRef} from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import CommunicatesItem from "./CommunicatesItem";
import { useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');


const CommunicateList = ({communicates}) => {
    const [currentIndex,setCurrentIndex]= useState(0);
    const loader = useSelector(state => state.homeDuck.loading)


    const getIndicators = (item) => {
        if(!item || typeof item !=='number') return null;
    
        let indicators = [];
        for( let i=0; i<item; i++){
          indicators.push(i);
        }
        return indicators.map((indicator,index) => (
          <View key={indicator} style={[styles.indicator, index === currentIndex ? styles.selected: styles.unSelected]}></View>
        ))
    }

    const change = useRef((item) => {
        if (item && item.viewableItems && item.viewableItems.length > 0) {
            setCurrentIndex(item.viewableItems[0].index);
        }
    })
    return(
        <View style={{ flex:1}}>
            {!loader ? communicates?.length > 0 && (
                <View style={styles.container}>
                    <Text style={{color: Colors.white, fontSize: getFontSize(16), fontWeight:'400', marginBottom:15}}>Comunicados oficiales</Text>
                    <FlatList 
                        data={communicates}
                        keyExtractor={(item,index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToOffsets={[...Array(communicates.length)].map((x, i) =>  width * i + width*0.95)}
                        decelerationRate={0}
                        snapToAlignment="center"
                        renderItem={({item,index}) => (
                            <CommunicatesItem item={item} index={index}/>
                        )}
                        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50,}}
                        onViewableItemsChanged={ change.current }
                    />
                    <View style={styles.indicatorCont}>
                        {getIndicators(communicates.length)}
                    </View>
                </View>

            ):(
                <View style={styles.container}>
                    <Skeleton  lines={1} width={width * 0.9} mt={5} mr={4} borderRadius={20} height={height/2.2} mb={2} />
                </View>
            )}
        
        </View>
    )
}

const styles = StyleSheet.create({
    indicator:{
        width:10,
        height:10,
        backgroundColor:'white',
        borderRadius:5,
        marginRight:5
    },
    selected:{
        backgroundColor:Colors.lightPurple
    },
    unSelected:{
      backgroundColor:'#D9CBBD',
    },
    indicatorCont:{
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'center',
      marginTop:20,
      marginRight:20
    },
    container:{
        alignSelf:'flex-start', 
        marginLeft:20, 
        marginVertical:20
    }
})

export default CommunicateList;