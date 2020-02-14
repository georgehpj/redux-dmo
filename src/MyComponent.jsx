import React from 'react';
import { connect } from './react-redux';
import { increase, decrease } from './action';
import { bindActionCreators } from './redux';


const mapStateToProps = state => ({
  number: state.number,
  logs: state.logs,
});

const mapDisplayToProps = dispatch => bindActionCreators({
  increase, decrease,
}, dispatch);

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.number}</h1>
        <button onClick={this.props.increase}>+</button>
        <button onClick={this.props.decrease}>-</button>

        <ul>
          {this.props.logs.map(log => (
            <li>{log}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDisplayToProps)(MyComponent);
