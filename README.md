# React CMS Components
A light framework for integrating React with any CMS using the DOM as the hook.
Choose whether imports are lazy loaded or static.

## Installation
`yarn add react-cms-components`

or

`npm install --save react-cms-components`

## Example
```javascript
import ReactCMSComp from './react-cms-components';

// Manually import this one since we want it on every page (for example)
import SomeComponent from '../components/somecomponent';

// Returns an array of objects, parsed by ReactCMSComp, from all DOM nodes with `data-component`
const componentArray = ReactCMSComp.return({
  componentList: document.querySelectorAll('[data-component]')
});

// Create an object that maps the component names in `componentArray` to any staticly imported ones. 
const staticComponentMap = {
  'some-component': SomeComponent
}

//Loop the componentArray to render to the page
if (componentArray.length > 0) {
  componentArray.map(component => {
    if (component.dynamic === true) {
      // Chunks are numbered rather than named
      import(`../../components/content'/${component.name}/js`).then(module => render(<module.default {...component.props} />, component.element));
    } else {
      const Comp = staticComponentMap[component.name];
      render(<Comp {...component.props} />, component.element);
    }
  })
}
```

And then in your page's markup: 

```html
<section>
    <div data-component="SomeComponent" data-prop-title="Title" data-prop-tag="h1"></div>
    <div data-component="SomeOtherComponentName" data-props='{"title": "Fabulous"}'></div>
</section>
```

To make a component 'dynamic' (lazy loaded) simply add `data-dynamic` to the tag.

```html
<div data-component="SomeOtherComponentName" data-props='{"title": "Fabulous"}' data-dynamic></div>
```
