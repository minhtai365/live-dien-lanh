import { Api } from "../classes/api.classes";

// Start Color

/**
 * @return Api
 */

let apiColor = false;
export function colorApi() {
  if (!apiColor) {
    apiColor = new Api("/colors");
  }
  return apiColor;
}

// End Color

// Start Color

/**
 * @return Api
 */

let apipagingColor = false;
export function colorsPagingApi() {
  if (!apipagingColor) {
    apipagingColor = new Api("/colorspaging");
  }
  return apipagingColor;
}

// End Color

// Start FormReviwApi

let apiCompanies = false;
export function companiesApi() {
  if (!apiCompanies) {
    apiCompanies = new Api("/companies");
  }
  return apiCompanies;
}

// End Companies

// Start apipagingCompanies

/**
 * @return Api
 */

let apipagingCompanies = false;
export function companiesPagingApi() {
  if (!apipagingCompanies) {
    apipagingCompanies = new Api("/companiespaging");
  }
  return apipagingCompanies;
}

// End apipagingCompanies
// Start formReviewApi

/**
 * @return Api
 */

let apiReview = false;
export function formReviewApi() {
  if (!apiReview) {
    apiReview = new Api("/reviews");
  }
  return apiReview;
}

/**
 * @return Api
 */

let apipagingReview = false;
export function formReviewsPagingApi() {
  if (!apipagingReview) {
    apipagingReview = new Api("/reviewspaging");
  }
  return apipagingReview;
}

// End FormReview

let apipagingReviewAnswers = false;
export function formReviewsAnswersPagingApi() {
  if (!apipagingReviewAnswers) {
    apipagingReviewAnswers = new Api("/reviewanswerspaging");
  }
  return apipagingReviewAnswers;
}
// Start ReviwQuesApi

/**
 * @return Api
 */

let apiReviewQuestions = false;
export function reviewQuestionsApi() {
  if (!apiReviewQuestions) {
    apiReviewQuestions = new Api("/reviewquestions");
  }
  return apiReviewQuestions;
}

/**
 * @return Api
 */

let apipagingReviewQuestions = false;
export function reviewQuestionsPagingApi() {
  if (!apipagingReviewQuestions) {
    apipagingReviewQuestions = new Api("/reviewquestionspaging");
  }
  return apipagingReviewQuestions;
}

// End FormReviewQuestions

// Start QuesApi


/**
 * @return Api
 */

let apipagingQuestions = false;
export function questionsPagingApi() {
  if (!apipagingQuestions) {
    apipagingQuestions = new Api("/questionspaging");
  }
  return apipagingQuestions;
}

// End Questions

// Start QuesType

/**
 * @return Api
 */

let apiQuestionsType = false;
export function QuestionsTypeApi() {
  if (!apiQuestionsType) {
    apiQuestionsType = new Api("/questiontypes");
  }
  return apiQuestionsType;
}
// Start formReviewAnswersApi

// /**
//  * @return Api
//  */

//  let apiReviewAnswer = false;
//  export function reviewAnswerApi() {
//    if (!apiReviewAnswer) {
//      apiReviewAnswers = new Api("/reviewanswers");
//    }
//    return apiReviewAnswers;
//  }



// End QuestionsTypeType

// Start review

/**
 * @return Api
 */

let apiReviews = false;
export function ReviewApi() {
  if (!apiReviews) {
    apiReviews = new Api("/reviews");
  }
  return apiReviews;
}

/**
 * @return Api
 */

// Start review

/**
 * @return Api
 */

let apiReviewanswers = false;
export function reviewAnswersApi() {
  if (!apiReviewanswers) {
    apiReviewanswers = new Api("/reviewanswers");
  }
  return apiReviewanswers;
}

/**
 * @return Api
 */


 let apiAllCompanies = false;
 export function companiesAllApi() {
   if (!apiAllCompanies) {
     apiAllCompanies = new Api("/companies/getall");
   }
   return apiAllCompanies;
 }
 let apiAllQuestions = false;
 export function questionsAllApi() {
   if (!apiAllQuestions) {
     apiAllQuestions = new Api("/questions/getall");
   }
   return apiAllQuestions;
 }
 




 let apiAllAnswers = false;
 export function allAnswersApi() {
   if (!apiAllAnswers) {
    apiAllAnswers = new Api("/answers/getall");
   }
   return apiAllAnswers;
 }
 let apiAllReviewAnswers = false;
 export function allReviewAnswersApi() {
   if (!apiAllReviewAnswers) {
    apiAllReviewAnswers = new Api("/reviewanswers/getall");
   }
   return apiAllReviewAnswers;
 }
 let apiAllReview = false;
 export function allReviewApi() {
   if (!apiAllReview) {
    apiAllReview = new Api("/companycheck");
   }
   return apiAllReview;
 }
 //getcompany
 let getCompany = false;
 export function getCompanyApi() {
   if (!getCompany) {
    getCompany = new Api("/companies/getcompany");
   }
   return getCompany;
 }
 let apiupReview = false;
 export function upReviewApi() {
   if (!apiupReview) {
    apiupReview = new Api("/reviewsupdate");
   }
   return apiupReview;
 }
//  reviewsupdate

let apilogin = false;
export function loginApi() {
  if (!apilogin) {
   apilogin = new Api("/login");
  }
  return apilogin;
}
// Start review

/**
 * @return Api
 */

 let apiQuestionAnswers = false;
 export function questionAnswersApi() {
   if (!apiQuestionAnswers) {
    apiQuestionAnswers = new Api("/questionanswers");
   }
   return apiQuestionAnswers;
 }
 
 /**
  * @return Api
  */