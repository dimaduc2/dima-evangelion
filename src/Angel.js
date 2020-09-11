//Phần 1: các Import
import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

//import './Compare.css';
import axios from 'axios';

class Angel extends Component {

//Phần 2: các State
  state = {
    nameAngel: '',
    numberAngel: '',
    ketQuaAngel:[
      {name: '', number: ''}
    ]
  }

//Phần 3: các Function
  componentDidMount() {
    axios.get('http://192.168.1.20:5000/eva/angel')
    .then(response => {
      this.setState({ketQuaAngel: response.data});
    })
  }

  xoa(id){
    // alert('xóa ' + id)
    axios.get('http://192.168.1.20:5000/eva/xoa?id=' + id)
    .then(response => {
      this.setState({ketQuaAngel: response.data});
    })
  }

  onChangeNameAngel = (e, { value }) => {
    this.setState({
      nameAngel: value
    });
  }
  onChangeNumberAngel = (e, { value }) => {
    this.setState({
      numberAngel: value
    });
  }

  hienThongBaoAngel = (thongBao) => {
    this.setState({
      ketQuaAdd: thongBao, 
    });
    console.log(thongBao)
  }

  taoMoi = () => {
    const newAngel = {
      name: this.state.nameAngel,
      number: this.state.numberAngel,
    };
    axios.post('http://192.168.1.20:5000/eva/angel/add', newAngel)    
    .then(res => console.log(res.data))
    this.setState({
      nameAngel: '',
      numberAngel: '',
    })
  }

  render() {
    const { ketQuaAngel } = this.state

    return (
      <div className="Angel">
        <p>
          <br/>
          {ketQuaAngel.map((moiAngel) => 
            <div>
              Name: {moiAngel.name}
              <br/>
              Number {moiAngel.number}
              <br/>
              <Button onClick={() => this.xoa(moiAngel._id)}>X</Button>
              <br/><br/>
          </div>
          )}
        </p>
        <br/>
        
        <Form>
          name: <Form.Input inline
          value={this.state.nameAngel}
          onChange={this.onChangeNameAngel}
          />
          number: <Form.Input inline
          value={this.state.numberAngel}
          onChange={this.onChangeNumberAngel}
          />
        </Form>

        <Button onClick={this.taoMoi} >thêm angel</Button>

        <br/><br/><br/>

      </div>
    )
  }
}
export default Angel;