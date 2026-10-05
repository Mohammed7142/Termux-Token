import SettingsPro from './SettingsPro';
import Support from './Support';
import Analytics from './Analytics';
import Trading from './Trading';
import Security from './Security';
import History from './History';
import Wallet from './Wallet';
import React, { useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MainLayout from './MainLayout';
import { getHoldings, getCoinMarket } from '../stores/market/marketActions';
import { SIZES, FONTS, COLORS, icons, dummyData } from '../constants';
import BalanceInfo from '../components/BalanceInfo';
import IconTextButton from '../components/IconTextButton';

const Home = ({ getHoldings, getCoinMarket, myHoldings, navigation }) => {
    useFocusEffect(
        useCallback(() => {
            getHoldings(dummyData.holdings);
            getCoinMarket();
        }, [])
    );

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    let percChange = myHoldings.reduce((a, b) => a + (b.holding_change_percentage || 0), 0);

    return (
        <MainLayout>
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                {/* Balance Info Section */}
                <BalanceInfo
                    title="إجمالي الرصيد"
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containerStyle={{ marginTop: 50, paddingHorizontal: SIZES.padding }}
                />

                {/* Buttons Section (Transfer & Withdraw) */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginBottom: 15,
                        paddingHorizontal: SIZES.padding,
                    }}
                >
                    <IconTextButton
                        label="Transfer"
                        icon={icons.send}
                        containerStyle={{
                            flex: 1,
                            height: 50,
                            marginRight: SIZES.radius,
                        }}
                        onPress={() => navigation.navigate('Transfer')}
                    />
                    <IconTextButton
                        label="Withdraw"
                        icon={icons.withdraw}
                        containerStyle={{
                            flex: 1,
                            height: 50,
                            marginLeft: SIZES.radius,
                        }}
                        onPress={() => navigation.navigate('Withdraw')}
                    />
                </View>
            </View>
        </MainLayout>
    );
};

function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page));
        },
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
