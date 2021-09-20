import React, { useState, useEffect, useContext } from 'react';
import { Button, FlatList } from 'react-native';
import { ApiContext } from '../../api-context'
import { StatusBar } from 'expo-status-bar';

import { 
	Colors,
	StyledContainer,
	InnerContainer,
	PageTitle,
	SubTitle,
	StyledProductContainer,
	StyledProductBox,
	StyledProductText,
} from '../components/styles'

const { primary, brand, darkLight } = Colors;

const Products = ({navigation, route}) => {

	const { category } = route.params;

	console.log(category.label);
	// Get api axios object from react context
	const api = useContext(ApiContext)

	const [productList, setProductList] = useState([]);

	const getProducts = async () => {
		let products = await api.get(`product/category/${category.id}`)
		.then(res => res.data)
		.catch(err => { console.log(err) })
		setProductList(products)
	}

  useEffect(() => { 
		getProducts();
	}, []);

	return (
		<StyledContainer>
			<StatusBar styles="dark" />
			<InnerContainer>

				<PageTitle> { category.label } </PageTitle>
				{/* <SubTitle>Catgories</SubTitle> */}

				<Button title="Home"
					onPress={() => navigation.navigate("HomeScreen")}
				/>

				<StyledProductContainer>
				{ productList.length != 0 && 
					<FlatList
						keyExtractor={(item, id) => id.toString()}
						data={ productList }
						renderItem={ ({item}) => <CategoryBox product={ item } />}
					/>
				}
				</StyledProductContainer>

			</InnerContainer>
		</StyledContainer>
  );
}

const CategoryBox = ({ product  }) => (
	<StyledProductBox>
		<StyledProductText>{ product.name }</StyledProductText>
		<StyledProductText>{`Price: ${product.price}`}</StyledProductText>
		<StyledProductText>{`Score: ${product.score}`}</StyledProductText>
		<StyledProductText>{`Barcode: ${product.barcode}`}</StyledProductText>
	</StyledProductBox>
)

export default Products;