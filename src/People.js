//Phần 1: các Import
import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

//import './Compare.css';
import axios from 'axios';

class People extends Component {

//Phần 2: các State
  state = {
    namePeople: '',
    genderPeople: '',
    lovePeople: '',
    ketQuaPeople:[
      {name: '', gender: '', love: ''}
    ]
  }

//Phần 3: các Function
  componentDidMount() {
    axios.get('http://192.168.1.20:5000/eva/people')
    .then(response => {
      this.setState({ketQuaPeople: response.data});
    })
  }

  xoa(id){
    // alert('xóa ' + id)
    axios.get('http://192.168.1.20:5000/eva/people/xoa?id=' + id)
    .then(response => {
      this.setState({ketQuaPeople: response.data});
    })
  }

  onChangeNamePeople = (e, { value }) => {
    this.setState({
      namePeople: value
    });
  }
  onChangeGenderPeople = (e, { value }) => {
    this.setState({
      genderPeople: value
    });
  }
  onChangeLovePeople = (e, { value }) => {
    this.setState({
      lovePeople: value
    });
  }



  taoMoi = () => {
    const newPeople = {
      name: this.state.namePilot,
      gender: this.state.genderPilot,
      love: this.state.lovePilot,
    };
    axios.post('http://192.168.1.20:5000/eva/people/add', newPeople)
    .then(res => console.log(res.data))
    this.setState({
      namePilot: '',
      evaPilot: '',
      genderPilot: '',
      lovePilot: '',
    })
  }

  render() {
    const { ketQuaPeople } = this.state

    return (
      <div className="People">
        <p>
          People
          <br/>
          {ketQuaPeople.map((moiPeople) => 
            <div>
              Tên: {moiPeople.name}
              <br/>
              thới tính: {moiPeople.gender}
              <br/>
              người yêu: {moiPeople.love}
              <br/>
              <Button onClick={() => this.xoa(moiPeople._id)}>X</Button>
              <br/><br/>
            </div>
          )}
        </p>
        <br/>
        
        <Form>
          name: <Form.Input inline
          value={this.state.namePeople}
          onChange={this.onChangeNamePeople}
          />
          gender: <Form.Input inline
          value={this.state.genderPeople}
          onChange={this.onChangeGenderPeople}
          />
          love: <Form.Input inline
          value={this.state.lovePeople}
          onChange={this.onChangeLovePeople}
          />
        </Form>

        <Button onClick={this.taoMoi} >thêm people</Button>

        <br/><br/><br/>

      </div>
    )
  }
}
export default People;