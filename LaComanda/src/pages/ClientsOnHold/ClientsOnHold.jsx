/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import {
  View, Text, TouchableOpacity, FlatList, Image, Modal
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { app } from '../../../firebase';
import { styles } from './styles';
// import { saveItemInCollection, updateItem } from '../../services/FirestoreServices';
import theme from '../../config/theme';
import { updateItem } from '../../services/FirestoreServices';

export default function ClientsOnHold() {
  const [modalVisible, setModalVisible] = useState( false );
  const [clients, setClients] = useState([]);
  const [tables, setTables] = useState([]);
  const [tableAssigned, setTableAssigned] = useState({});
  const [clientData, setClientData] = useState({});

  useEffect(() => {
    app.firestore().collection( 'clients' ).where( 'orderState', '==', '1' )
      .onSnapshot(( querySnapshots ) => {
        const dbClients = querySnapshots.docs.map(( doc ) => ({ data: doc.data(), id: doc.id }));

        setClients( dbClients );
      }, ( err ) => {
        console.log( err );
      });
  }, []);

  const getTables = () => {
    app.firestore().collection( 'tables' ).where( 'tableState', '==', '1' )
      .onSnapshot(( querySnapshots ) => {
        const freeTables = querySnapshots.docs.map(( doc ) => ({ data: doc.data(), id: doc.id }));
        setTables( freeTables );
      }, ( err ) => {
        console.log( err );
      });
  };

  const handleModalConfirm = () => {
    updateItem( 'clients', clientData.data.email, { orderState: '2', assignedTable: tableAssigned.number });
    updateItem( 'tables', tableAssigned.number, { tableState: '2' });
    setModalVisible( !modalVisible );
  };

  const handleModalCancel = () => {
    setModalVisible( false );
  };

  const renderModalWithTables = () => (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible( !modalVisible );
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={tables}
              ItemSeparatorComponent={() => <Text> </Text>}
              renderItem={(({ item: t }) => <TableCard tableData={t.data} setTableAssigned={setTableAssigned} tableAssigned={tableAssigned} /> )}
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={() => handleModalConfirm()}
              >
                <Text style={styles.textStyle}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleModalCancel()}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  const handleAsignTable = ( id, data ) => {
    getTables();
    setModalVisible( true );
    setClientData({ id, data });
  };

  return (
    <View style={styles.container}>
      {modalVisible && renderModalWithTables()}
      <FlatList
        data={clients}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={(({ item: c }) => <ClientCard data={c.data} id={c.id} handleAsignTable={handleAsignTable} /> )}
      />
    </View>
  );
}

function ClientCard( props ) {
  const {
    data, id, handleAsignTable
  } = props;

  return (
    <View style={styles.clientCard}>
      <Text style={styles.textName}>{`${data.email}`}</Text>
      <View style={styles.formControlPhoto}>
        <Image
          style={styles.formControlPhotoWithPhoto}
          source={{ uri: data.photo.uri }}
          resizeMode='cover'
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => handleAsignTable( id, data )}>
          <MaterialCommunityIcons name='table-furniture' size={30} color={theme.colors.secondary} style={styles.icon}>
            <Text>Asignar Mesa</Text>
          </MaterialCommunityIcons>
        </TouchableOpacity>
      </View>

    </View>
  );
}

function TableCard( props ) {
  const { tableData, setTableAssigned, tableAssigned } = props;
  const { type, capacity, number } = tableData;

  const handleTableAsignment = () => {
    setTableAssigned( tableData );
  };

  return (
    <View style={styles.tableCard}>
      <View>
        <Text>{`Número de Mesa: ${number}`}</Text>
        <Text>{`Tipo de Mesa: ${type}`}</Text>
        <Text>{`Capacidad: ${capacity}`}</Text>
        <TouchableOpacity style={!( tableAssigned.number === number ) ? styles.button : styles.buttonAsigned} onPress={() => { handleTableAsignment(); }}>
          <Text style={!( tableAssigned.number === number ) ? styles.textButton : styles.textButtonAsigned}>
            {( tableAssigned.number === number ) ? 'Asignada' : 'Asignar ésta mesa'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
