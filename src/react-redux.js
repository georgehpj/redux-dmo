import React from 'react';

const Context = React.createContext();
const Consumer = Context.Consumer;

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeState: props.store.getState(),
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
    const Provider = this.props.context ? this.props.context.Provider : Context.Provider;
    return (
      <Provider value={{ store: this.props.store, storeState: this.state.storeState }}>
        {this.props.children}
      </Provider>
    );
  }
}

const connect = (mapStateToProps, mapDispatchToProps, mergeProps, options) => Component => (
  (props) => {
    const Consumer = options && options.context ? options.context.Consumer : Context.Consumer;
    return (
      <Consumer>
        {(value) => {
          const { store, storeState } = value;
          const { dispatch } = store;
          const mergedProps = { ...props, ...mapStateToProps(storeState), ...mapDispatchToProps(dispatch) };
          return <Component {...mergedProps} />;
        }}
      </Consumer>
    );
  }
);


export {
  Provider,
  connect,
};
