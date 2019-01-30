import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Table, Button, NavItem, Modal } from 'react-bootstrap';
let moment = require('moment');

class Presentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentation: props.presentation,
      show: false,
      errorMsg: "",
    };

    this.getStatusColor = this.getStatusColor.bind(this);
    this.getStatusIcon = this.getStatusIcon.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getErrorIcon = this.getErrorIcon.bind(this);
    this.getErrorIconColor = this.getErrorIconColor.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
    case "Full":
      return "grey";
      break;
    }
  }

  getStatusIcon(status) {
    switch(status){
      case "Full":
      return "glyphicon glyphicon-ban-circle";
      break;
      case "Confirmed":
      return "glyphicon glyphicon-check";
      break;
      case "Selected":
      return "glyphicon glyphicon-check";
      break;
      case "Unselected":
      return "glyphicon glyphicon-unchecked";
    }
  }

  handleClick(time1) {
    console.log(this.state.presentation);

    this.state.presentation.times
      .forEach(time =>{
        console.log(time1);
        if(time.startTime === time1.startTime && time.endTime === time1.endTime) {
          switch (time1.selected) {
            case "Confirmed":
              --time.enrolled;
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

    this.setState({presentation: this.state.presentation});

  }

  getErrorIcon(error){
    if(error == "" || error === undefined){
      return "";
    } else {
      return "glyphicon glyphicon-info-sign";
    }
  }

  getErrorIconColor(error){
    if(error == "" || error === undefined){
      return "";
    } else {
      return "red";
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(err) {
    this.setState({ show: true });
    this.setState({ errorMsg: err });
  }

  render() {
    const { presentation } = this.state;


    return (

      <div>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.state.errorMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
          <Col xs={1} />
          <Col xs={10}>
            <Table className="table table-sm presentationsTable">
              <thead>
              <tr style={{textAlign:'center', fontSize: '12px'}}>
                <th scope="col" style={{textAlign:'center'}} />
                <th scope="col" style={{textAlign:'center'}}>Status</th>
                <th scope="col" style={{textAlign:'center'}}>Time</th>
                <th scope="col" style={{textAlign:'center'}}>Availability</th>
                <th scope="col" style={{textAlign:'center'}} />
              </tr>
              </thead>

              <tbody style={{ fontSize: '11px'}}>
              {
                presentation.times.map(time => {
                  return (
                    <tr style={{color: this.getStatusColor(time.selected), cursor: 'pointer'}}>
                      <td className={this.getStatusIcon(time.selected)} style={{top:'0px', display: 'table-cell'}} onClick={() => this.handleClick(time)} />
                      <td style={{textAlign: 'center'}} onClick={() => this.handleClick(time)}> {time.selected}</td>
                      <td style={{textAlign: 'center'}} onClick={() => this.handleClick(time)}> {moment(time.startTime,"hh:mm:ss").format("h:mm a")} - {moment(time.endTime, "hh:mm:ss").format("h:mm a")} </td>
                      <td style={{textAlign: 'center'}} onClick={() => this.handleClick(time)}> {time.enrolled} / {time.capacity} </td>
                      <td className={this.getErrorIcon(time.error)} style={{top:'0px', display: 'table-cell', zIndex:'1000', color: this.getErrorIconColor(time.error)}} onClick={() => this.handleShow(time.error)}> </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </Table>

          </Col>
          <Col xs={1} />
        </Row> {/* End of table */}

      </Panel>
      </div>
    );
  }

}


export default Presentation;
