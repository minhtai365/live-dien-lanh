// import React, { useState, useEffect } from 'react';
// import { formatMoney, To_slug } from './toSlug';
// import { Link } from 'react-router-dom';
// import { getProductApi } from '../../custom/repositories/api.repository';
// export default function InfiniteList(props) {

//   const [loadMore, setLoadMore] = useState(true);
//   const [total, setTotal] = useState(0);
//   const [current_page, setCurrent_page] = useState(0);

//   useEffect(() => {
//     getData(loadMore);
//     // setLoadMore(false);
//   }, [loadMore]);

//   useEffect(() => {
//     const list = document.getElementById('list')
//     const footerr = document.getElementById('my-foodterr')
//     window.addEventListener('scroll', () => {
//       console.log(total);
//       console.log(props.state.length);
//       if (footerr.offsetTop - footerr.clientHeight < (window.scrollY)) {
//         // console.log(window.scrollY + window.innerHeight);
//         setLoadMore(true);
//       }
//       // else {
//       //   setLoadMore(false);
//       // }
//     });
//   }, [window.scrollY]);
//   const getData = async (load) => {
//     console.log(props.state.length);
//     if (total === props.state.length) {
//       setTotal(0);
//       setCurrent_page(1);
//       setLoadMore(false)
//       console.log('end');
//     }
//     else {

//       let response = await getProductApi().getProductCate({ id: sessionStorage.getItem('cate_id'), rows: 1, current_page:current_page+1 });
//       setTotal(response.total);
//       setCurrent_page(response.current_page);
//       if(response.current_page===response.total){
//         setLoadMore(false);
//       }
//       if (load) {
//         props.setState([...props.state, ...response.data]);
//       }
//     }
//   };

//   return (
//     <ul id='list'>
//       {props.state.map((y, key) =>
//         <div key={key} className="col-lg-3 col-sm-6 col-12 mt-3 py-2 box-slick">
//           <Link to={"/chi-tiet/" + To_slug(y.name)} onClick={() => this.props.getProduct(y)}>
//             <div className="shadow card-slick">
//               <img className="w-100 p-2" src={y.img[0]} width="200" height="250" alt="" />
//               <div className="card-body text-center ">
//                 <div className="title-cart">{y.name}</div>
//                 <strike className="card-text text-danger ">{formatMoney(y.price)} VND</strike>
//               </div>
//             </div>
//           </Link>
//         </div>
//       )}
//     </ul>
//   );
// };