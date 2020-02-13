import React from 'react';

const Context = React.createContext();
const Consumer = Context.Consumer;

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeState: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      this.setState({
        storeState: this.props.store.getState(),
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Context.Provider value={{ store: this.props.store, storeState: this.state.storeState }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export {
  Provider,
  Consumer,
};