import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AddProductsScreen from '../components/screens/AddProductsScreen/AddProductsScreen.component';
import { Screens } from './Screens';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../redux/authReducer';
import AddAdminsScreen from '../components/screens/AddAdminsController/AddAdminsScreen.component';
import AddTableStack from './stacks/AddTableStack';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AddProductStack from './stacks/AddProductStack';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props:any) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar sesión"
        onPress={() => dispatch(handleLogout())}
      />
    </DrawerContentScrollView>
  );
}

const DrawerStack = () => {
    return (
        <Drawer.Navigator initialRouteName={Screens.ADD_PRODUCTS} drawerContent={props => <CustomDrawerContent {...props} />} 
        screenOptions={({navigation}) => ({
          headerLeft:()=><TouchableOpacity style={{marginHorizontal:14}}
            onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>
        })}>
          <Drawer.Screen name={Screens.ADD_PRODUCTS} component={AddProductStack} options={{headerShown:false}} />
          <Drawer.Screen name={Screens.ADD_ADMINS} component={AddAdminsScreen} />
          <Drawer.Screen name={Screens.ADD_TABLE} component={AddTableStack} options={{headerShown:false}} />
        </Drawer.Navigator>
    );
}

export default DrawerStack