import React, {Component, Fragment} from 'react'
import * as allConst from '../../modules/const';
import Header from "../header";

class Employer extends Component {
    state = {
        flyscales: [],
    };

    componentDidMount() {
        let fly = fetch('/admin/', {
          headers: {
            "x-auth-token": allConst.getCurrentUser().token
          },
          method: 'GET'
        }).then(data => {
          return data.json();
        }).then( data => {
          this.setState({flyscales: data.flyscale});
        });
      }

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
            </Fragment>
        );
    }
}

export default Employer
