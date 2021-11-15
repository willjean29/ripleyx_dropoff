import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import ProductItemComponent from 'components/TicketProduct/ProductItemComponent';
import {Product} from 'context/app/interfaces/AppStateInterface';

interface TicketProductsComponentProps {
  products: Product[];
}

const TicketProductsComponent: React.FC<TicketProductsComponentProps> = ({
  products,
}) => {
  const [isSelect, setIsSelect] = useState(false);
  return (
    <View style={{flex: 1}}>
      {/* title */}
      <View style={styles.containerTitle}>
        <Text style={styles.txtTitles}>Detalles del Producto</Text>
        <Text style={styles.txtTitles}>Cant.</Text>
      </View>
      {/* products */}
      <View style={{backgroundColor: GlobalColors.background.paper, flex: 1}}>
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderColor: GlobalColors.misc.dividers,
                borderWidth: 1,
              }}></View>
          )}
          renderItem={({item}) => <ProductItemComponent product={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '17%',
    alignItems: 'center',
    backgroundColor: GlobalColors.background.morita,
    paddingVertical: 28,
  },
  txtTitles: {
    color: GlobalColors.text.secondary,
    fontSize: 28,
    fontFamily: GlobalFont[600],
    textTransform: 'uppercase',
  },
});

export default TicketProductsComponent;
