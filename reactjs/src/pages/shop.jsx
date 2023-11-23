/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import Shopitems from '../components/shopitems';
import Newsletter from '../components/newsletter';
import Hero from '../components/hero';
import Pagination from '../components/pagination';
import PriceFilter from '../components/PriceFilter';
import '../styles/shop.scss'
import { PRODUCTS } from '../components/products';
import { PRODUCTS1 } from '../components/products';
const shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items to display per page
  // Combine and deduplicate PRODUCTS and PRODUCTS1
  const allProducts = [...PRODUCTS, ...PRODUCTS1];
  const uniqueProducts = Array.from(new Set(allProducts.map((product) => product.id))).map((id) => {
    return allProducts.find((product) => product.id === id);
  });

  const totalItems = uniqueProducts.length; // Total number of unique items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = uniqueProducts.slice(startIndex, endIndex);

  return (<>
    <section className="shop-banner p-5">
      <div className="container-xxl">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8 col-lg-6 text-center">
          </div>
        </div>
      </div>
    </section>

    <section className="featured-products my-5 py-4 " >
      <div className='content'>
        <div className='side-bar'>
          <PriceFilter />
        </div>
        <div className="container-xxl" >
          <div className="row shopitems" >
            <Shopitems products={paginatedProducts} />
          </div>
        </div>
      </div>
    </section>

    {/* <section className="featured-products my-5 py-4 " >
      <div  style={{ display: 'flex' }}>
        <PriceFilter style={{ flex: '0 0 20%' }} />
        <div className="container-xxl" >
          <div className="row" >
            <Shopitems style={{ flex: '1' }} />
          </div>
        </div>
      </div>
    </section> */}

    <section className="pagination p-2">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 align-items-center justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
    <Hero />

    <Newsletter />
  </>
  );
}

export default shop