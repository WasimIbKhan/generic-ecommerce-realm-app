import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';

interface ProductHitItemProps {
    onSelect: () => void;
    addCart?: () => void;
    hit: {
        imageUrl: string;
        title: string;
        description: string;
        price: number;
    };
}

const ProductHitItem: React.FC<ProductHitItemProps> = (props) => {
    return (
        <TouchableOpacity style={styles.product} onPress={props.onSelect}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.hit.imageUrl }} />
                </View>
                <View style={styles.details}>
                    <View style={styles.upperLayer}>
                        <Text style={styles.title}>{props.hit.title}</Text>
                        <Text style={styles.description} numberOfLines={4} ellipsizeMode="tail">{props.hit.description}</Text>
                    </View>
                    <View style={styles.bottomLayer}>
                        <Text style={styles.price}>${props.hit.price}</Text>
                        <TouchableOpacity style={styles.buyButton} onPress={props.addCart}>
                            <Text style={styles.addText}>Buy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    product: {
        width: Dimensions.get('window').width * 0.90,
        height: Dimensions.get('window').height * 0.15,
        margin: 20,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        padding: Dimensions.get('window').height * 0.01,
    },
    image: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.15,
        borderRadius: 5,
    },
    details: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    title: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        textAlign: 'left',
        color: Colors.accent,
        fontSize: 16,
    },
    description: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: 'normal',
        color: 'grey',
        width: Dimensions.get('window').width * 0.40,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        justifyContent: 'center',
        fontFamily: 'helvetica',
        color: Colors.accent,
    },
    upperLayer: {
        flex: 1,
        width: Dimensions.get('window').width * 0.43,
    },
    bottomLayer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    buyButton: {
        backgroundColor: Colors.accent,
        borderRadius: 20,
        padding: 7,
        justifyContent: 'center',
        marginLeft: 7,
    },
    addText: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        paddingHorizontal: 7,
        color: 'white'
    },
});

export default ProductHitItem;
