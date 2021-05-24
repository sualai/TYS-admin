import React, { Component } from 'react'
import { Select } from 'antd';
import icons from './requestIcon'
import SvgIcon from "../SvgIcon"
import "./index.css"
const { Option } = Select

export default class SelectIcon extends Component {
    state = {
        checkIcon:''
    }
    handleChange = (value) => {
        console.log(value)

        this.props.selectIcon(value)
    }
    render() {
        console.log(icons)

        return (
            <Select allowClear listItemHeight={20} listHeight={120} 
             defaultValue={this.state.checkIcon} style={{ width: '100%' }} onChange={this.handleChange}>
                {icons.map(item=>{
                    return (
                         <Option  key={item} value={item} >
                            <SvgIcon path={`assets/icons/svg/${item}.svg`}/>
                            <span className="ml10">{item}</span>
                         </Option>
                    )
                })}
            </Select>
        )
    }
}
