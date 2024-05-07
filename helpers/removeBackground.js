import RNFetchBlob from 'rn-fetch-blob';

const URL = 'https://sdk.photoroom.com/v1/segment';

// Please replace with your apiKey
const API_KEY = 'b788112baf03fa9f7cfb3b159385c1d83101a5c5';

export const removeBackground = async (imageUri) => {
  try {
    const response = await RNFetchBlob.fetch('POST', URL, {
      'Content-Type': 'multipart/form-data',
      'x-api-key': API_KEY,
      Accept: 'application/json',
    }, [
      { name: 'image_file', filename: 'image.jpg', type: 'image/jpeg', data: RNFetchBlob.wrap(imageUri) },
      { name: 'size', data: 'preview' },
    ]);

    const responseData = response.json();
    return responseData.result_b64;
  } catch (e) {
    console.log(e);
  }
};
