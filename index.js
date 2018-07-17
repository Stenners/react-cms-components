const ReactCMSComp = {

  /**
   * Extract props from the DOM via data attributes
   * 
   * @param {node} element 
   * @returns 
   */
  getProps(element) {
    let props = {};
    const dataProps = element.dataset;
    if (dataProps.hasOwnProperty('props')) {
      try {
        props = JSON.parse(dataProps.props);
      } catch (error) {
        console.warn(error);
      }
    } else {
      // Filter the keys of the DOMStringMap (coming from renderComponents) to create
      // a new, simpler props object.
      const propertyNames = Object
        .keys(dataProps)
        .filter(function (propertyName) {
          return propertyName.indexOf("prop") === 0;
        });
      for (let prop of propertyNames) {
        let propName = prop
          .split('prop')[1]
          .toLowerCase();
        props[propName] = dataProps[prop];
      }
    }
    if (props) {
      return props;
    }
  },

  /**
   * Not finished yet.
   * 
   * @param {node} nodes 
   */
  renderChildren(nodes) {
    let origNodes = '';
    for (const node of nodes) {
      origNodes+=node.outerHTML;
    }
    return origNodes;
  },

  /**
   * Loop the componentList, work out the path, then dynamically import the module
   * 
   * @param {any} {componentList, reduxStore, staticComponentMap, componentPath} 
   */
  return({componentPath, componentList}) {
    let componentArray = [];
    for (const value of componentList) {
      let component = {};
      component.name = value.dataset.component;
      component.element = value;
      component.props = this.getProps(value);
      if (value.children.length>0) {
        component.props.childComponents = this.renderChildren(value.children);
      }
      if (value.hasAttribute('data-dynamic')) {
        component.dynamic = true;
      }
      componentArray.push(component);
    }
    return componentArray;
  }

}

export default ReactCMSComp;