import { createContext, useCallback, useEffect, useState } from "react";

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
   // Shopping Cart - Increment quantity
   const [count, setCount] = useState(0)

   // Product Detail - Open/Close
   const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
   const openProductDetail =() => setIsProductDetailOpen(true)
   const closeProductDetail =() => setIsProductDetailOpen(false)

   // Chekout Side Menu - Open/Close
   const [isChekoutSideMenOpen, setIsChekoutSideMenOpen] = useState(false)
   const openChekoutSideMenu =() => setIsChekoutSideMenOpen(true)
   const closeChekoutSideMenu =() => setIsChekoutSideMenOpen(false)
   

   // Product Detail - Show product
   const [productToShow, setProductToShow] = useState({})

   // Shopping Cart - Add products to cart
   const [cartProducts, setCartProducts] = useState([])

   // Shopping Cart - Order
   const [order, setOrder] = useState([])

   // Get Prodcuts 
   const [items, setItems] = useState(null)
   const [filteredItems, setFilteredItems] = useState(null)

   // Get Prodcuts by title
   const [searchByTitle, setSearchByTitlte] = useState(null)

   // Get Prodcuts by category
   const [searchByCategory, setSearchByCategory] = useState(null)
 

   useEffect(() => {
      fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(data => setItems(data))
   }, [])

   const filteredItemsByTitle = (items, searchByTitle) => {
      return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
   }

   const filteredItemsByCategory = (items, searchByCategory) => {
      return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
   }

   const filterBy = useCallback((searchType, items, searchByTitle, searchByCategory) => {
         if (searchType === "BY_TITLE") {
            return filteredItemsByTitle(items, searchByTitle);
         }
   
         if (searchType === "BY_CATEGORY") {
            return filteredItemsByCategory(items, searchByCategory);
         }
   
         if (searchType === "BY_TITLE_AND_CATEGORY") {
            return filteredItemsByCategory(items, searchByCategory).filter(
               (item) => item.title.toLowerCase().includes(searchByTitle.toLowerCase())
            );
         }
   
         if (!searchType) {
            return items;
         }
      },
      []
   );

   useEffect(() => {
      if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
      if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
      if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
      if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
   }, [items, searchByTitle, searchByCategory, filterBy])


   return (
      <ShoppingCartContext.Provider value={{
         count,
         setCount,
         openProductDetail,
         closeProductDetail,
         isProductDetailOpen,
         productToShow,
         setProductToShow,
         cartProducts,
         setCartProducts,
         isChekoutSideMenOpen,
         openChekoutSideMenu,
         closeChekoutSideMenu,
         order,
         setOrder,
         items,
         setItems,
         searchByTitle,
         setSearchByTitlte,
         filteredItems,
         searchByCategory,
         setSearchByCategory
      }}>
         {children}
      </ShoppingCartContext.Provider>
   ) 
}

