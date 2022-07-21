
const invokeCallbackForElements = (elements, callback) => {
    elements.forEach((ele, itx) => {
        const fn = callback.bind(ele);
        fn(itx);
    });
};

const setPropertyCustomLogicForElements = (elements, prop, options, customFn) => {
  elements.forEach((ele) => {
    for (const key in options) {
      customFn(ele, prop, key, options[key]);
    }
  });
};

const setPropertyCustomLogic = (elements, prop, data, customFn) => {
    const createObjectFromArray = arr => Object.fromEntries([arr]);
    const dataType = typeof(data[0]); 
    if (dataType === "string") {
      setPropertyCustomLogicForElements(
        elements,
        prop,
        //(Object.fromEntries([data[0], data[1]])), customFn);
        createObjectFromArray([data[0], data[1]]), customFn);
        
    } else if (dataType === "object") {
      setPropertyCustomLogicForElements(elements, prop, data[0], customFn);
    }
};

const addEvents = (ele, prop, callback) => {
    ele[prop] = callback;
};

const addEventToElements = (elements) => {
    const addListener = (elements, action, listener) => {
        elements.forEach(ele => ele.addEventListener(action, listener));
    };
    addEvents(elements, "css", (...opts) =>
      setPropertyCustomLogic(elements, "style", opts, (ele, prop, key, value) => {
        ele[prop][key] = value;
      })
    );

    //addEvents(elements, "html", () => elements[0].innerHTML);
    //addEvents(elements, "text", () => elements[0].textContent);

    addEvents(elements, "html", (...atr) => {
        if (atr && atr[0]){
            elements[0].innerHTML = atr[0]
        }
        else return elements[0].innerHTML
    });
    addEvents(elements, "text", (...atr) => {
        if (atr && atr[0]){
            elements[0].textContent = atr[0]
        }
        else return elements[0].textContent
    });
    
    addEvents(elements, "on", (...opts) =>
      addListener(elements, opts[0], opts[1])
    );

    addEvents(elements, "each", (opts) => {
      invokeCallbackForElements(elements, opts);
    });

    addEvents(elements, "add",    (...atr) => elements.forEach(e=>e.classList.add(atr[0])));
    addEvents(elements, "remove", (...atr) => elements.forEach(e=>e.classList.remove(atr[0])));
    
};

const $_ = (argument) => {
    const argumentType = typeof(argument); 
    if(argumentType === 'function') {
        window.addEventListener("DOMContentLoaded", argument);
        return;
    }
    if(argumentType === 'string') {
        const elements = document.querySelectorAll(argument);
        addEventToElements(elements);
        return elements;
    }else if(argumentType === 'object' && argument instanceof HTMLElement) {
        const elements = [argument];
        addEventToElements(elements);
        return elements;
    }
};
