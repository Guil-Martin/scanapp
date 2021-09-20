import React, {useState} from 'react';

import { Image, StyleSheet, Text, 
  Dimensions,
  View, 
  Touchable,
  TouchableWithoutFeedback, 
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  Button, 
  FlatList,
  ActivityIndicator,
  } from 'react-native';
  
import { BarCodeScanner } from 'expo-barcode-scanner';

import { 
	StyledContainer,
	InnerContainer,
	PageLogo,
	PageTitle,
	SubTitle,
	StyledFormArea,
	LeftIcon,
	RightIcon,
	StyledInputLabel,
	StyledButton,
	StyledTextInput,
	Colors,
	Buttontext,
	MsgBox,
	Line,
	ExtraText,
	ExtraView,
	TextLink,
	TextLinkContent,
} from '../components/styles'

const { primary, brand, darkLight } = Colors;

function Scanner({navigation}, props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productData, setProductData] = useState("No product");

  const askForCameraPermission = () => {
      (async () => {
          const {status} = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status == "granted")
      })()
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setProductData(data);

    // Set data of found product by fetching the api

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
				<PageTitle>Javap</PageTitle>
				<SubTitle>Product Scanner</SubTitle>
				
				{scanned ?
		
					<Button title={"Scan again ?"} onPress={() => setScanned(false)} color='tomato' />
					:
					<View style={styles.barCodeBox}>
						<BarCodeScanner style={styles.scanner}
								onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />
					</View>
		
				}

				<Text style={styles.mainText}>{productData}</Text>

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