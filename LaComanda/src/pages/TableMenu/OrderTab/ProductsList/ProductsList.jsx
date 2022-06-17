/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList, Text, View, TouchableOpacity, ActivityIndicator
} from 'react-native';
import React, { useContext, useState } from 'react';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import ProductItem from '../ProductItem/ProductItem';
import GlobalContext from '../../../../context/GlobalContext';
import { updateItem } from '../../../../services/FirestoreServices';
import { OrderStatus } from '../../../../util/Enums';
import theme from '../../../../config/theme';

export default function ProductsList({ navigation }) {
  const { client } = useContext( GlobalContext );
  const [total, setTotal] = useState( 0 );
  const [totalEstimatedTime, setTotalEstimatedTime] = useState( 0 );
  const [spinner, setSpinner] = useState( false );
  const [newOrder, setNewOrder] = useState([]);
  const [productList, setProductList] = useState([{
    photos: ['https://firebasestorage.googleapis.com/v0/b/lacomanda-47138.appspot.com/o/3wRbuRgbkvhVGj4Ckm8MFABsn6I2%2F8460158d-8498-4cad-919e-a41593f47be3?alt=media&token=58ef4d4d-4949-4c51-86be-a1239fa0426a',
      'https://firebasestorage.googleapis.com/v0/b/lacomanda-47138.appspot.com/o/3wRbuRgbkvhVGj4Ckm8MFABsn6I2%2F8460158d-8498-4cad-919e-a41593f47be3?alt=media&token=58ef4d4d-4949-4c51-86be-a1239fa0426a',
      'https://firebasestorage.googleapis.com/v0/b/lacomanda-47138.appspot.com/o/3wRbuRgbkvhVGj4Ckm8MFABsn6I2%2F8460158d-8498-4cad-919e-a41593f47be3?alt=media&token=58ef4d4d-4949-4c51-86be-a1239fa0426a'],
    name: 'product 1',
    price: '10',
    description: 'el producto 1 es el primer producto',
    elaborationTime: '15'
  }, {
    photos: ['https://firebasestorage.googleapis.com/v0/b/lacomanda-47138.appspot.com/o/U5V4xOgOrKS0IcXKOIp1V3TnEtj1%2Faa650e09-65b1-4f44-bf38-9f924fdb9931?alt=media&token=da4cbcb4-9c98-4129-a5c9-b1a89b20d82f',
      'https://firebasestorage.googleapis.com/v0/b/lacomanda-47138.appspot.com/o/U5V4xOgOrKS0IcXKOIp1V3TnEtj1%2Faa650e09-65b1-4f44-bf38-9f924fdb9931?alt=media&token=da4cbcb4-9c98-4129-a5c9-b1a89b20d82f',
      'https://firebasestorage.googleapis.com/v0/b/lacomanda-47138.appspot.com/o/U5V4xOgOrKS0IcXKOIp1V3TnEtj1%2Faa650e09-65b1-4f44-bf38-9f924fdb9931?alt=media&token=da4cbcb4-9c98-4129-a5c9-b1a89b20d82f'],
    name: 'product 2',
    price: '15',
    description: 'el producto 2 es el segundo producto',
    elaborationTime: '5'
  }]);

  const handlerAddproduct = ( _product ) => {
    const productsInOrder = newOrder.filter(( p ) => p.name === _product.name );
    if ( productsInOrder.length > 0 ) {
      productsInOrder[0].quantity += 1;
    } else {
      newOrder.push({ ..._product, quantity: 1 });
    }
    calculateTotal();
    calculateEstimatedTime();
  };

  const handlerRemoveProduct = ( _product ) => {
    const productsInOrder = newOrder.filter(( p ) => p.name === _product.name );
    if ( productsInOrder.length > 0 ) {
      if ( productsInOrder[0].quantity > 1 ) {
        productsInOrder[0].quantity -= 1;
      } else {
        setNewOrder( newOrder.filter(( p ) => p.name !== _product.name ));
      }
    }
    calculateTotal();
    calculateEstimatedTime();
  };

  const handlerQuantityInOrder = ( _product ) => {
    const productsInOrder = newOrder.filter(( p ) => p.name === _product.name );
    return productsInOrder.length > 0 ? productsInOrder[0].quantity : 0;
  };

  const calculateTotal = () => {
    if ( newOrder.length > 0 ) {
      const t = newOrder.reduce(( _total, p ) => _total + ( p.price * p.quantity ), 0 );
      setTotal( t );
    } else {
      setTotal( newOrder.length );
    }
  };

  const calculateEstimatedTime = () => {
    if ( newOrder.length > 0 ) {
      const t = newOrder.reduce(( _total, p ) => _total + ( parseInt( p.elaborationTime, 10 ) * p.quantity ), 0 );
      setTotalEstimatedTime( t );
    } else {
      setTotalEstimatedTime( 0 );
    }
  };

  const createOrder = () => {
    setSpinner( true );
    updateItem( 'clients', client.email, {
      orderState: OrderStatus.OrderSended,
      order: { totalEstimatedTime, total, products: newOrder }
    }).then(() => {
      getAllWaiter(( data ) => {
        const response = data.docs.map(( doc ) => doc.data());
        const usersToken = response.map(( u ) => u.pushToken );
        sendPushNotification( usersToken, 'Nuevo Pedido', 'Ha ingresado un nuevo pedido para confirmar' );
      }, ( err ) => { console.log( err ); });
      navigation.navigate( 'WaitingOrder' );
    });
  };

  const handleChat = () => {
    navigation.navigate( 'ClientChat' );
  };

  return (
    <View>
      {
        spinner ? (
          <View style={styles.container}>
            <ActivityIndicator size={180} color={theme.colors.primary} />
          </View>
        )
          : (

            <View style={styles.container}>
              <Text style={styles.estimatedTimeText}>
                Tiempo Estimado:
                {' '}
                {totalEstimatedTime}
                {' '}
                minutos
              </Text>
              <FlatList
                data={productList}
                renderItem={({ item: p }) => (
                  <ProductItem
                    product={p}
                    addProduct={handlerAddproduct}
                    removeProduct={handlerRemoveProduct}
                    quantityInOrder={handlerQuantityInOrder}
                  />
                )}
              />
              <TouchableOpacity style={styles.containerOrderButton} onPress={createOrder}>
                <View style={styles.orderButton}>
                  <Text style={styles.orderButtonText}>Hacer Pedido </Text>
                  <Text style={styles.orderTotalPriceButtonText}>
                    $
                    {' '}
                    {total}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
      }
      <TouchableOpacity onPress={handleChat}>
        <View style={styles.containerChatIcon}>
          <ChatIcon name='chatbubbles-outline' style={styles.chatIcon} size={40} color='white' />
        </View>
      </TouchableOpacity>
    </View>
  );
}

