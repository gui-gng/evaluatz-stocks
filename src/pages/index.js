import React from 'react';
import './css/index.css';

import { connect } from 'react-redux';

//Components
import Load_FullScreen from '../components/Load_FullScreen';
import Index_before_auth from '../components/index_before_auth'
const Index_after_auth = React.lazy(() => import('../components/index_after_auth'));

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
  
    componentDidMount() {

    }

    componentDidUpdate() {
  
    }

    render() {
        return this.props.user.isLogged ? 
        <React.Suspense fallback={<Load_FullScreen />}>
            <Index_after_auth />
        </React.Suspense>
        : 
        <Index_before_auth />;
    }
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
        user: state.user
    };
};

export default connect(mapStateToProps)(Index);

