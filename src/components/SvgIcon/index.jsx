
import React, { Component } from 'react'
export default class SvgIcon extends Component {
  render() {
    const {path} = this.props
    const p = require('../../'+path).default
    return (
      <span style={{width:'20px',display:'inline-block',verticalAlign:'middle',margin:'-5px 10px 0 -5px'}}>
        <img style={{width:'20px',marginRight:'10px',transform:'scale(.8)'}}  alt="svg图标" src={p}></img>
       </span>
    )
  }
}

