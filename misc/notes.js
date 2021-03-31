///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function processQRData(p_strData)
   var l_arryStrData = p_strData.split(":*:");
   var l_strType = l_arryStrData[0];
   var l_strQR = l_arryStrData[1];
   debug("Type: " + l_strType);
   debug("QR: " + l_strQR);   
   else if (p_strData.indexOf("QRC") == 0)
   {
      g_strRequestValue = p_strData.substring(3, p_strData.length);
      getNativeRequest("11");
   }

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function getNativeRequest(p_strRequestID)
{
	  window.ReactNativeWebView.postMessage(p_strRequestID);
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function nativeCallback(p_strRequestID, p_strValue)
   else if (p_strRequestID == "11") // Get location.
   {
      processLocation(p_strValue);
   }
   else if (p_strRequestID == "13") // Internet availability.
   {
      checkInternetConnectivity(p_strValue);
   }

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function processLocation(p_strData)
{
   debug("processLocation: " + p_strData);
   if (p_strData == "1")
   {
      p_strData = "NA";
   }
   g_strGPSLocation = p_strData;

   debug("Location: " + g_strGPSLocation);

   getNativeRequest("13");
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function checkInternetConnectivity(p_strData)
{
   var l_strData;

   if(p_strData == "1")
   {
      g_intStage = 1;
   }
   else
   {
      g_intStage = 2;
   }

   debug("Internet: " + p_strData + ", " + g_intStage);

   prepareData(g_strRequestValue);
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function prepareData(p_strData)
{
   debug("prepareData: " + p_strData);
   debug("g_intStage: " + g_intStage);

   var l_strData;

   if (g_intStage == 1)
   {
      l_strData = p_strData + "|" + g_strDeviceID + "|" + g_strSessionID + "|" +  g_strEmail + "|" + g_strDisplayName + "|" + g_strGPSLocation;
      l_strData = '{"id": "18", "type": "K2", "data": "' + l_strData + '"}';
      l_strData = '{"id": "18", "type": "K2", "data": "GvUe1xeXL8Xa42zdKd4W6Q==|c34cd013fa3d4eef82f7936c9c29d95a|a61e5beab11d4a5c83dfce28491fab68|wlw9832@gmail.com|Wong Lee Wei|3.099210702272778|101.41102598183224"}';
   }
   else if(g_intStage == 2)
   {
      l_strData = '{"id": "19", "type": "K2", "data": "' + p_strData + '"}';
   }
   else if (g_intStage == 3)
   {
      var l_arryStrData = p_strData.split("|");

      g_intStage = 4;
      g_strStoreType = l_arryStrData[0];
      l_strData = g_strRequestValue + "|" + g_strDeviceID + "|" + g_strSessionID + "|" +  g_strEmail + "|" + g_strDisplayName + "|" + g_strGPSLocation;
      l_strData = '{"id": "18", "type": "K2", "data": "' + l_strData + '"}';
   }
   else if(g_intStage == 4)
   {
          p_strData = replaceAll(p_strData, "+", ":-:");
      l_strData = '{"id": "14", "type": "' + g_strStoreType + '", "data": "' + p_strData + '"}';
   }

   debug("Prepare: " + l_strData + ", " + g_intStage);

   getJsonNativeRequest(l_strData);
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function getJsonNativeRequest(p_strRequestData)
{
	  window.ReactNativeWebView.postMessage(p_strRequestData);
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function nativeCallback
   else if (p_strRequestID == "18") // Encrypt.
   {
      if (g_intStage == 1)
      {
         submitQR(p_strValue);
      }
      else if (g_intStage == 4)
      {
         prepareData(p_strValue);
      }
   }


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

scanStartEnd
   "https://www.silverlakemobility.com/plugins/WebPlugIn?type=1-1&action=" + p_intAction + "&qrEventID=" + p_intQREventID;

submitQR
   "https://www.silverlakemobility.com/plugins/WebPlugIn?type=1&data=" + p_strData;

processCTemperatureRecording
   "https://www.silverlakemobility.com/plugins/WebPlugIn?type=16&data=" + p_strData + "&email=" + g_strEmail + "&cmnt_id=" + g_strCommunityID;

processUTARTemperatureRecording
   "https://www.silverlakemobility.com/plugins/WebPlugIn?type=13&data=" + p_strData + "&email=" + g_strEmail + "&cmnt_id=" + g_strCommunityID;

processUTARVisitorRecording
   "https://www.silverlakemobility.com/plugins/WebPlugIn?type=133&data=" + p_strData + "&email=" + g_strEmail + "&cmnt_id=" + g_strCommunityID;

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

submitForm()
   "https://www.silverlakemobility.com/plugins/WebPlugIn?type=" + l_strType + "&data=" + encodeURI(g_strVenue) + "&venueID=" + g_intVenueID + 
                     "&email=" + g_strEmail;
   
   "https://www.silverlakemobility.com/plugins/WebPlugIn?type=" + l_strType + "&data=" + encodeURI(l_txtCallBackData.value + ":-:" +
                     l_strValue + ":-:" + "") + " :-:&email=" + g_strEmail;


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

retrieveTemperatureHistoryRecord
   "https://www.silverlakemobility.com/plugins/WebPlugIn?type=5&email=" + g_strEmail;

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

QRCz4EKO45nJFoev1rp4pDUig==

QRChSiJpBIcBFFMPGRgXWckfA==

l_strData = '{"id": "18", "type": "K2", "data": "GvUe1xeXL8Xa42zdKd4W6Q==|c34cd013fa3d4eef82f7936c9c29d95a|a61e5beab11d4a5c83dfce28491fab68|wlw9832@gmail.com|Wong Lee Wei|3.099210702272778|101.41102598183224"}';
hSiJpBIcBFFMPGRgXWckfA==|NA|NA|fongyoong8@gmail.com|Fong Chien Yoong|NA|NA