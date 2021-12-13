import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// custom imports
import ProgressBarComponent from 'components/UI/ProgressBarComponent';
import {Ticket} from 'context/app/interfaces/AppStateInterface';
import {AppContext} from 'context/app/AppContext';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
interface HeaderTicketComponentProps {
  ticket: Ticket;
}

const HeaderTicketComponent: React.FC<HeaderTicketComponentProps> = ({
  ticket,
}) => {
  const {
    appState: {totalPorducts, resetAnimation},
  } = useContext(AppContext);
  return (
    <View style={styles.containerHeader}>
      <View style={{position: 'absolute', top: 0}}>
        <ProgressBarComponent time={60} reset={resetAnimation} />
      </View>
      <View
        style={{
          // justifyContent: 'center',
          alignItems: 'center',
          // marginVertical: 31,
          // borderWidth: 3,
          // marginBottom: 20,
        }}>
        <Text style={styles.txtTitle}>¡Encontramos tu solicitud!</Text>

        <View style={{...styles.containerCenter, marginVertical: 16}}>
          <Text style={[styles.txtTicket]}>Ticket N° </Text>
          <Text style={[styles.txtTicket, styles.txtTicketNumber]}>
            {ticket.ticket_id}
          </Text>
        </View>
        <View style={styles.containerCenter}>
          <Text style={styles.txtProducts}>Productos a devolver: </Text>
          <Text style={[styles.txtProducts, styles.txtProductsCount]}>
            {' '}
            {totalPorducts}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: GlobalColors.text.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
});

export default HeaderTicketComponent;
