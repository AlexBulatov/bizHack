import React, {Component, Fragment} from 'react'
import Header from "../header";

class Employer extends Component {
    render() {
        return (
            <Fragment>
                <Header role={"работодателя"}/>
                <div className="container-fluid mt-3 pl-4 pr-4">
                    <div className="row">
                        <table className="table mt-3 text-center">
                            <thead className="thead-light">
                            <tr className="d-flex">
                                <th className="col">Налёт часов
                                    <button className="font-awesome-button" data-toggle="modal"
                                            data-target="#editFacility"><i className="fas fa-pencil-alt"> </i>
                                    </button>
                                </th>
                                <th className="col">Кол-во календарных дней дополнительного отпуска</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="d-flex">
                                <td className="col">от 25:00:00 до 30:00:00 часов</td>
                                <td className="col">7</td>
                            </tr>
                            <tr className="d-flex">
                                <td className="col">от 50:01:00 до 100:00:00 часов</td>
                                <td className="col">14</td>
                            </tr>
                            <tr className="d-flex">
                                <td className="col">от 100:01:00 до 150:00:00 часов</td>
                                <td className="col">21</td>
                            </tr>
                            <tr className="d-flex">
                                <td className="col">от 150:01:00 до 200:00:00 часов</td>
                                <td className="col">28</td>
                            </tr>
                            <tr className="d-flex">
                                <td className="col">от 200:01:00 до 250:00:00 часов</td>
                                <td className="col">36</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </Fragment>
        );
    }
}

export default Employer
