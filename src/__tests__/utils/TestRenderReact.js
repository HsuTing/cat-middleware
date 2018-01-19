// @flow
'use strict';

import * as React from 'react';
import radium from 'radium';
import Wrapper from 'cat-components/lib/wrapper';

/* TODO
 * remove: esproposal.decorators=ignore
*/

type Props = {};

@radium
class TestRenderReact extends React.Component<Props> {
  render() {
    return (
      <div>render react</div>
    );
  }
}

/* eslint-disable react/display-name */
export default (
  props: {}
) => (
  <Wrapper {...props}>
    <TestRenderReact />
  </Wrapper>
);
/* eslint-enable react/display-name */
