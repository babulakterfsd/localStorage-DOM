//get product name
const productField = document.getElementById('product');
let product = productField.value.trim();
productField.addEventListener('keyup', (event) => {
   product = event.target.value
})
//get product quantity
const quantityField = document.getElementById('quantity')
let quantity = productField.value.trim();
quantityField.addEventListener('keyup', (event) => {
   quantity = +event.target.value
})

const btn = document.getElementById('addButton')
const manual = document.getElementById('manual')
const lStorage = document.getElementById('localstorage')
let store = [];

btn.addEventListener('click', (event) => {
     if(!product || !quantity) {
        alert('you must enter both product name and product quantity') 
     } else {
      let products = {product, quantity}

      const repeatedProduct = store.find(singleProduct => singleProduct?.product === products?.product);

      if(repeatedProduct) {
         repeatedProduct.quantity += products.quantity;
         const filterredStore = store.filter(singleProduct => singleProduct?.product !== repeatedProduct?.product);
         filterredStore.push(repeatedProduct)
         store = filterredStore;
      } else {
         store.push(products)
      }

      localStorage.setItem(`store`, JSON.stringify(store))
      
    manual.innerHTML = ''
    store.forEach(value => {
          const tr = document.createElement('tr')
          tr.innerHTML = 
                         `
                           <td>${value.product}</td>
                           <td>${value.quantity}</td>
                          `
          manual.appendChild(tr)
    })
     productField.value = ''
     quantityField.value = ''
     product = ''
     quantity = ''
     }
})


document.getElementById('loadLocalStorage').addEventListener('click', () => {
   if(!localStorage.getItem('store')) {
      alert('There is no data saved in the local machine')
   } else {
      let storedProducts = JSON.parse(localStorage.getItem('store'))
   lStorage.innerHTML = '';
   storedProducts.forEach(value => {
      const tr = document.createElement('tr');
      tr.innerHTML = 
                     `
                     <td>${value.product}</td>
                     <td>${value.quantity}</td>
                     `
      lStorage.appendChild(tr)
   })
   }
})

document.getElementById('clearLocalStorage').addEventListener('click', () => {
   if(JSON.parse(localStorage.getItem('store')).length === 0) {
      alert('There is no data saved in the local machine')
   } else {
      lStorage.innerHTML = ''
   }
})

document.getElementById('clearLocalStoragepermanently').addEventListener('click', () => {
   if(JSON.parse(localStorage.getItem('store')).length === 0) {
      alert('There is no data saved in the local machine')
   } else {
      const userFeedback = confirm('Are you sure to clear previous data permanently?')
   if(userFeedback) {
      localStorage.removeItem('store');
      lStorage.innerHTML = ''
      alert('data from the local machine are cleared')
      window.location.reload()
   } else {
      alert('As you declined to delete,local data is still there')
   }
   }
})