import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ProductModal from './ProductModal';
import { incrementQuantity, decrementQuantity } from './store/cartSlice';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity({ productId }));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ productId }));
  };

  const renderCartControls = (item) => {
    const quantity = cartItems[item.id]?.quantity || 0;
    if (quantity > 0) {
      return (
        <View style={styles.cartControls}>
          <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.controlButton}>
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.controlButton}>
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.productDetails}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={{ fontFamily:'outfit-bold',fontSize:18}}>{item.title}</Text>
                <Text style={{ fontFamily:'outfit-med',fontSize:18}}>${item.price}</Text>
                <Text style={{ fontFamily:'outfit',fontSize:15}}>Category: {item.category}</Text> 
              </View>
            </TouchableOpacity>
            {renderCartControls(item)}
          </View>
        )}
      />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          visible={modalVisible}
          onClose={closeModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ADD8E6'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 25, 
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    resizeMode: 'contain'
  },
  textContainer: {
   flex:2,
    justifyContent: 'center',
    
  },
 
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  controlText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
