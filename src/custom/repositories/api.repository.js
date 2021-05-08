import { Api } from "../classes/api.classes";


/**
 * @return Api
 */

// Start Info
let info = false;
export function getInfoApi() {
  if (!info) {
    info = new Api("/info");
  }
  return info;
}
let infoSet = false;
export function setInfoApi() {
  if (!infoSet) {
    infoSet = new Api("/info/set");
  }
  return infoSet;
}
// End Info

// Start Cate
let catelogy = false;
export function getCateApi() {
  if (!catelogy) {
    catelogy = new Api("/catelogies");
  }
  return catelogy;
}
let catelogySet = false;
export function setCateApi() {
  if (!catelogySet) {
    catelogySet = new Api("/catelogies/set");
  }
  return catelogySet;
}
// End Cate

// Start Promotion
let promotion = false;
export function getPromotionApi() {
  if (!promotion) {
    promotion = new Api("/promotion");
  }
  return promotion;
}
let promotionSet = false;
export function setPromotionApi() {
  if (!promotionSet) {
    promotionSet = new Api("/promotion/set");
  }
  return promotionSet;
}
// End Promotion

// Start Service
let service = false;
export function getServiceApi() {
  if (!service) {
    service = new Api("/service");
  }
  return service;
}
let serviceSet = false;
export function setServiceApi() {
  if (!serviceSet) {
    serviceSet = new Api("/service/set");
  }
  return serviceSet;
}
// End Service

// Start Slide
let slide = false;
export function getSlideApi() {
  if (!slide) {
    slide = new Api("/slide");
  }
  return slide;
}
let slideSet = false;
export function setSlideApi() {
  if (!slideSet) {
    slideSet = new Api("/slide/set");
  }
  return slideSet;
}
// End Slide


// Start Product
let product = false;
export function getProductApi() {
  if (!product) {
    product = new Api("/product");
  }
  return product;
}
let productSet = false;
export function setProductApi() {
  if (!productSet) {
    productSet = new Api("/product/set");
  }
  return productSet;
}
// End Product

// Start delete
let dele = false;
export function deleteApi() {
  if (!dele) {
    dele = new Api("/delete/item");
  }
  return dele;
}



//  let apiQuestionAnswers = false;
//  export function questionAnswersApi() {
//    if (!apiQuestionAnswers) {
//     apiQuestionAnswers = new Api("/questionanswers");
//    }
//    return apiQuestionAnswers;
//  }
 