import React from 'react';
// Another way to import. This is recommended to reduce bundle size
import ClipLoader from 'react-spinners/ClipLoader';
import "./LoadingScreen.css";


class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div className='sweet-loading'>
                <ClipLoader
                    color={'#123abc'}
                />
            </div>
        )
    }
}

export default LoadingScreen