import React from 'react';

let newData = {
    data: 'Data from HOC...',
};

let MyHOC = ComposedComponent => class extends React.Component {

    componentDidMount() {
        this.setState({
            data: newData.data
        });
    }

    render() {
        return <ComposedComponent {...this.props} {...this.state} />;
    }
};


class MyComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.data}</h1>
            </div>
        )
    }
}

export default MyHOC(MyComponent);