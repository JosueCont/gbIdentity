import React,{useState,useEffect, useRef} from "react";
import { FlatList, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import moment from "moment/moment";
import Card from "../CardGafete";
import GafeteItem from "../GafeteItem";

const {height, width} = Dimensions.get('window');

const InitialPage = ({setQrRoute}) => {
    const [currentIndex,setCurrentIndex]=useState(0);

    
    const data = [
        {
            image:'',
            date:'06/11/2023',
            time:'11:00 am',
            ubication:'Oficina central',
            color: Colors.white
        },
        {
            image:'',
            date:'06/11/2023',
            time:'9:00 am',
            ubication:'Oficina central',
            color: Colors.white
        },
        {
            image:'',
            date:'07/11/2023',
            time:'10:00 am',
            ubication:'Oficina central',
            color: Colors.white
        },
        {
            image:'',
            date:'07/11/2023',
            time:'9:00 am',
            ubication:'Oficina central',
            color: Colors.orange
        }
    ]

    const gafetes = [
        {image:require('../../../assets/profileFake.png'), firstName:'Braulio', lastName:'Rodriguez', code:'99283', branch:'Suc. Mérida', color:Colors.white},
        {image:require('../../../assets/profileFake.png'), firstName:'Braulio', lastName:'Rodriguez', code:'99123', branch:'Suc. Bacalar', color:Colors.purple},
        {image:require('../../../assets/profileFake.png'), firstName:'Braulio', lastName:'Rodriguez', code:'99028', branch:'Suc. Cancún', color:Colors.orange},


    ]
    const getRegisters = () => {
        return data.map((item,index) => (
            <View style={styles.cardItem} key={index}>
                <View style={[styles.contImgItem, {backgroundColor:item.color}]}>
                    <Image source={require('../../../assets/logoBimbo.png')} style={styles.imgItem}/>
                </View>
                <View style={styles.contDesc}>
                    <Text style={styles.txtDate}>{moment(item.date,'DD/MM/YYYY').format('DD MMMM YYYY')}</Text>
                    <Text style={styles.txtDesc}>{item.time}</Text>
                    <Text style={styles.txtDesc}>{item.ubication}</Text>
                </View>
            </View>
        )).slice(0,4)
    }

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
        <View style={styles.container}>
            <View style={styles.contCards}>
                <FlatList 
                    data={gafetes}
                    pagingEnabled
                    keyExtractor={(item,index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToOffsets={[...Array(gafetes.length)].map((x, i) =>  width * i + width/1.1)}
                    decelerationRate={0}
                    snapToAlignment="center"
                    renderItem={({item,index}) => (
                        <GafeteItem item={item} setQrRoute={setQrRoute}/>
                    )}
                    viewabilityConfig={{viewAreaCoveragePercentThreshold: 50,}}
                    onViewableItemsChanged={ change.current }
                />
                <View style={styles.indicatorCont}>
                    {getIndicators(gafetes.length)}
                </View>
            </View>
            <View style={styles.contStreak}>
                <View style={{justifyContent:'center'}}>
                    <Image source={require('../../../assets/containerNum.png')} style={styles.imgStreak}/>
                    <Text style={styles.lblStreak}>4</Text>
                </View>
                <View style={styles.contDescStreak}>
                    <Text style={styles.titleDesStreak}>¡Sigue así!</Text>
                    <Text style={styles.subtitleStreak}>Al día de hoy haz acumulado 4 insignias que te reconocen tu gran trayectoria como conductor oficial de Grupo Bimbo.</Text>
                </View>
            </View>

            <View style={styles.contChecks}>
                <Text style={styles.titleChecks}>Última actividad</Text>
                <View style={styles.cardChecks}>
                    <View style={styles.contReg}>{getRegisters()}</View>
                    <TouchableOpacity>
                        <Text style={styles.showMore}>Ver más registros</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    contCards:{
        width: width/1.1, 
        paddingTop:20,
        //height:250, 
        marginBottom:15
        //backgroundColor:'white'
    },
    card:{
        backgroundColor:Colors.white, width: width/1.1, height: height/3, borderRadius:20
    },
    contStreak:{
        marginTop:40,  
        width: width/1.1, 
        backgroundColor:Colors.blue2, 
        height:120, 
        borderRadius:20,  
        paddingLeft:20, 
        flexDirection:'row', 
        paddingRight:20, 
        marginBottom:20
    },
    imgStreak:{
        width:77, 
        height:75, 
        resizeMode:'contain'
    },
    lblStreak:{
        fontSize:getFontSize(35), 
        position:'absolute', 
        left:27, 
        color: Colors.golden, 
        fontWeight:'700'
    },
    contDescStreak:{
        justifyContent:'center', 
        width:'75%', 
        marginLeft: 16,  
        paddingRight:5 
    },
    titleDesStreak:{
        fontSize: getFontSize(23), 
        fontWeight:'700', 
        color: Colors.white, 
        marginBottom:7
    },
    subtitleStreak:{
        fontSize: getFontSize(10), 
        fontWeight:'400', 
        color: Colors.white
    },
    contChecks:{
        alignSelf:'flex-start', 
        marginLeft:20
    },
    titleChecks:{
        fontSize: getFontSize(16), 
        color: Colors.white, 
        fontWeight:'400', 
        marginBottom:25
    },
    cardChecks:{
        width: width/1.1, 
        backgroundColor:Colors.lightWhite, 
        paddingVertical:30, 
        borderRadius:15,
    },
    contReg:{
        paddingHorizontal:19, 
        marginBottom:60
    },
    showMore:{
        alignSelf:'center', 
        fontSize: getFontSize(16), 
        fontWeight:'400', 
        textDecorationLine:'underline', 
        color: Colors.grayDark
    },
    cardItem:{
        backgroundColor:Colors.grayV2, 
        borderRadius:20, 
        height:100, 
        marginBottom:14, 
        flexDirection:'row', 
        paddingRight:10
    },
    contImgItem:{
        alignSelf:'center', 
        width:80, height:80, 
        borderRadius:13, 
        marginLeft:15, 
        justifyContent:'center', 
        alignItems:'center',
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    imgItem:{
        width:50, height:22, resizeMode:'contain'
    },
    contDesc:{
        justifyContent:'center', 
        marginLeft:6
    },
    txtDate:{
        fontSize: getFontSize(21), 
        color:Colors.grayDark, 
        fontWeight:'700'
    },
    txtDesc:{
        fontSize: getFontSize(15), 
        color: Colors.grayDark, 
        fontWeight:'400'
    },
    indicator:{
        width:10,
        height:10,
        backgroundColor:'white',
        borderRadius:5,
        marginHorizontal:5
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
    },

})

export default InitialPage;
