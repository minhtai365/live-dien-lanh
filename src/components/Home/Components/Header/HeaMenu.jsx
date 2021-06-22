import React, { Component } from 'react'
import './HeaMenu.css'
export default class HeaMenu extends Component {
    render() {
        return (
            <div className="con">
                <ul className="lv1">
                    <li>List 1
                        <ul className="lv2">
                            <li>Item 1</li>
                        </ul>
                    </li>
                    <li>List 2
                        <ul className="lv2">
                            <li>Item 1</li>
                            <li>Item 2
                                <ul className="lv3">
                                    <li>Sub-Item 1</li>
                                    <li>Sub-Item 2</li>
                                    <li>Sub-Item 3</li>
                                </ul>
                            </li>
                            <li>Item 3</li>
                        </ul>
                    </li>
                    <li>List 3
                        <ul className="lv2">
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                            <li>Item 5</li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}
