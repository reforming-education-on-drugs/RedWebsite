import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Table, Button, NavItem } from 'react-bootstrap';
var moment = require('moment');

class Presentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentation: props.presentation,
    };

    this.getStatusColor = this.getStatusColor.bind(this);
    this.getStatusIcon = this.getStatusIcon.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getStatusColor(status) {
    switch(status){
      case "Confirmed":
      return "green";
      break;
    case "Selected":
      return "orange";
      break;
    case "Unselected":
      return "black";
      break;
    }
  }

  getStatusIcon(status) {
    switch(status){
      case "Confirmed":
      return "glyphicon glyphicon-check";
      break;
      case "Selected":
      return "glyphicon glyphicon-check";
      break;
      case "Unselected":
      return "glyphicon glyphicon-unchecked"
    }
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
              --time.enrolled;
              time.selected = "Unselected";
              break;
            case "Unselected":
              ++time.enrolled;
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
              <tr style={{textAlign:'center', fontSize: '12px'}}>
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
                    <tr style={{color: this.getStatusColor(time.selected)}} onClick={() => this.handleClick(time)}>
                      <td className={this.getStatusIcon(time.selected)} style={{top:'0px', display: 'table-cell'}}> </td>
                      <td> {time.selected}</td>
                      <td> {moment(time.startTime,"hh:mm:ss").format("h:mm a")} - {moment(time.endTime, "hh:mm:ss").format("h:mm a")} </td>
                      <td> {time.enrolled} / {time.capacity} </td>
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
