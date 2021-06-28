import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import StartUp from '../../screens/startUp';
import UserLogin from '../../screens/userLogin';
import OrgLogin from '../../screens/orgLogin';

const screens = {
    OrgLogin: {
        screen: OrgLogin
    },
    UserLogin: {
        screen: UserLogin
    },
    StartUp: {
        screen: StartUp
    }
}

const HomeStack = createStackNavigator(screens);

export default NavigationContainer(HomeStack);