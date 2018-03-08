<div align='center'>
<img src='https://cdn.rawgit.com/WebDevLuke/styled-components-mq/master/logos.png' height='150px'>
</div>

<br />

<div align="center">
  <strong>A port of <a href='https://github.com/sass-mq/sass-mq'>sass-mq</a> for <a href='https://github.com/styled-components/styled-components'>styled-components</a> to help you compose media queries in an elegant way.</strong>
  <br />
  <br />
</div>

## Install

Install `styled-components-sass-mq` using npm:

```
npm install --save styled-components-sass-mq
```

## Usage
Refer to [sass-mq](https://github.com/sass-mq/sass-mq) docs for a full list of options. `styled-components-sass-mq` provides feature parity with [sass-mq](https://github.com/sass-mq/sass-mq), with exception to its `show-breakpoint` and `add-breakpoint` functions.

Here's a basic example:

```JSX
import React from 'react';

import styled from 'styled-components';
import mq from 'styled-components-sass-mq';

// Use sass-mq default breakpoints, or like below, provide your own
const breakpoints = {
  "sm": 370,
  "md": 768,
  "lg": 1024,
  "xlg": 1440
}

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: palevioletred;
  ${mq({from: 'md', breakpoints: breakpoints, content: `
    font-size: 5em;
  `})}
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  ${mq({from: 'md', until: 'xlg', and: '(orientation: landscape)', breakpoints: breakpoints, content: `
    background: red;
  `})}
`;

<Wrapper>
  <Title>Hello World, this is my first styled component, with easy to use media queries!</Title>
</Wrapper>
```






