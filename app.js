// get Elements
const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const product_list = document.querySelector('#product_list');
const single_product = document.querySelector('.single-product');
const product_update_form = document.querySelector('#product_update_form');



//get all products
const getAllProducts = () => {

    //get all LS Data
    const data = readLSData('product');

    //init value
    let list = '';

    //check LSData exit
    if (!data || data.length == 0) {
        list = `
        <tr>
           <td colspan="7" class="text-center">No product found</td>
        </tr>
        `;
    }

    //show all data to List
    if (data && data.length > 0) {


        let final_amount = 0;

        //loop for data
        data.map((item, index) => {
            final_amount += (item.price * item.quantity)
            list += `
            
            <tr>
                <td>${index + 1}</td>
                <td><img style="width: 60px; height: 60px; object-fit:cover; border-radius: 4px; "
                src="${item.photo}" alt="" /></td>
                <td>${item.name}</td>
                <td>${item.price} BDT</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity} BDT</td>
                <td>
                    <a class="btn btn-info btn-sm product-view" data-bs-toggle="modal" product_index="${index}" href="#shop_single_modal" ><i class="fas fa-eye"></i ></a>
                    <a class="btn btn-warning btn-sm product-edit" data-bs-toggle="modal" product_index="${index}" href="#shop_edit_modal" ><i class="fas fa-edit"></i  ></a>
                    <a class="btn btn-danger btn-sm product-delete" product_index="${index}" href="" ><i class="fas fa-trash"></i  ></a>
                </td>
            </tr>
          

            `;
        });

        list += `<tr>
         <td colspan="6" class="text-end">Final Amount = ${final_amount} BDT</td>
         <td></td>
        </tr>`



    }
    product_list.innerHTML = list;
}

getAllProducts();

// Submit Product form
product_form.onsubmit = (e) => {
    e.preventDefault();

    // get form data from FormData object
    let form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let { name, price, photo, quantity } = Object.fromEntries(form_data.entries());



    //form validation
    if (!name || !price || !quantity || !photo) {
        msg.innerHTML = setAlert('All fields are required');
    } else {

        createLSData('product', productData)
        msg.innerHTML = setAlert('Data Stable', 'success');
        e.target.reset();
        getAllProducts();

    }



}

//single product show
product_list.onclick = (e) => {
    e.preventDefault();

    if (e.target.classList.contains('product-view')) {
        //get single product data ID
        let index = e.target.getAttribute('product_index');

        let data = readLSData('product');

        //console.log(data)-okay

        // get data key
        const { name, price, photo } = data[index];

        //console.log(data[index])- okay


        // sent data to Modal

        single_product.innerHTML = `
            <img class="shadow" src="${photo}" alt="">
            <h1>${name}</h1>
            <p>Price: ${price} BDT</p>
            `;
    }

    //product edit
    if (e.target.classList.contains('product-edit')) {
        //get product index
        let index = e.target.getAttribute('product_index');
        //console.log(index) - okay

        //get product value;
        let data = readLSData('product');
        const { name, price, quantity, photo } = data[index];

        //console.log(data[index]) 



        //set form value
        product_update_form.innerHTML =
            `<div class="my-2">
            <label for="">Name</label>
            <input name="name" type="text" value="${name}" class="form-control" />
             </div>
            <div class="my-2">
            <label for="">Price</label>
            <input name="price" type="text" value="${price}" class="form-control" />
            </div>
            <div class="my-2">
            <label for="">Quantity</label>
            <input name="quantity" type="text" value="${quantity}" class="form-control" />
           </div>
           <div class="my-2">
            <label for="">Quantity</label>
            <input name="index" type="hidden" value="${index}" class="form-control" />
           </div>
           <div class="my-2 ">
            <img class="w-100"  src="${photo}" alt="">
           </div>
           <div class="my-2">
            <label for="">Photo</label>
            <input name="photo" type="text" value="${photo}" class="form-control" />
          </div>
          <div class="my-2">
            <input type="submit" class="btn btn-primary w-100" value="Update Now" />
          </div> 
          `;
    }

    //product delete
    if (e.target.classList.contains('product-delete')) {

        let conf = confirm('Are You sure?')

        if (conf) {
            //get product index
            let index = e.target.getAttribute('product_index');
            let data = readLSData('product');

            //delete index data
            data.splice(index, 1);

            //update latest record
            updateLSData('product', data);

            //now reload data
            getAllProducts();
        } else {
            alert('Your data safe')
        }

    }



}







// product update form submit
product_update_form.onsubmit = (e) => {
    e.preventDefault();

    // alert(); -okay


    // get form data
    const form_data = new FormData(e.target);
    const { name, price, quantity, photo, index } = Object.fromEntries(form_data.entries());

    // console.log(index);-okay

    //get all data
    let all_data = readLSData('product');


    all_data[index] = { name, price, quantity, photo };

    // console.log(all_data); -okay

    //update your data
    updateLSData('product', all_data);

    //reload data
    getAllProducts();
}




