import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TicketLayout from '../layouts/TicketLayout';
import HeaderTicketComponent from 'components/HeaderTicketComponent';
import FooterTicketComponent from 'components/FooterTicketComponent';
import TicketProductsComponent from 'components/TicketProductsComponent';
import {AppContext} from 'context/app/AppContext';

interface TicketProductsScreenProps {}

const TicketProductsScreen: React.FC<TicketProductsScreenProps> = () => {
  const {
    appState: {ticketInfo, products},
  } = useContext(AppContext);

  return (
    <TicketLayout
      header={<HeaderTicketComponent ticket={ticketInfo!} />}
      main={<TicketProductsComponent products={products} />}
      footer={<FooterTicketComponent />}
    />
  );
};

export default TicketProductsScreen;
