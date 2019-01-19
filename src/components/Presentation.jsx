import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Table, Button, NavItem } from 'react-bootstrap';
var moment = require('moment');

class Presentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentation: props.presentation,
    };
  }

  handleClick ={
  };


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
                    <tr onClick={this.handleClick()}>
                      <td> WTF </td>
                      {
                        (() => {
                          if (time.selected === "Confirmed") {
                            return (<td> Confirmed </td>)
                          } else if (time.selected === "Unselected"){
                            return (<td> Unselected </td>)
                          } else {
                            return (<td> Selected </td>)
                            }
                         })()
                      }
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

function selectionState(time){
  if(time.selected === time.stateToBe){
    if(time.selected){
      //Green
    }else{
      //Unchcked
    }
  }else{

  }
}

export default Presentation;
