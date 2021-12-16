import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// custom import
import CheckBoxComponent from 'components/UI/CheckBoxComponent';
import {Product} from 'context/app/interfaces/AppStateInterface';
import {AppContext} from 'context/app/AppContext';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import {getMessageDetail, validateProperty} from 'utils/methods';
import BagSmallSvg from 'assets/img/bag_small.svg';

interface ProductItemComponentProps {
  product: Product;
}

const ProductItemComponent: React.FC<ProductItemComponentProps> = ({
  product,
}) => {
  const [isSelected, setIsSelected] = useState(true);
  const {
    appState: {totalPorducts, resetAnimation},
    changeTotalProducts,
    changeAnimation,
    deleteProductReturned,
    addProductReturned,
  } = useContext(AppContext);
  const messageDetails = getMessageDetail(
    product.product_size,
    product.product_color,
  );
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        console.log('click');
        changeAnimation(!resetAnimation);
      }}>
      {/* checkbox */}
      {/* info */}
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: 24}}>
          <CheckBoxComponent
            isChecked={isSelected}
            onPress={() => {
              setIsSelected(!isSelected);
              changeAnimation(!resetAnimation);
              if (!isSelected) {
                console.log('se agrega');
                changeTotalProducts(
                  totalPorducts + product.quantity_products_return,
                );
                deleteProductReturned(parseInt(product.order_detail_id));
              } else {
                console.log('se quita');
                changeTotalProducts(
                  totalPorducts - product.quantity_products_return,
                );
                addProductReturned(parseInt(product.order_detail_id));
              }
            }}
          />
        </View>
        <View>
          <Text style={styles.txtTitleName}>{product.product_name}</Text>
          {messageDetails.length > 0 && (
            <Text style={styles.txtDetails}>{messageDetails}</Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              alignItems: 'center',
            }}>
            <Text style={styles.txtError}>{product.reason_name}</Text>
            <BagSmallSvg width={24} height={24} />
          </View>
        </View>
      </View>
      {/* quantity */}

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            top: -10,
          }}>
          <Text style={styles.txtCloseIcon}>x</Text>

          <Text style={styles.txtQuantity}>
            {product.quantity_products_return}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GlobalColors.background.paper,
    paddingVertical: 20,
    paddingLeft: '11%',
    paddingRight: '18%',
  },
  txtTitleName: {
    fontSize: 20,
    color: GlobalColors.text.primary,
    fontFamily: GlobalFont[600],
  },
  txtDetails: {
    fontSize: 18,
    color: GlobalColors.text.primary,
    marginTop: 8,
    fontFamily: GlobalFont[400],
  },
  txtError: {
    fontSize: 18,
    color: GlobalColors.alert.error,
    fontFamily: GlobalFont[500],
    marginRight: 8,
  },
  txtCloseIcon: {
    fontSize: 20,
    color: GlobalColors.text.primary,
    fontFamily: GlobalFont[400],
    marginHorizontal: 12,
  },
  txtQuantity: {
    fontSize: 40,
    color: GlobalColors.text.primary,
    fontFamily: GlobalFont[700],
  },
});

export default ProductItemComponent;
