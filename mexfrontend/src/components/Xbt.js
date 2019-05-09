import React, { Component } from 'react';
import { Button, Table, Icon, Segment, Grid } from 'semantic-ui-react'
import tradeActions from '../redux/actions/tradeActions';
import { connect } from "react-redux";
import Spinner from './Spinner'

class Xbt extends Component {
    state = {
        trades: [{}],
        hourlyBuys: [{}],
        hourlySells: [{}],
        dailyBuys: [{}],
        dailySells: [{}],
        hourlyBuysTotal: 0,
        hourlySellsTotal: 0,
        dailyBuysTotal: 0,
        dailySellsTotal: 0
    }

    componentDidMount() {
        let _hourlyBuys = [{}]
        let _hourlySells = [{}]
        let _dailyBuys = [{}]
        let _dailySells = [{}]

        let _hourlyBuysTotal = 0, _hourlySellsTotal = 0, _dailyBuysTotal = 0, _dailySellsTotal = 0;

        let today = new Date()
        let buildSearchStartDate, buildSearchEndDate, buildSearchDate;
        let todaymonth, todayday;

        if (today.getUTCDate() < 10) {
            todayday = '0' + today.getUTCDate();
        } else {
            todayday = today.getUTCDate();
        }

        if (today.getUTCMonth() < 10) {
            todaymonth = '0' + (today.getUTCMonth() + 1)
        }
        else {
            todaymonth = (today.getUTCMonth() + 1);
        }

        buildSearchDate = today.getFullYear() + '-' + todaymonth + '-' + todayday
        this.props.startLoadingTrades(buildSearchDate, buildSearchDate).then((data) => {
            for (let trade in data.payload.rows) {
                let currTrade = data.payload.rows[trade].doc;
                let tradeDate = new Date(currTrade.timestamp)

                if (currTrade.side === 'Buy' && currTrade.size > 500000) {
                    _dailyBuys.push(currTrade)
                    _dailyBuysTotal += currTrade.size
                }

                if (currTrade.side === 'Sell' && currTrade.size > 500000) {
                    _dailySells.push(currTrade)
                    _dailySellsTotal += currTrade.size
                }

                if (this.checkBetween60Minutes(today.toUTCString(), tradeDate)) {
                    switch (currTrade.side) {
                        case "Buy":
                            _hourlyBuys.push(currTrade)
                            _hourlyBuysTotal += currTrade.size
                            break;
                        case "Sell":
                            _hourlySells.push(currTrade)
                            _hourlySellsTotal += currTrade.size
                            break;
                        default:
                            console.log("side == ??")
                    }
                }

            }
            _dailyBuys.shift();
            _dailySells.shift();
            _hourlyBuys.shift();
            _hourlySells.shift();

            _dailyBuys.reverse();
            _dailySells.reverse();
            _hourlyBuys.reverse();
            _hourlySells.reverse();

            this.setState({
                dailyBuys: _dailyBuys,
                dailySells: _dailySells,
                hourlyBuys: _hourlyBuys,
                hourlySells: _hourlySells,
                dailyBuysTotal: _dailyBuysTotal,
                dailySellsTotal: _dailySellsTotal,
                hourlyBuysTotal: _hourlyBuysTotal,
                hourlySellsTotal: _hourlySellsTotal
            })
        })

    }

    showDateToHumanInHoursAndMinutes(date) {
        let nDate = new Date(date)
        let h, m;
        h = nDate.getHours();
        m = nDate.getMinutes();
        if (h < 10)
            h = '0' + h

        if (m < 10)
            m = '0' + m
        return h + ':' + m
    }

    numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    checkBetween60Minutes(d1, d2) {
        let ret = false;
        let date1 = new Date(d1);
        let date2 = new Date(d2)
        let difference = date1.getTime() - date2.getTime();
        if (Math.round(difference / 60000) <= 60)
            ret = true;

        return ret;
    }

    render() {


        const SegXbtLoop = (props, key) => (
            <Segment.Group>
                {props.object.side === "Buy" ? (
                    <Segment inverted color="green"> <div className="divSameHeight"><p><Icon name="caret up"></Icon>{props.object.price}$</p> <p>{this.numberWithCommas(props.object.size)}</p> </div></Segment>
                ) : (
                        <Segment inverted color="red"> <div className="divSameHeight"><p><Icon name="caret down"></Icon> {props.object.price}$</p> <p>{this.numberWithCommas(props.object.size)}</p> </div></Segment>
                    )}
                <Segment><Icon name="clock"></Icon>{this.showDateToHumanInHoursAndMinutes(props.object.timestamp)}</Segment>
            </Segment.Group>

        )



        let { dailyBuys, dailySells, hourlyBuys, hourlySells, dailyBuysTotal, dailySellsTotal, hourlyBuysTotal, hourlySellsTotal } = this.state
        if (!this.props.isTradingLoading && dailyBuys.length !== 1) {
            console.log(hourlyBuys)
            return (
                <React.Fragment>
                    <div className="content">

                        <Grid columns={4} divided padded>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="whitebackground">
                                        <Segment.Group>
                                            <Segment color="green" ><h4>Daily buys &nbsp;&nbsp;&nbsp;>500.000</h4>
                                                <div className="divSameHeightTitle">
                                                    <p>{this.numberWithCommas(dailyBuys.length)}&nbsp;rows</p>
                                                    <p> Total&nbsp;{this.numberWithCommas(dailyBuysTotal)}$</p>
                                                </div>
                                            </Segment>
                                            <Segment.Group>
                                                {dailyBuys.map((object, key) => (
                                                    <SegXbtLoop object={object} key={key}></SegXbtLoop>

                                                )
                                                )}
                                            </Segment.Group>
                                        </Segment.Group>
                                    </div>

                                </Grid.Column>
                                <Grid.Column>
                                    <div className="whitebackground">
                                        <Segment.Group>
                                            <Segment color="red" ><h4>Daily Sells &nbsp;&nbsp;&nbsp;>500.000</h4>
                                                <div className="divSameHeightTitle">
                                                    <p>{this.numberWithCommas(dailySells.length)}&nbsp;rows</p>
                                                    <p> Total&nbsp;{this.numberWithCommas(dailySellsTotal)}$</p>
                                                </div>
                                            </Segment>
                                            <Segment.Group>
                                                {dailySells.map((object, key) => (
                                                    <SegXbtLoop object={object} key={key}></SegXbtLoop>

                                                )
                                                )}
                                            </Segment.Group>
                                        </Segment.Group>
                                    </div>

                                </Grid.Column>
                                <Grid.Column>
                                    <div className="whitebackground">
                                        <Segment.Group>
                                            <Segment color="green"><h4>Hourly buys &nbsp;&nbsp;&nbsp;>50.000</h4>
                                                <div className="divSameHeightTitle">
                                                    <p>{this.numberWithCommas(hourlyBuys.length)}&nbsp;rows</p>
                                                    <p> Total&nbsp;{this.numberWithCommas(hourlyBuysTotal)}$</p>
                                                </div>
                                            </Segment>
                                            <Segment.Group>
                                                {hourlyBuys.map((object, key) => (
                                                    <SegXbtLoop object={object} key={key}></SegXbtLoop>

                                                )
                                                )}
                                            </Segment.Group>
                                        </Segment.Group>
                                    </div>

                                </Grid.Column>
                                <Grid.Column>
                                    <div className="whitebackground">
                                        <Segment.Group>
                                            <Segment color="red"><h4>Hourly sells&nbsp;&nbsp;&nbsp;>50.000</h4>
                                                <div className="divSameHeightTitle">
                                                    <p>{this.numberWithCommas(hourlySells.length)}&nbsp;rows</p>
                                                    <p> Total&nbsp;{this.numberWithCommas(hourlySellsTotal)}$</p>
                                                </div>
                                            </Segment>
                                            <Segment.Group>
                                                {hourlySells.map((object, key) => (
                                                    <SegXbtLoop object={object} key={key}></SegXbtLoop>

                                                )
                                                )}
                                            </Segment.Group>
                                        </Segment.Group>
                                    </div>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>




                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <Spinner></Spinner>
            )
        }
    }
}
const mapStateToProps = (state) => ({
    trading: state.tradeReducer.trades,
    isTradingLoading: state.tradeReducer.isloading
});

const mapDispatchToProps = dispatch => ({
    startLoadingTrades: (startdate, enddate) => dispatch(tradeActions.loadTradesBetweenDate(startdate, enddate))
});


export default connect(mapStateToProps, mapDispatchToProps)(Xbt);