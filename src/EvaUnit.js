//Phần 1: các Import
import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

//import './Compare.css';
import axios from 'axios';

class EvaUnit extends Component {

//Phần 2: các State
  state = {
    nameEvaUnit: '',
    pilotEvaUnit: '',
    ketQuaEvaUnit:[
      {name: '', pilot: ''}
    ]
  }

//Phần 3: các Function
  componentDidMount() {
    axios.get('http://192.168.1.20:5000/eva/eva_units')
    .then(response => {
      this.setState({ketQuaEvaUnit: response.data});
    })
  }

  xoa(id){
    // alert('xóa ' + id)
    axios.get('http://192.168.1.20:5000/eva/xoa?id=' + id)
    .then(response => {
      this.setState({ketQuaEvaUnit: response.data});
    })
  }

  onChangeNameEvaUnit = (e, { value }) => {
    this.setState({
      nameEvaUnit: value
    });
  }
  onChangePilotEvaUnit = (e, { value }) => {
    this.setState({
      pilotEvaUnit: value
    });
  }

  taoMoi = () => {
    const newEvaUnit = {
      name: this.state.nameEvaUnit,
      pilot: this.state.pilotEvaUnit,
    };

    axios.post('http://192.168.1.20:5000/eva/evaUnit/add', newEvaUnit)
    // .then(res => console.log(res.data))
        .then(res => {
          this.setState({ketQuaEvaUnit: res.data});
        })
    
    this.setState({
      nameEvaUnit: '',
      pilotEvaUnit: '',
    })
  }

  render() {
    const { ketQuaEvaUnit } = this.state

    return (
      <div className="EvaUnit">
        <p>
          <br/>
          {ketQuaEvaUnit.map((moiEvaUnit) => 
            <div>
              tên của người máy là: {moiEvaUnit.name}
              <br/>
              Phi công lái người máy là: {moiEvaUnit.pilot}
              <br/>
              <Button onClick={() => this.xoa(moiEvaUnit._id)}>X</Button>
              <br/><br/>
            </div>
          )}
        </p>
        <br/>
        
        <Form>
          name: <Form.Input inline
          value={this.state.nameEvaUnit}
          onChange={this.onChangeNameEvaUnit}
          />
          pilot: <Form.Input inline
          value={this.state.pilotEvaUnit}
          onChange={this.onChangePilotEvaUnit}
          />
        </Form>

        <Button onClick={this.taoMoi} >thêm eva unit</Button>

        <br/><br/><br/>

      </div>
    )
  }
}
export default EvaUnit;