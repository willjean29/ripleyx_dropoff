import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ProgressBarComponent from 'components/ProgressBarComponent';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import ButtonComponent from 'components/ButtonComponent';

interface TicketScreenProps {}

const TicketScreen: React.FC<TicketScreenProps> = () => {
  return (
    <View style={styles.conatiner}>
      {/* component header */}
      <View style={styles.containerHeader}>
        <ProgressBarComponent />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 31,
          }}>
          <Text style={styles.txtTitle}>!Encontramos tu solicitud!</Text>
          <View style={{...styles.containerCenter, marginVertical: 16}}>
            <Text style={[styles.txtTicket]}>Ticket N° </Text>
            <Text style={[styles.txtTicket, styles.txtTicketNumber]}>
              T-001005
            </Text>
          </View>
          <View style={styles.containerCenter}>
            <Text style={styles.txtProducts}>Productos a devolver: </Text>
            <Text style={[styles.txtProducts, styles.txtProductsCount]}>
              {' '}
              4
            </Text>
          </View>
        </View>
      </View>
      {/* component Title */}
      <View style={styles.containerTitle}>
        <Text style={styles.txtTitles}>Detalles del Producto</Text>
        <Text style={styles.txtTitles}>Cant.</Text>
      </View>
      {/* component main products */}
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Text>PRODUCTOS</Text>
      </View>
      {/* component buttonfooter */}
      <View
        style={{
          backgroundColor: GlobalColors.text.secondary,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 170,
        }}>
        <ButtonComponent
          title="Imprimir código QR"
          onPress={() => {
            console.log('Imprimir código QR');
          }}
        />
        <ButtonComponent
          title="Escanear otro QR"
          fill="outline"
          onPress={() => {
            console.log('Escanear otro QR');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    // borderWidth: 1,
    // backgroundColor: 'red',
  },
  // styles header
  containerHeader: {
    backgroundColor: GlobalColors.text.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    fontFamily: GlobalFont[400],
    fontSize: 28,
    color: GlobalColors.background.morita,
  },
  txtTicket: {
    fontFamily: GlobalFont[500],
    color: GlobalColors.background.morita,
    fontSize: 48,
  },
  txtTicketNumber: {
    fontFamily: GlobalFont[600],
    color: GlobalColors.alert.warning,
  },
  txtProducts: {
    fontFamily: GlobalFont[400],
    fontSize: 32,
    color: GlobalColors.background.morita,
  },
  txtProductsCount: {
    fontFamily: GlobalFont[600],
    fontSize: 36,
  },
  // styles title
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: GlobalColors.background.morita,
    paddingVertical: 28,
    borderWidth: 1,
  },
  txtTitles: {
    color: GlobalColors.text.secondary,
    fontSize: 28,
    fontFamily: GlobalFont[600],
    textTransform: 'uppercase',
  },
});

export default TicketScreen;
