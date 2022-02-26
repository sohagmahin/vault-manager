// this is home page

import React from 'react';
import withErrorModal from '../../components/HOC/withErrorModal/withErrorModal';

function Home() {
    return (
        <div>
            React and Redux boilerplate!!!
        </div>
    )
}

export default withErrorModal(Home);
