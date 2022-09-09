// Alert function
const setAlert = (msg, type = 'danger') => {
    return `<p class="alert alert-${type} d-flex justify-content-between">
          ${msg}<button data-bs-dismiss="alert" class="btn-close"></button>
         </p>`;
}





/**
 * get all LS Data
 */
const readLSData = (key) => {

    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }

}

/**
 *  Set value LS
 * */
const createLSData = (key, value) => {

    //init value
    let data = [];

    //check key exist or not
    if (localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    }
    //push data to LS
    data.push(value);
    //set data
    localStorage.setItem(key, JSON.stringify(data));
}

/*
Update our LS Data
*/
const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array))
}