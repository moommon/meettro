import { SECOND, CONSONANT } from "./ground.js";

//자음 추출
// export const getConstantVowel = (kor) => {
//   const ga = 44032;
//   let uni = kor.charCodeAt(0);

//   uni = uni - ga;

//   let fn = parseInt(uni / 588);

//   return CONSONANT[fn];
// };

export const getConstantVowel = (str) => {
  const isHangul = (char) => {
    const charCode = char.charCodeAt(0);
    return (
      (charCode >= 0x1100 && charCode <= 0x11ff) || // Hangul Jamo
      (charCode >= 0x3130 && charCode <= 0x318f) || // Hangul Compatibility Jamo
      (charCode >= 0xac00 && charCode <= 0xd7a3) // Hangul Syllables
    );
  };
  if (isHangul(str)) {
    console.log("한글");
    const ga = 44032;
    let uni = str.charCodeAt(0);
    uni = uni - ga;
    let fn = parseInt(uni / 588);
    return CONSONANT[fn];
  } else {
    return str.charAt(0);
  }
};

// 각도랑, 초 계산
export const checkAngle = (shovelEl) => {
  const computedStyle = window.getComputedStyle(shovelEl);
  const currentAngle = computedStyle
    .getPropertyValue("transform")
    .split(",")[1];

  return Math.asin(currentAngle) * (180 / Math.PI);
};

export const checkSecond = (angle) => {
  return (angle / 89) * SECOND;
};
