import React from 'react';
import ReactDOM from 'react-dom';
import ReactCMSComp from 'react-cms-components';

// Returns an array of objects, parsed by ReactCMSComp, from all DOM nodes with `data-component`
const componentArray = ReactCMSComp.return({
  componentList: document.querySelectorAll('[data-component]')
});

//Loop the componentArray to render to the page
if (componentArray.length > 0) {
  componentArray.map(component => {
    if (component.dynamic === true) {
      // Chunks are numbered rather than named
      import(
        /* webpackChunkName: "chunks/[request]" */ 
        `./components/${component.name}/index.js`)
        .then(module => ReactDOM.render(<module.default {...component.props} />, component.element));
    } else {
      const Comp = staticComponentMap[component.name];
      ReactDOM.render(<Comp {...component.props} />, component.element);
    }
  })
}