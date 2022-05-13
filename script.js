let servicesArray = [];
let servicesTotal = 0;
const washBtn = document.getElementById("wash_btn");
const mowBtn = document.getElementById("mow_btn");
const weedBtn = document.getElementById("weed_btn");
const sendInvoiceBtn = document.getElementById("send_invoice_btn");
const servicesContainerEl = document.getElementById('services_container');
const totalPriceEl = document.getElementById('total_price');
const invoiceSentMessage = document.getElementById("invoice_sent");

washBtn.addEventListener('click', function() {
  const price = 10;
  const text = 'Wash Car';
  createServiceItem(price, text);
})

mowBtn.addEventListener('click', function() {
  const price = 20;
  const text = 'Mow Lawn';
  createServiceItem(price, text)
})
weedBtn.addEventListener('click', function() {
  const price = 30;
  const text = 'Pull Weeds';
  createServiceItem(price, text)
})

invoiceSentMessage.addEventListener('click', function () {
  invoiceSentMessage.classList.toggle('none');
})

sendInvoiceBtn.addEventListener('click', resetInvoice);


function createServiceItem(price, text) {
    let exist = false;
    servicesArray.forEach((item) => {
      if (item === text) {
        exist = true;
      }
    })
    if (!exist) {
      servicesArray.push(text);
      servicesTotal +=price;
      totalPriceEl.innerText = servicesTotal;
      let div = document.createElement('div');
      div.classList.add('service_item');

      let removeButton = document.createElement('p');
      removeButton.classList.add('remove_button');
      removeButton.innerText = "Remove item";
      removeButton.addEventListener('click', (e) => {
        removeListItem(e);
      })

      let itemDescription = document.createElement('p');
      itemDescription.classList.add('item_description');
      itemDescription.textContent = text;

      let dollarSign = document.createElement('span');
      dollarSign.classList.add('dollar_sign');
      dollarSign.innerText = '$';

      let itemPrice = document.createElement('p');
      itemPrice.classList.add('item_price');
      itemPrice.setAttribute('id', price);
      itemPrice.innerText = price;
      itemPrice.prepend(dollarSign);

      div.append(itemDescription);
      div.append(removeButton);
      div.append(itemPrice);
      servicesContainerEl.append(div);

    }
    
}

function removeListItem(event) {
  // find the parent element and remove it
  // use the parent element to get the text content of the 
  
  let parentElementToRemove = event.target.parentNode;
  let itemText = parentElementToRemove.firstChild.innerText;
  let itemPrice = parseInt(parentElementToRemove.lastChild.id)
  servicesTotal -= itemPrice;
  totalPriceEl.innerText = servicesTotal;
  servicesArray = servicesArray.filter((item) => {
    return item != itemText
  })
  parentElementToRemove.remove();
  
}

function resetInvoice() {
  // return total price to zero
  servicesTotal = 0;
  totalPriceEl.innerText = 0;

  // empty services array 
  servicesArray = [];

  //remove all service list items 
  while (servicesContainerEl.firstChild) {
    servicesContainerEl.removeChild(servicesContainerEl.firstChild);
  }

  // toggle message
  invoiceSentMessage.classList.toggle('none');
}