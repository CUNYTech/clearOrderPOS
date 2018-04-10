// Used in abstractWidget.js

export default class ObjectUtils {

  /**
   * Return true the argument is null or empty
   */
  static isNullOrEmpty = (obj) => {
    return obj == null || Object.keys(obj).length == 0;
  };

  /**
   * Return the type of an object as a simple string
   */
  static typeOf = (object) => {
    var text = Function.prototype.toString.call(object.constructor);
    return text.match(/function (.*)\(/)[1];
  };

}
