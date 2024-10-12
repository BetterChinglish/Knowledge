import { objForEach } from "@/vuex/util";

export default class Module {
  constructor(rootModule) {
    this._raw = rootModule;
    this._children = {};
    this.state = rootModule.state;
  }
  
  getChild(key) {
    return this._children[key];
  }
  
  addChild(key, module) {
    this._children[key] = module;
  }
  
  forEachMutation(fn) {
    if(this._raw.mutations) {
      objForEach(this._raw.mutations, fn);
    }
  }
  
  forEachAction(fn) {
    if(this._raw.mutations) {
      objForEach(this._raw.actions, fn);
    }
  }
  forEachGetters(fn) {
    if(this._raw.mutations) {
      objForEach(this._raw.getters, fn);
    }
  }
  
  forEachChild(fn) {
    objForEach(this._children, fn);
  }
}