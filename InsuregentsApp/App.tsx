/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { useColorScheme, StatusBar, PermissionsAndroid, Platform, StyleSheet, View, Button, Text, ActivityIndicator, ScrollView } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import GoogleFit, { Scopes } from 'react-native-google-fit';
import React, { useState, useEffect } from 'react';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();


const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [steps, setSteps] = useState<number | null>(null);

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
    ],
  };



useEffect(() => {


    const fetchSteps = async () => {
      try {
        if (Platform.OS === 'android' && Platform.Version >= 29) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
            {
              title: 'Activity Recognition Permission',
              message: 'This app needs access to your physical activity to count steps.',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setError('Activity Recognition permission denied');
            setSteps(null);
            return;
          }
        }

        const authResult = await GoogleFit.authorize(options);


        if (authResult.success) {


          const start = new Date();
          start.setHours(0, 0, 0, 0);
          const end = new Date();


          const res = await GoogleFit.getDailyStepCountSamples({
            startDate: start.toISOString(),
            endDate: end.toISOString(),
          });

setSteps(JSON.stringify(res));

        }
      } catch (e) {
        setError(e.message);
        setSteps(null);
      }
    };
    if (Platform.OS === 'android') {

      fetchSteps();
    }
  }, []);


      const postData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('http://10.0.2.2:14002/v2/quotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJraWQiOiJYQ0JYRlBEUXRwUUNhaUFBN3VGV3lsMG94VlhPTkp0WGF6SmdkckEwMXNRIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjAzQjlDa0p3clF3M3NKcU9DMm9lZFRMSExfR2dId3FQS2g3ZnFQUVF6MFUiLCJpc3MiOiJodHRwczovL2lwdGlxLWxuaC1lbWVhLm9rdGFwcmV2aWV3LmNvbS9vYXV0aDIvYXVzM2N0aW91Y2FBTnBtc2oweDciLCJhdWQiOiJhcGk6Ly90YW5ncmFtIiwiaWF0IjoxNzU2NDQ4Mzc4LCJleHAiOjE3NTY1MzQ3NzgsImNpZCI6IjBvYXYybzB6ZDU4WjdsaE40MHg2Iiwic2NwIjpbInRhbmdyYW0udW5kZXJ3cml0aW5nLnJlYWQiLCJ0YW5ncmFtLnVuZGVyd3JpdGluZy5tYW5hZ2UiLCJ0YW5ncmFtLmRvY3VtZW50cy5hZG1pbmlzdHJhdGlvbiIsInRhbmdyYW0uY29udGFjdEhpc3RvcnkubWFuYWdlIiwidGFuZ3JhbS51c2VyIiwidGFuZ3JhbS5wb2xpY3lTZXF1ZW5jZS5yZWFkIiwidGFuZ3JhbS5yZXBvcnRzLmNvbnRyb2wucmVhZCIsInRhbmdyYW0uY2FsY3VsYXRpb25zLm1hbmFnZSIsInRhbmdyYW0uY2FsY3VsYXRpb25zLnJlYWQiLCJ0YW5ncmFtLmRvY3VtZW50cy5tYW5hZ2UiLCJ0YW5ncmFtLnBhcnRpZXMudXBkYXRlIiwidGFuZ3JhbS5wcm9kdWN0cy5tYW5hZ2UiLCJ0YW5ncmFtLndvcmtmbG93cy5tYW5hZ2UiLCJ0YW5ncmFtLnJlcG9ydHMuc2FsZXMucmVhZCIsInRhbmdyYW0uY29tcGxpYW5jZS5hZG1pbmlzdHJhdGlvbiIsInRhbmdyYW0uZGlzdHJpYnV0aW9uUGFydG5lcnNBY2NvdW50cy5yZWFkIiwidGFuZ3JhbS5wb2xpY3lVbmRlcndyaXRpbmdzLnJlYWQiLCJ0YW5ncmFtLmRpc3RyaWJ1dGlvblBhcnRuZXJzLnJlYWQiLCJ0YW5ncmFtLmNvbnRhY3RzLnJlYWQiLCJ0YW5ncmFtLnBvbGljeVNlcXVlbmNlLm1hbmFnZSIsInRhbmdyYW0uY2xhaW0ubWFuYWdlIiwidGFuZ3JhbS5jb21wYW5pZXMucmVhZCIsInRhbmdyYW0ucmVwb3J0cy5jb21taXNzaW9ucy5yZWFkIiwidGFuZ3JhbS5wZXJzb25zLnJlYWQiLCJ0YW5ncmFtLnBvbGljeS5tYW5hZ2UiLCJ0YW5ncmFtLnByb2R1Y3RDb25zZW50cy5yZWFkIiwidGFuZ3JhbS5tZW1iZXJOdW1iZXIubWFuYWdlIiwidGFuZ3JhbS5wYXJ0aWVzLm1hbmFnZSIsInRhbmdyYW0uZGV2b3BzIiwidGFuZ3JhbS5wb2xpY3lDYW5jZWxsYXRpb24ucmVhZCIsInRhbmdyYW0ucHJvZHVjdENvbnNlbnRzLm1hbmFnZSIsInRhbmdyYW0ucGF5bWVudHMubWFuYWdlIiwidGFuZ3JhbS5wb2xpY3lVbmRlcndyaXRpbmdzLm1hbmFnZSIsInRhbmdyYW0uY2xhaW0ucmVhZCIsInRhbmdyYW0ucHJvY2Vzcy5zZXJ2aWNlUmVxdWVzdC5hbGwucmVhZCIsInRhbmdyYW0uZGlzdHJpYnV0aW9uUGFydG5lcnMubWFuYWdlIiwidGFuZ3JhbS5wb2xpY3kucmVhZCIsInRhbmdyYW0ucHJvZHVjdHMucmVhZCIsInRhbmdyYW0uZG9jdW1lbnRzLnJlYWQiLCJ0YW5ncmFtLndvcmtmbG93cy5yZWFkIiwidGFuZ3JhbS5wcm9jZXNzLnNlcnZpY2VSZXF1ZXN0LmFsbC53cml0ZSIsInRhbmdyYW0uY29udGFjdEhpc3RvcnkucmVhZCIsInRhbmdyYW0ucGF5bWVudHMuZmluYW5jZS5tYW5hZ2UiLCJ0YW5ncmFtLnBheW1lbnRzLnJlYWQiXSwic3ViIjoiMG9hdjJvMHpkNThaN2xoTjQweDYiLCJjYXJyaWVyIjpbXSwicGFydG5lcnMiOlsiYXNmIiwiY2FuZGlkX3BvbGx5IiwiY2FuZGlkX3RvbSIsImNhbmRpZF93aW5zdG9uIiwiY2hlY2syNCIsImNoZWNrMjR3b2wiLCJkZWdlbmlhIiwiZGVnZW5pYV9jMjQiLCJnbGQiLCJpbmNob3JhIiwiaXB0aXFfbGlmZSIsImlyZXNzIiwibGF5YSIsIm5vdmVtYmVyIiwicmVhc3N1cmVkIiwicmVkIiwic2FuZGJveF8xIiwic2FuZGJveF8yIiwic2FuZGJveF8zIiwic3VubGlmZSIsInNtYXJ0ZXJjb3Zlcl9kYWRzdXJhbmNlIiwic21hcnRlcmNvdmVyX2dldHByb3RlY3RlZCIsInNtYXJ0ZXJjb3Zlcl9nd29sIiwic21hcnRlcmNvdmVyX211bXN1cmFuY2UiLCJzdGFyX3Byb3RlY3QiLCJ2ZXJ0aSIsInp1cmljaF9vbmxpbmUiXSwicm9sZXMiOlsicG9saWN5YWRtaW5pc3RyYXRvciIsIm1vY2t1cF9pbnRlZ3JhdGlvbl9yb2xlX3Rlc3QiLCJjYWxsY2VudGVyYWdlbnQiXSwidGVtcGxhdGVfcm9sZXMiOlsiYXNmIiwiY2FuZGlkX3BvbGx5IiwiY2FuZGlkX3RvbSIsImNhbmRpZF93aW5zdG9uIiwiY2hlY2syNCIsImNoZWNrMjR3b2wiLCJkZWdlbmlhIiwiZGVnZW5pYV9jMjQiLCJnbGQiLCJpbmNob3JhIiwiaXB0aXFfbGlmZSIsImlyZXNzIiwibGF5YSIsIm5vdmVtYmVyIiwicmVhc3N1cmVkIiwicmVkIiwic2FuZGJveF8xIiwic2FuZGJveF8yIiwic2FuZGJveF8zIiwic3VubGlmZSIsInNtYXJ0ZXJjb3Zlcl9kYWRzdXJhbmNlIiwic21hcnRlcmNvdmVyX2dldHByb3RlY3RlZCIsInNtYXJ0ZXJjb3Zlcl9nd29sIiwic21hcnRlcmNvdmVyX211bXN1cmFuY2UiLCJzdGFyX3Byb3RlY3QiLCJ2ZXJ0aSIsInp1cmljaF9vbmxpbmUiXSwiZ3JvdXBzIjp7fSwiYW5vbnltb3VzIjpbXSwiZmxvdyI6W10sImp1cmlzZGljdGlvbnMiOlsiY2FuIiwiY2hlIiwiZGV1IiwiZ2JyIiwiaXJsIl19.V8qybsNPT6BzXVw0C64wTyJl5_qZltyVPDnm07PGqQYJ1rNjIp3PdS2eKWlkHIkFHwx0MkMQS0ftqZRy4UhJ22021CF4jLpAx4kE8w0R3TraguqTEgPfAbSvKF3iaH5fvmqfI5QNoHLO5_-GauH7FSJD_MxHBGi6nd9GUp-xi2D570TFlV4aPcM4I8xdXQOG19XoeP5ujHbA-9T2V4O-O1rYMl04aZVPPSOyP4rTDsvEbcq0RjFrerYFZEcLlJ7oOfu45pQhfXzNNWHM0SBDAu_TNHB_ykuX5c3PWWdoI8hQGjpcZxJlYEVdQtbyq-hR86GgDi57j43jWDOFUF4EIg'
                },
            body: `{
                                                      "meta": {
                                                        "transient": true,
                                                        "locale": "en-EN"
                                                      },
                                                      "payload": {
                                                        "channel": "CALL_CENTRE",
                                                        "quoteDate": "2025-05-01",
                                                        "requestDate": "2025-05-01",
                                                        "type": "QUICK_QUOTE",
                                                        "productId": "86f4e985-2157-4c6b-84d3-a90d16585102",
                                                        "selectedBenefits": [
                                                          {
                                                            "benefitId": "5a4b8635-332d-4f85-b18e-7b9833627d3f",
                                                            "coverTermYears": 5,
                                                            "coverType": "INDEXING",
                                                            "sumAssuredBaseInitial": 300000,
                                                            "initialCommissionSacrificeRate": 0.0,
                                                            "scalingAdjustmentRate": 0.75,
                                                            "lifeType": "SINGLE",
                                                            "lives": [
                                                              {
                                                                "birthDate": "1969-05-17",
                                                                "smokerStatus": "Smoker",
                                                                "permanentPercentageRating": 0.5,
                                                                "permanentPerMileRating": 0.001
                                                              }
                                                            ]
                                                          }
                                                        ],
                                                        "effectiveDate": "2025-05-01",
                                                        "premiumFrequency": "MONTHLY"
                                                      }
                                                    }`,
          });
      let data = await response.json();
      const finalPremium = data.policy?.vectors?.[0]?.finalPremium;
            setResult(finalPremium);
        } catch (err: any) {
          setError(err.stack);
        } finally {
          setLoading(false);
        }
      };

  return (
    <View style={styles.container}>

<View style={{ flex: 1, paddingTop: 64, padding: 16}}>


      <Text style= {{color: 'white' }}>Today's steps: {steps ?? 'N/A'}</Text>
</View>

    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Post to API" onPress={postData} />
      {loading && <ActivityIndicator />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {result && (
        <ScrollView style={{ marginTop: 16 }}>
          <Text selectable style={{ fontFamily: 'monospace' }}>
            {JSON.stringify(result, null, 2)}
          </Text>
        </ScrollView>
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
