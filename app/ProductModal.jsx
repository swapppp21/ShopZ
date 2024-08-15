import React from 'react';
import { Modal, View, Text, Button, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from './store/cartSlice';

export default function ProductModal({ product, visible, onClose }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id }));
    onClose(); // Close the modal after adding to cart
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={{fontFamily:'outfit-bold',fontSize:25,marginTop:-20,marginBottom:20}}>{product.title}</Text>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={{fontFamily:'outfit', fontSize:18,marginBottom:20}}>{product.description}</Text>
        <Text style={{fontFamily:'outfit-bold',fontSize:35,marginBottom:20}}>${product.price}</Text>
        <View style={{display:'flex',flexDirection:'row', gap:20}}>
        <Button  title="Add to Cart" onPress={handleAddToCart} color="#FF0000" />
        <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth:5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15,
    resizeMode:'contain',
    borderWidth:2
  },

  button:{
    backgroundColor:'White'
  }
});
