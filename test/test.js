describe('unit-1 test', () => {

  describe('should get items information', () => {
    let inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    it('get right and no-repeat informations', () => {
      const items = [
        {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5
          },
          count: 3
        }
      ];

      expect(getItems(inputs)).toEqual(items);
    });
  });
});

describe('unit-test2', () => {
  it('get right promotion-type', () => {
    let barcode = 'ITEM000001';
    let type = 'BUY_TWO_GET_ONE_FREE';
    expect(getPromotionType(barcode)).toEqual(type);
  });

  it('get right promotion-type', () => {
    let barcode = 'ITEM000003';
    let type = '';
    expect(getPromotionType(barcode)).toEqual(type);
  });

  it('get right promotion-type', () => {
    let barcode = 'ITEM000005';
    let type = 'BUY_TWO_GET_ONE_FREE';
    expect(getPromotionType(barcode)).toEqual(type);
  });
});


describe('unit-test3', () => {

  it('get saved and subtotal', () => {
    let type = 'BUY_TWO_GET_ONE_FREE';
    let result = {saved: 3, subtotal: 12};
    let item = {
      item: {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      count: 5
    };
    expect(getDiscount(type, item)).toEqual(result);
  });

  it('get right promotion-type', () => {
    let type = '';
    let result = {saved: 0, subtotal: 30};
    let item = {
      item: {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      count: 2
    };
    expect(getDiscount(type, item)).toEqual(result);
  });

  it('get right promotion-type', () => {
    let type = 'BUY_TWO_GET_ONE_FREE';
    let result = {saved: 4.5, subtotal: 9};
    let item = {
      item: {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.5
      },
      count: 3
    };
    expect(getDiscount(type, item)).toEqual(result);
  });
});

describe('get every item saved and subtotal', () => {
  let items = [
    {
      item: {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      count: 5
    },
    {
      item: {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      count: 2
    },
    {
      item: {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.5
      },
      count: 3
    }
  ];
  it('should get every item', () => {
    let subtotal = [
      {
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },

        saved: 3,
        subtotal: 12
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },

          count: 2
        },

        saved: 0,
        subtotal: 30
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5
          },
          count: 3
        },

        saved: 4.5,
        subtotal: 9
      }
    ];
    expect(getItemSubtotals(items)).toEqual(subtotal);
  });
});

describe('get items total ', () => {
  it('should get items total and savedtotal', () => {
    let subtotals = [
      {
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },

        saved: 3,
        subtotal: 12
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },

          count: 2
        },

        saved: 0,
        subtotal: 30
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5
          },
          count: 3
        },

        saved: 4.5,
        subtotal: 9
      }
    ];

    let total = {
      subtotals: [
        {
          cartItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },

          saved: 3,
          subtotal: 12
        },

        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },

            count: 2
          },
          saved: 0,
          subtotal: 30

        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5
            },
            count: 3
          },
          saved: 4.5,
          subtotal: 9
        }],
      savedTotal: 7.5,
      total: 51
    };
    expect(getItemTotal(subtotals)).toEqual(total);
  });
});

describe('get receipt',() =>{
 it('will get right receipt',() => {
   let total = {
     subtotals: [
       {
         cartItem: {
           item: {
             barcode: 'ITEM000001',
             name: '雪碧',
             unit: '瓶',
             price: 3.00
           },
           count: 5
         },

         saved: 3,
         subtotal: 12
       },

       {
         cartItem: {
           item: {
             barcode: 'ITEM000003',
             name: '荔枝',
             unit: '斤',
             price: 15.00
           },

           count: 2
         },
         saved: 0,
         subtotal: 30

       },
       {
         cartItem: {
           item: {
             barcode: 'ITEM000005',
             name: '方便面',
             unit: '袋',
             price: 4.5
           },
           count: 3
         },
         saved: 4.5,
         subtotal: 9
       }],
     savedTotal: 7.5,
     total: 51
   };

   let expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;
   expect(printReceiptTxt(total)).toEqual(expectText);
 });
});

describe('test',() => {
  it('will print receipt',() => {
    let inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    spyOn(console, 'log');
    printReceipt(inputs);

    let expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;




    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
