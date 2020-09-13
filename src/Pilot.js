//Phần 1: các Import
import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

//import './Compare.css';
import axios from 'axios';

class Pilot extends Component {

//Phần 2: các State
  state = {
    namePilot: '',
    evaPilot: '',
    genderPilot: '',
    lovePilot: '',
    ketQuaPilot:[
      {name: '', eva: '', gender: '', love: ''}
    ]
  }

//Phần 3: các Function
  componentDidMount() {
    axios.get('http://192.168.1.20:5000/eva/pilots')
    .then(response => {
      this.setState({ketQuaPilot: response.data });
    })
  }

  xoa(id){
    // alert('xóa ' + id)
    axios.get('http://192.168.1.20:5000/eva/pilots/xoa?id=' + id)
    .then(response => {
      this.setState({ketQuaPilot: response.data});
    })
  }

  onChangeNamePilot = (e, { value }) => {
    this.setState({
      namePilot: value
    });
  }
  onChangeEvaPilot = (e, { value }) => {
    this.setState({
      evaPilot: value
    });
  }
  onChangeGenderPilot = (e, { value }) => {
    this.setState({
      genderPilot: value
    });
  }
  onChangeLovePilot = (e, { value }) => {
    this.setState({
      lovePilot: value
    });
  }

  taoMoi = () => {
    const newPilot = {
      name: this.state.namePilot,
      eva: this.state.evaPilot,
      gender: this.state.genderPilot,
      love: this.state.lovePilot,
    };
    axios.post('http://192.168.1.20:5000/eva/pilot/add', newPilot)
    .then(res => console.log(res.data))
    this.setState({
      namePilot: '',
      evaPilot: '',
      genderPilot: '',
      lovePilot: '',
    })
  }

  render() {
    const { ketQuaPilot } = this.state

    return (
      <div className="Pilot">
        <p>
          <br/>
          {ketQuaPilot.map((moiPilot) => 
            <div>
              Tên của phi công là: {moiPilot.name}
              <br/>
              người máy: {moiPilot.eva}
              <br/>
              giới tính: {moiPilot.gender}
              <br/>
              người yêu: {moiPilot.love}
              <br/>
              <Button onClick={() => this.xoa(moiPilot._id)}>X</Button>
              <br/><br/>
            </div>
          )}
        </p>
        <br/>
        
        <Form>
          name: <Form.Input inline
          value={this.state.namePilot}
          onChange={this.onChangeNamePilot}
          />
          eva: <Form.Input inline
          value={this.state.evaPilot}
          onChange={this.onChangeEvaPilot}
          />
          gender: <Form.Input inline
          value={this.state.genderPilot}
          onChange={this.onChangeGenderPilot}
          />
          love: <Form.Input inline
          value={this.state.lovePilot}
          onChange={this.onChangeLovePilot}
          />
        </Form>

        <Button onClick={this.taoMoi} >thêm pilot</Button>

        <br/><br/><br/>
        
      </div>
    )
  }
}
export default Pilot;