import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CreateInfoScreen from '../screens/CreateInfoScreen';
import PPPScreen from '../screens/PPPScreen';
import QueryModifyScreen from '../screens/QueryModifyScreen';
import StatAnalysisScreen from '../screens/StatAnalysisScreen';
import { textAlign } from '@mui/system';

const Tab = createBottomTabNavigator();


/* 我要做浮起來的 Tab Navigation Button (add 那個)*/
const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 80,
            height: 80,
            borderRadius: 35,
            backgroundColor: '#FF6666'
        }}
        >
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/icons/user.png')}
                            resizeMode='contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                            style={{
                                paddingTop: 2,
                                color: focused ? '#e32f45' : '#748c94',
                                fontSize: 8,
                                textAlign: 'center'
                            }}>個人主頁</Text>
                    </View>
                ),
                headerShown: false  // 把導航列的標題隱藏
            }} />
            <Tab.Screen name="CreateInfo" component={CreateInfoScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/icons/basketball.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                            style={{
                                paddingTop: 8,
                                color: focused ? '#e32f45' : '#748c94',
                                fontSize: 8,
                                textAlign: 'center'
                            }}>新增資訊</Text>
                    </View>
                ),
                headerShown: false  // 把導航列的標題隱藏
            }} />
            <Tab.Screen name="PPP" component={PPPScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../assets/icons/add.png')}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30,
                            top: -3,
                            tintColor: '#ffffff'
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                ),
                headerShown: false  // 把導航列的標題隱藏
            }} />
            <Tab.Screen name="QueryModify" component={QueryModifyScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/icons/search.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                            style={{
                                paddingTop: 8,
                                color: focused ? '#e32f45' : '#748c94',
                                fontSize: 8,
                                textAlign: 'center'
                            }}>查詢修改</Text>
                    </View>
                ),
                headerShown: false  // 把導航列的標題隱藏
            }} />
            <Tab.Screen name="StatAnalysis" component={StatAnalysisScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/icons/statistics.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                            style={{
                                paddingTop: 8,
                                color: focused ? '#e32f45' : '#748c94',
                                fontSize: 8,
                                textAlign: 'center'
                            }}>情蒐報表</Text>
                    </View>
                ),
                headerShown: false  // 把導航列的標題隱藏
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 5

    }
});


export default Tabs;

