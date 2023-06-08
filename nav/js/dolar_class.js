
class $ {
        constructor (selector, context = document) {
            this.elems = Array.from(context.querySelectorAll(selector));
        }
        find (selector) {
            return new $(selector, this.elems[0]);
        }
        addClass(...classes) {
            for (let item of this.elems) {
                item.classList.add(...classes);
            }
            return this;
        }
        removeClass(...classes) {
            for (let item of this.elems) {
                item.classList.remove(...classes);
            }
            return this;
        }
        css(prop, val) {
            prop = prop.split('-').map(function (part, index) {
                if (index === 0) return part;
                let arr = part.split('');
                arr.splice(0, 1, arr[0].toUpperCase());
                return arr.join('');
            }).join('');
            for (let item of this.elems) {
                item.style[prop] = val;
            }
            return this;
        }
        attr(attr, val = '') {
            for (let item of this.elems) {
                item.setAttribute(attr, val);
            }
            return this;
        }


}
