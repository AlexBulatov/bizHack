import React, {Component, Fragment} from 'react'
import * as allConst from '../../modules/const';
import Header from "../header";

class Pilot extends Component {
    state = {
        timeFly: "00:00:00",
        timeButton: "Начать полёт",
        flyscales: [],
        current_fly: "00:00:00"
    };

    handleClick = () => {
        if (this.state.timeButton === "Начать полёт") {
            this.setState({timeButton: "Завершить полёт"});
            let dateStart = new Date();
            this.update = setInterval(() => {
                let new_date = new Date() - dateStart;
                let sec = Math.abs(Math.floor(new_date / 1000) % 60); //sek
                let min = Math.abs(Math.floor(new_date / 1000 / 60) % 60); //min
                let hours = Math.abs(Math.floor(new_date / 1000 / 60 / 60) % 24); //hours
                if (sec.toString().length === 1) sec = '0' + sec;
                if (min.toString().length === 1) min = '0' + min;
                if (hours.toString().length === 1) hours = '0' + hours;
                this.setState({timeFly: `${hours}:${min}:${sec}`});
            }, 100);
        }
        if (this.state.timeButton === "Завершить полёт") {
            this.setState({timeButton: "Начать полёт"});
            clearInterval(this.update);
            this.setState({timeFly: "00:00:00"});
            let dateStop = new Date();
        }
    };

    componentDidMount() {
      fetch('/pilot/flyscale', {
        headers: {
          "x-auth-token": allConst.getCurrentUser().token
        },
        method: 'GET'
      }).then(data => {
        return data.json();
      }).then( data => {
        this.setState({flyscales: data});
      });

      fetch('/pilot/flynow', {
        headers: {
          "x-auth-token": allConst.getCurrentUser().token
        },
        method: 'GET'
      }).then(data => {
        return data.json();
      }).then( data => {
        this.setState({current_fly: `${data.hours||'00'}:${data.minutes||'00'}:${data.seconds||'00'}`});
      });
    }

  render() {
        return (
            <Fragment>
                <Header role={"пилота"}/>
                <div className="container-fluid mt-3 pl-4 pr-4">
                    <div className="row text-right">
                        <p className="col-10 time-fly">{this.state.timeFly}</p>
                        <button className="btn btn-outline-success col-2"
                                onClick={this.handleClick}>{this.state.timeButton}
                        </button>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <div className="col-10">
                                <div className="row">
                                    <p>Личный налёт:</p>
                                    <p className="ml-2">{this.state.current_fly}</p>
                                </div>

                                <div className="row">
                                    <div className="progress col pl-0 pr-0">
                                        <div className="progress-bar"
                                             role="progressbar"
                                             style={{width: `68%`}} aria-valuenow="50"
                                             aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 text-center font-weight-bold">Рейтинг пилотов</p>

                                <div className="row mt-3">
                                    <p className="col">Михайлов И.И.</p>
                                    <p className="text-right col">Общий налёт: 78:12:05</p>
                                </div>
                                <div className="row">
                                    <div className="progress col pl-0 pr-0">
                                        <div className="progress-bar bg-success"
                                             role="progressbar"
                                             style={{width: `78%`}} aria-valuenow="50"
                                             aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <p className="col">Турков М.И.</p>
                                    <p className="text-right col">Общий налёт: 68:15:05</p>
                                </div>
                                <div className="row">
                                    <div className="progress col pl-0 pr-0">
                                        <div className="progress-bar bg-success"
                                             role="progressbar"
                                             style={{width: `68%`}} aria-valuenow="50"
                                             aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <p className="col">Миронов В.А.</p>
                                    <p className="text-right col">Общий налёт: 100:10:03</p>
                                </div>
                                <div className="row">
                                    <div className="progress col pl-0 pr-0">
                                        <div className="progress-bar bg-success"
                                             role="progressbar"
                                             style={{width: `100%`}} aria-valuenow="50"
                                             aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <p className="col">Гервас Н.В.</p>
                                    <p className="text-right col">Общий налёт: 43:19:55</p>
                                </div>
                                <div className="row">
                                    <div className="progress col pl-0 pr-0">
                                        <div className="progress-bar bg-success"
                                             role="progressbar"
                                             style={{width: `43%`}} aria-valuenow="50"
                                             aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <p className="text-center font-weight-bold">Таблица шкал налёта</p>
                            <table className="table text-center col">
                                <thead className="thead-light">
                                <tr className="d-flex">
                                    <th className="col">Налёт часов</th>
                                    <th className="col">Кол-во календарных дней дополнительного отпуска</th>
                                </tr>
                                </thead>
                                <tbody>
                                  {this.state.flyscales.map(function(item){
                                    return (<tr className="d-flex">
                                      <td className="col">{item.hours}</td>
                                      <td className="col">{item.days}</td>
                                    </tr>);
                                  })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="mt-3 text-center font-weight-bold">Мои перелеты</p>
                    <div className="row">
                        <table className="table mt-1 text-center col">
                            <thead className="thead-light">
                            <tr className="d-flex">
                                <th className="col">Название рейса</th>
                                <th className="col">Время начала</th>
                                <th className="col">Время окончания</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="d-flex">
                                <td className="col">Новосибирск-Казань</td>
                                <td className="col">21 янв. 2018 01:02:45</td>
                                <td className="col">21 янв. 2018 04:02:45</td>
                            </tr>
                            <tr className="d-flex">
                                <td className="col">Москва-Новосибирск</td>
                                <td className="col">21 ноя. 2018 22:03:45</td>
                                <td className="col">21 ноя. 2018 02:02:45</td>
                            </tr>
                            <tr className="d-flex">
                                <td className="col">Новосибирск-Санкт-Петербург</td>
                                <td className="col">17 июл. 2019 05:08:45</td>
                                <td className="col">17 июл. 2019 09:09:45</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Pilot
