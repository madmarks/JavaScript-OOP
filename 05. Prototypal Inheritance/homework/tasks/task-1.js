/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
      * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * method removeAttribute(attribute)
    * throw Error if attribute does not exist in the domElement
*/


/* Example

var meta = Object.create(domElement)
    .init('meta')
    .addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
    .init('head')
    .appendChild(meta)

var div = Object.create(domElement)
    .init('div')
    .addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
    .init('body')
    .appendChild(div)
    .addAttribute('id', 'cuki')
    .addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
    .init('html')
    .appendChild(head)
    .appendChild(body);

console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/

function solve() {

    'use strict';

    function isString(str) {

        return typeof str === "string" || (typeof str === "object" && str.constructor === String);
    }

    function isValidName(name) {

        // ^ is the begin of string, $ is the end of string. 
        // It's used here to make sure the complete string does contain digits and Latin characters only. 
        // Without them any string containing letters and digits would be matched. 
        // Now strings containing letters and digits ONLY will be matched.

        var regExp = /^[0-9a-zA-Z]+$/,
            isNameContainsOnlyDigitsAndLatinLetters = regExp.test(name);

        if (!isNameContainsOnlyDigitsAndLatinLetters) {

            return false;
        }

        return true;
    }

    function isValidAttribute(arr, attribute) {

        if (!arguments || !attribute || !(/^[0-9a-zA-Z\-]+$/.test(attribute))) {

            return false;
        }

        var isAttributeExists = arr.some(function (item) {

            return item[0] === attribute;
        });

        if (!isAttributeExists) {

            return false;
        }

        return true;
    }

    function parseHTML() {
        var i,
            len,
            result = '<' + this.type;

        this.attributes.sort(function (x, y) {
            return x[0] > y[0];
        });

        for (i = 0, len = this.attributes.length; i < len; i += 1) {

            result += ' ' + this.attributes[i][0] + '="' + this.attributes[i][1] + '"';
        }

        result += '>';

        if (this.children.length > 0) {

            for (i = 0, len = this.children.length; i < len; i += 1) {

                if (isString(this.children[i])) {

                    result += this.children[i];

                } else {

                    result += this.children[i].innerHTML;
                }

            }

        } else if (this.content) {

            result += this.content;
        }

        result += '</' + this.type + '>';

        return result;
    }

    // ----------------------------------------------------------------------

    var domElement = (function () {

        var domElementPrototype = {

            init: function (type) {

                this.type = type;
                this._attributes = [];
                this._children = [];

                return this;
            },
            appendChild: function (child) {

                if (!isString(child)) {

                    child.parent = this;
                }

                this.children.push(child);

                return this;
            },
            addAttribute: function (name, value) {

                if (!arguments || !name || !(/^[0-9a-zA-Z\-]+$/.test(name))) {

                    throw new Error();
                }

                var isPropertyExists = false;

                this.attributes.forEach(function (item, index, arr) {

                    if (item[0] === name) {

                        arr[index][1] = value;
                        isPropertyExists = true;
                    }
                });

                if (!isPropertyExists) {

                    this.attributes.push([name, value]);
                }

                return this;
            },
            removeAttribute: function (attribute) {

                var i = 0;

                if (!isValidAttribute(this.attributes, attribute)) {

                    throw new Error('');
                }

                while (i < this.attributes.length) {

                    if (this.attributes[i][0] === attribute) {

                        this.attributes.splice(i, 1);
                        i -= 1;
                    }

                    i += 1;
                }

                return this;
            },
            get type() {

                return this._type;
            },
            set type(value) {

                if (!value || !isValidName(value) || !isString(value)) {

                    throw new Error('type is invalid!');
                }

                this._type = value;
            },
            get innerHTML() {

                return parseHTML.call(this);
            },
            get content() {

                return this._content;
            },
            set content(value) {

                this._content = value;
            },
            get attributes() {

                return this._attributes;
            },
            get children() {

                return this._children;
            },
            get parent() {

                return this._parent;
            },
            set parent(value) {

                this._parent = value;
            }
        };

        return domElementPrototype;

    }());

    return domElement;
}

module.exports = solve;
