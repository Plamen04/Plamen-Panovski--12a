

export const COLUMN_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    TIME: 'time',
    TIMESPAN: 'timespan',
    CHECKBOX: 'checkbox',
    STATUS: 'status',
    ENUM: 'enum',
    CURRENCY: 'currency'
};

export const colType = (c, item) => c.dynamicType?.(item) || c.type;

export const formatCurrency = (value) => "$" + value.toString();

/**
 * External function
 * @param value - parameter for value to be formatted as time string
 * @returns {*} - formatted time string
 */
const formatTime = value => value;

/**
 * External function
 * @param value - parameter for the value to be formatted as timespan string 
 * @returns {*} - formatted TimeSpan string
 */
const formatTimeSpan = value => value;

/**
 * External function.
 * @param value parameter for value for formatted date object
 * @returns {*} formatted Date object
 */
const formatDate = value => value;

export function sortBy(array, keys, asc = true, valueFormatter = undefined, ifCallback = undefined) {
    return array.slice().sort((a, b) => comparator(a, b, keys, asc, valueFormatter, ifCallback));
}

export function formatCellContent(col, item) {
    let formattedValue = col.key ? item[col.key] : item;

    if (col.format)
        formattedValue = col.format(item, col.key,);

    if (typeof formattedValue === 'number')
        switch (col.type) {
            case COLUMN_TYPE.TIME:
                formattedValue = formatTime(formattedValue); break;
            case COLUMN_TYPE.TIMESPAN:
                formattedValue = formatTimeSpan(formattedValue); break;
            case COLUMN_TYPE.DATE:
                formattedValue = formatDate(formattedValue); break;
            case COLUMN_TYPE.CURRENCY:
                formattedValue = formatCurrency(formattedValue); break;
        }
    else if (col.type == COLUMN_TYPE.STATUS)
        formattedValue = col.template(item);

    return formattedValue;
}

export function groupBy(list, key) {
    return list.reduce((res, x) => {
        (res[x[key]] = res[x[key]] || []).push(x);
        return res;
    }, {});
}

export function enumerateData(data, propertyName) {

    if (!data || !Array.isArray(data))
        throw new Error("Data parameter should be array")

    const list = document.createElement('ul');

    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        const clickEvent = new CustomEvent('item_selected', {item: data[i]})

        li.innerText = data[i][propertyName] || '';
        li.addEventListener('click', (e) => li.dispatchEvent(clickEvent))

        list.appendChild(li);
    }

    return list;
}

/**
 * External function. Do not put documentation on this.
 * @param a {any} - parameter for value a
 * @param b {any} - parameter for value b
 * @param keys {string[]} - an array of type string for the keys
 * @param asc {boolean} - parameter of type bool for if params a and b are asc or not
 * @param valueFormatter {function} - parameter of type function for formatting the values of a and b
 * @param ifCallback {function} - parameter of function to check if parameters are correct to call back
 * @returns {boolean} - returns a bool type of yes or no if the values are correct or not
 */
function comparator(a, b, keys, asc, valueFormatter, ifCallback) {
}