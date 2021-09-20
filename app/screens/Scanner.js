import React, { useState, useContext } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { 
  View, 
	Text, 
	Image, 
	StyleSheet, 
  Dimensions,
  Touchable,
  TouchableWithoutFeedback, 
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  Button, 
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { ApiContext } from '../../api-context';

import { 
	StyledContainer,
	InnerContainer,
	SubTitle,
	Colors,
	StyledScannerContainer,
	StyledScannerBox,
	StyledScannerText,
} from '../components/styles'

const { primary, brand, darkLight } = Colors;

function Scanner({navigation}, props) {

	const api = useContext(ApiContext)
	
	const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productData, setProductData] = useState(null);
	
  const askForCameraPermission = () => {
		(async () => {
          const {status} = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status == "granted")
      })()
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);

		api.get(`product/c/${data}`)
		.then(res => {
			console.log(res)
			if (res.status == 200) { setProductData(res.data); }		
		})
		.catch(err => { console.log(err) })

    console.log("Type: " + type + "\ndata: " + data)
  }

  askForCameraPermission();

  if (hasPermission === null) {
		return(
			<View style={styles.container}>
					<Text>Requesting for camera permission</Text>
			</View>
		)
  }

  if (hasPermission === false) {
		return(
			<View style={styles.container}>
					<Text>No access to camera</Text>
					<Button title={"Allow camera"} onPress={() => askForCameraPermission()}/>
			</View>
		)
  }   

  return (
		<StyledContainer>
			<InnerContainer>
				{/* <PageTitle>Javap</PageTitle> */}
				<SubTitle>Product Scanner</SubTitle>
				
				{scanned ?
					<Button title={"Scan again ?"} onPress={() => {
						setProductData(null)
						setScanned(false)}
					} color='tomato' />
					:
					<StyledScannerContainer>
						<BarCodeScanner style={{width: 400, height: 300,}}
								onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />
					</StyledScannerContainer>
				}

				{ productData &&
					<StyledScannerBox>
						<StyledScannerText>{ productData.name }</StyledScannerText>
						<StyledScannerText>{ productData.price }</StyledScannerText>
						<StyledScannerText>{ productData.barcode }</StyledScannerText>
						<StyledScannerText>{ productData.score }</StyledScannerText>
					</StyledScannerBox>
				}

			</InnerContainer>
		</StyledContainer>
    // <View style={styles.container}>


    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  barCodeBox: {
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  headerTitle: {
    backgroundColor: 'tomato',
  },
  mainText: {
    fontSize: 16,
    margin: 20,
  },
  scanner: {
    width: 400,
    height: 400,
  },
    button: {
        width: '100%',
        height: 70,
        backgroundColor: "#fc5c65",
    },
    pm: {
        backgroundColor: "purple",
    },
    pmName: {
        color: "white",
    }
});


export default Scanner;