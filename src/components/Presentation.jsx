import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Table, Button, NavItem } from 'react-bootstrap';
var moment = require('moment');

class Presentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentation: props.presentation,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(time1) {
    console.log(this.state.presentation)

    this.state.presentation.times
      .forEach(time =>{
        console.log(time1)
        if(time.startTime === time1.startTime && time.endTime === time1.endTime) {
          switch (time1.selected) {
            case "Confirmed":
              time.selected = "Unselected";
              break;
            case "Selected":
              time.selected = "Unselected";
              break;
            case "Unselected":
              time.selected = "Selected";
              break;
          }

        }
        return time;
      });

    this.setState({presentation: this.state.presentation})

  }


  render() {
    const { presentation } = this.state;


    return (
      <Panel>

        <Row>
          {/* Name of school, date and address */}
          <Col xs={6}>
            <h5 style={{textAlign: 'left', fontWeight: '700', marginBottom: '0px', marginLeft: '10px'}}> {presentation.name} </h5>
            <p style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: '12px', marginLeft: '10px'}}> {presentation.address} </p>
          </Col>
          <Col xs={6}>
            <h6 style={{textAlign: 'right', fontWeight: '700', marginRight: '10px'}}> {presentation.date} </h6>
          </Col>
        </Row>

        <Row>
          <Col xs={1}></Col>
          <Col xs={10}>
            <Table className="table table-sm presentationsTable">
              <thead>
              <tr style={{textAlign:'center'}}>
                <th scope="col" style={{textAlign:'center'}}>Icon</th>
                <th scope="col" style={{textAlign:'center'}}>Status</th>
                <th scope="col" style={{textAlign:'center'}}>Time</th>
                <th scope="col" style={{textAlign:'center'}}>Availability</th>
              </tr>
              </thead>

              <tbody style={{ fontSize: '11px'}}>
              {
                presentation.times.map(time => {
                  return (
                    <tr>
                      <td> WTF </td>
                      {/*{*/}
                        {/*if (time.selected === "Confirmed") {*/}
                          {/*<td  onClick={this.handleClick(time)}> Confirmed </td>*/}
                        {/*} else if (time.selected === "Unselected"){*/}
                          {/*<td  onClick={this.handleClick(time)}> Unselected </td>*/}
                        {/*} else {*/}
                          {/*<td  onClick={this.handleClick(time)}> Selected </td>*/}
                        {/*}*/}
                      {/*}*/}
                      <td onClick={() => this.handleClick(time)}> {time.selected}</td>
                      <td> {moment(time.startTime,"hh:mm:ss").format("h:mm a")} - {moment(time.endTime, "hh:mm:ss").format("h:mm a")} </td>
                      <td> {time.capacity} </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </Table>

          </Col>
          <Col xs={1}></Col>
        </Row> {/* End of table */}

      </Panel>
    );
  }

}


export default Presentation;
