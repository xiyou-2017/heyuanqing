let getItems = (inputs) => {
  let items = [];
  let allCartItems = loadAllItems();

  for(let input of inputs){
     let splitInput  = input.split('-');
     let barcode = splitInput[0];
     let count = parseInt(splitInput[1]||1);

     let item = items.find((item) => item.item.barcode === barcode);
     if(item){
       item.count += count;
     }
     else {
       item = allCartItems.find((cartItem)=>cartItem.barcode === barcode);
       items.push({item:item,count:count});
     }
  }
  return items;
}

let getPromotionType =(barcode) => {
  let promptions = loadPromotions();
  let promotion = promptions.find((promption) => promption.barcodes.includes(barcode));

  return promotion?promotion.type:'';
}

let getDiscount = (promotionType,cartItem) => {
  let saveCount = 0;
  if (promotionType === 'BUY_TWO_GET_ONE_FREE'){
    saveCount = parseInt(cartItem.count/3);
  }
  let saved = saveCount * cartItem.item.price;
  let subtotal = cartItem.item.price * (cartItem.count - saveCount);

  return {saved,subtotal};
}


let getItemSubtotals = (cartItems) => {
  return cartItems.map(cartItem=> {
    let promotionType = getPromotionType(cartItem.item.barcode);
    let {saved,subtotal} = getDiscount(promotionType,cartItem);

    return({cartItem,saved,subtotal});
  });
}


let getItemTotal = (subtotals) => {
  let total = 0;
  let savedTotal = 0;
  for ( let subtotal of subtotals){
    total +=subtotal.subtotal;
    savedTotal += subtotal.saved;
  }

  return {subtotals,total,savedTotal};
}


let printReceiptTxt = (itemTotal) => {
  let receipt = "***" + "<" + "没钱赚商店>收据***\n";
  for (let items of itemTotal.subtotals){
    receipt = receipt + "名称：" + items.cartItem.item.name + "，数量：" + items.cartItem.count + items.cartItem.item.unit +
      "，单价：" + items.cartItem.item.price.toFixed(2) + "(元)，小计：" + items.subtotal.toFixed(2) + "(元)\n";
  }
  receipt = receipt + "----------------------\n总计：" + itemTotal.total.toFixed(2) + "(元)\n节省：" + itemTotal.savedTotal.toFixed(2) + "(元)\n**********************"

  return receipt;
}


let printReceipt = (inputs) => {
  let cartItems = getItems(inputs);
  let subtotals = getItemSubtotals(cartItems);
  let itemsTotal = getItemTotal(subtotals);
  let receipt = printReceiptTxt(itemsTotal);
  console.log(receipt);
}
