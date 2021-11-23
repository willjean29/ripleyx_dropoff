import React, {useContext, useState} from 'react';
// custom import
import TicketLayout from 'layouts/TicketLayout';
import HeaderTicketComponent from 'components/Layout/HeaderTicketComponent';
import FooterTicketComponent from 'components/Layout/FooterTicketComponent';
import TicketProductsComponent from 'components/TicketProduct/TicketProductsComponent';
import {AppContext} from 'context/app/AppContext';

interface TicketProductsScreenProps {}

const TicketProductsScreen: React.FC<TicketProductsScreenProps> = () => {
  const {
    appState: {ticketInfo, products, returnedProducts},
  } = useContext(AppContext);
  // console.log(ticketInfo, products);
  console.log(returnedProducts);
  return (
    <TicketLayout
      header={<HeaderTicketComponent ticket={ticketInfo!} />}
      main={<TicketProductsComponent products={products} />}
      footer={<FooterTicketComponent />}
    />
  );
};

export default TicketProductsScreen;
