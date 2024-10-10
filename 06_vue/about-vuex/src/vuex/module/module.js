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
}