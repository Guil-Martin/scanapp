import React, { useState, useEffect, useContext } from 'react';
import { Button, FlatList, SectionList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ApiContext } from '../../api-context'

import { 
	Colors,
	StyledContainer,
	InnerContainer,
	PageTitle,
	SubTitle,
	StyledCategoryContainer,
	StyledCategoryBox,
	StyledCategoryText,
} from '../components/styles'

const { primary, brand, darkLight } = Colors;

const Catgories = ({navigation}, props) => {

	// Get api axios object from react context
	const api = useContext(ApiContext)

	const [categoryList, setCategoryList] = useState([]);

	const getCategories = async () => {
		let categories = await api.get('category')
		.then(res => res.data)
		.catch(err => { console.log(err) })
		setCategoryList(categories)
	}

	// The second param is an array of variables that the component will check to make sure changed before re-rendering. 
	// I need to trigger it one time so I pass an empty array
  useEffect(() => { 
		getCategories();
	}, []);

	return (
		<StyledContainer>
			<StatusBar styles="dark" />
			<InnerContainer>

				{/* <PageTitle>Javap</PageTitle> */}
				<SubTitle>Catgories</SubTitle>

				<Button title="Home"
					onPress={() => navigation.navigate("HomeScreen")}
				/>

				<StyledCategoryContainer>
					{ categoryList.length != 0 && 
						<FlatList
							numColumns={2}
							keyExtractor={(item, id) => id.toString()}
							data={ categoryList }
							renderItem={ ({item}) => <CategoryBox navigation={ navigation } category={ item } />}
						/>
					}
				</StyledCategoryContainer>

			</InnerContainer>
		</StyledContainer>
  );
}

const CategoryBox = ({ navigation, category  }) => (
	<StyledCategoryBox onPress={() => navigation.navigate("ProductScreen", { category })}>
		<StyledCategoryText>{ category.label }</StyledCategoryText>
	</StyledCategoryBox>
)

export default Catgories;