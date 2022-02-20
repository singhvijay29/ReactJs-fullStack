import ReactPaginate from 'react-paginate';
import "./AllVehical.css";
import React, { useState, useEffect } from "react";

function AllVehical(currentPage) {
  const [product, setProduct] = useState([]);

  const getProduct = async (currentPage) => {
    const response = await fetch(`http://localhost:1999/api/vehical?page=${currentPage}&limit=6`, {
      mode: "cors",
    });
    const data = await response.json();
    console.log(data.data);

    setProduct(data.data);
  };
  useEffect(() => {
    getProduct();
  }, [currentPage]);

const [searchTerm , setSearchTerm] = useState('');



const handlePageClick = async(data) => {
  
  let currentPage = data.selected +1;
  console.log(currentPage)
  const commentFromServer = await getProduct(currentPage);
  setProduct(commentFromServer)

}



  return (
    <div className="whole-body">
   <div className="container">
   <div className="search-box">
      <input type="text" className="search-input" placeholder="Search.." onChange={event =>{setSearchTerm(event.target.value)}}/>

      <button className="search-button">
        <i className="fas fa-search"></i>
      </button>
   </div>
   </div>

      <div className="inner-body">
          <div className="div-body">
              <div>Registration No</div>
              <div>Vehicle</div>
              <div>From</div>
              <div>To</div>
              <div>Capacity</div>
          </div>
      {product.filter((val)=>{
          if(searchTerm === ""){
              return val
          }else if(val.vehicles.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
          }
      }).map((data, ind)=>
          <ul className="ul-body" key={ind}>
            <li className="li-body">
                <div>{data.registration_no}</div>
                <div>{data.vehicles}</div>
                <div>{data.from}</div>
                <div>{data.to}</div>
                <div>{data.capacity}</div>
            </li>
          </ul>
          
        )}
      </div>
    
    <div className="pagination-body">
    <ReactPaginate 
    justifyContent={'center'}
    marginPagesDisplayed={'auto'}
    previous={'previous'}
    nextLabel={'next'}
    breakLabel={'...'}
    pageCount={25}
    marginPagesDisplayed={5}
    pageRangeDisplayed={10}
    onPageChange={handlePageClick}
    containerClassName={'pagination'}
    
    pageClassName={'page-item'}
    pageLinkClassName={'page-link'}
    previousClassName={'page-item'}
    previousLinkClassName={'page-link'}
    nextClassName={'page-item'}
    nextLinkClassName={'page-link'}
    breakClassName={'page-item'}
    breakLinkClassName={'page-link'}
    activeClassName={'active'}
    />
  </div>
  </div>
    

  );
}

export default AllVehical;
