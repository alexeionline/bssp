import React from 'react';
import { withRouter } from "react-router-dom";
import { Container } from 'semantic-ui-react'

const SomeObject = () => {
    return (
        <Container>
            This is some object page
        </Container>
    );
};

export default withRouter( SomeObject );