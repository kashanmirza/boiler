import React, { Component } from 'react';

class Useravatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: [
        '#65d878',
        '#fe4042',
        '#ffb347',
        '#00ccff',
        '#381bec',
        '#abd017',
        '#8934bf',
        '#d324cd',
        '#f7503a',
        '#1fc0ca',
        '#7d8c8d',
        '#3ec09d',
      ],
      selectedColor: '',
    }
  }

  componentDidMount() {
  }

  componentDidMount() {
    this.avatarRandom()
  }

  avatarRandom() {
    var item = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
    this.setState({
      selectedColor: item,
    })
  }

  render() {
    return (
      <div>
        <div className="userAvatar"
          style={{ backgroundColor: this.state.selectedColor }}>{(this.props.Useravatarname)[0]}</div>
      </div>
    );
  }
}

export default Useravatar;




