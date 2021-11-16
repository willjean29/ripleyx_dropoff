import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// custom import
import CheckBoxComponent from 'components/UI/CheckBoxComponent';
import {Product} from 'context/app/interfaces/AppStateInterface';
import {AppContext} from 'context/app/AppContext';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
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
  } = useContext(AppContext);
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
              !isSelected
                ? changeTotalProducts(
                    totalPorducts + product.quantityProductsReturn,
                  )
                : changeTotalProducts(
                    totalPorducts - product.quantityProductsReturn,
                  );
            }}
          />
        </View>
        <View>
          <Text style={styles.txtTitleName}>{product.productName}</Text>

          <Text style={styles.txtDetails}>
            {product.productSize !== '-' && `Talla ${product.productSize}`}
            {product.productSize !== '-' &&
              product.productColor !== '' &&
              ` - `}
            {product.productColor !== '' && `Color ${product.productColor}`}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txtError}>{product.reasonName}</Text>
            <BagSmallSvg width={24} height={24} />
          </View>
        </View>
      </View>
      {/* quantity */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.txtCloseIcon}>x</Text>
        <Text style={styles.txtQuantity}>{product.quantityProductsReturn}</Text>
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
    marginBottom: 12,
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
