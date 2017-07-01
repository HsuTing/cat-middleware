'use strict';

import React from 'react';
import radium from 'radium';
import Wrapper from 'cat-components/lib/Wrapper';

@radium
class TestRenderReact extends React.Component {
  render() {
    return (
      <div>render react</div>
    );
  }
}

export default props => ( // eslint-disable-line react/display-name
  <Wrapper {...props}>
    <TestRenderReact />
  </Wrapper>
);
