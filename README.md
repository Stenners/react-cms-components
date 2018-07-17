# React CMS Components
A light framework for integrating React and Redux with any CMS using the DOM as the hook.
All imports are dynamic unless pre-registered. Performance! 💥

## Installation
`yarn add react-cms-components`

or

`npm install --save react-cms-components`

## Example
```javascript
import ReactCMSComp from './react-cms-components';
import {someReducer} from './reducers';
import {createStore} from 'redux';

// Manually import this one since we want it on every page (for example)
import SomeComponent from '../components/content/somecomponent/js';

// Component map is to pass in pre-imported components
const componentMap = {
  'cart': Cart
}

ReactCMSComp.render({
  componentPath: '../components/content', // Where your components live in relation to this file
  componentList: document.querySelectorAll('[data-component]'),
  staticComponentMap: componentMap,
  // Using Redux? Pass a store
  reduxStore: createStore(someReducer)
});
```

And then in your page's markup: 

```html
<section>
    <div data-component="SomeComponent" data-prop-title="Title" data-prop-tag="h1"></div>
    <div data-component="SomeOtherComponentName" data-props='{"title": "Fabulous"}'></div>
</section>
```
