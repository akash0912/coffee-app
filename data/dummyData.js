import Coffee from '../models/Coffee'
export const PRODUCTS = [
    new Coffee(
      'p1',
      "Espresso",
      'https://images.pexels.com/photos/685527/pexels-photo-685527.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      ["espresso"],
      10
    ),
    new Coffee(
      'p2',
      "Espresso Macchiato",
      'https://images.pexels.com/photos/1036444/pexels-photo-1036444.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ["espresso", "milk form"],
      12
    ),
    new Coffee(
      'p3',
      "Cappucino",
      'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ["espresso", "steamed milk", "milk foam"],
      19
    ),
    new Coffee(
      'p4',
      "Mocha",
      'https://media.istockphoto.com/photos/cup-of-hot-latte-art-coffee-on-wooden-table-picture-id500740897?k=20&m=500740897&s=612x612&w=0&h=NjCDYEotdJCQiXaICJFbsduqGTSK7njyBHn5LL3gj38=',
      ["espresso", "steamed milk", "chocolate syrup", "whipped cream"],
      8
    ),
    new Coffee(
      'p5',
      'Flat White',
      'https://images.pexels.com/photos/7810035/pexels-photo-7810035.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      ["espresso", "steamed milk"],
      18
    ),
    new Coffee(
      'p6',
      "Americano",
      'https://images.pexels.com/photos/8340102/pexels-photo-8340102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ["espresso", "water"],
      7
    ),
    new Coffee(
      'p7',
      "Cafe Latte",
      'https://images.pexels.com/photos/10614498/pexels-photo-10614498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ["espresso", "teamesd milk", "milk foam"],
      16
    ),
    new Coffee(
     'p8',
     'Espresso Con Panna',
     'https://images.pexels.com/photos/11069882/pexels-photo-11069882.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
     ["espresso", "swhipped cream"],
     14
    ),
    new Coffee(
      'p9',
      "Cafe Breve",
      'https://images.pexels.com/photos/3714960/pexels-photo-3714960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ["espresso", "steamed milk", "steamed cream","milk foam"],
      15
    )
  ];
  


  export default PRODUCTS;
  