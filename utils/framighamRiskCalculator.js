/**
 * Framingham Risk Score Calculator
 * Calculates 10-year cardiovascular risk based on Framingham Heart Study methodology
 */

const getAgePoints = (age, gender) => {
  if (gender === 'femme') {
    if (age >= 20 && age <= 34) return -7;
    if (age >= 35 && age <= 39) return -3;
    if (age >= 40 && age <= 44) return 0;
    if (age >= 45 && age <= 49) return 3;
    if (age >= 50 && age <= 54) return 6;
    if (age >= 55 && age <= 59) return 8;
    if (age >= 60 && age <= 64) return 10;
    if (age >= 65 && age <= 69) return 12;
    if (age >= 70 && age <= 74) return 14;
    if (age >= 75 && age <= 79) return 16;
  } else {
    if (age >= 20 && age <= 34) return -9;
    if (age >= 35 && age <= 39) return -4;
    if (age >= 40 && age <= 44) return 0;
    if (age >= 45 && age <= 49) return 3;
    if (age >= 50 && age <= 54) return 6;
    if (age >= 55 && age <= 59) return 8;
    if (age >= 60 && age <= 64) return 10;
    if (age >= 65 && age <= 69) return 11;
    if (age >= 70 && age <= 74) return 12;
    if (age >= 75 && age <= 79) return 13;
  }
  return 0;
};

const getCholesterolPoints = (cholesterol, age, gender) => {
  const isWoman = gender === 'femme';
  
  if (age >= 20 && age <= 39) {
    if (cholesterol < 160) return 0;
    if (cholesterol < 200) return 4;
    if (cholesterol < 240) return isWoman ? 8 : 7;
    if (cholesterol < 280) return isWoman ? 11 : 9;
    return isWoman ? 13 : 11;
  }
  if (age >= 40 && age <= 49) {
    if (cholesterol < 160) return 0;
    if (cholesterol < 200) return 3;
    if (cholesterol < 240) return isWoman ? 6 : 5;
    if (cholesterol < 280) return isWoman ? 8 : 6;
    return isWoman ? 10 : 8;
  }
  if (age >= 50 && age <= 59) {
    if (cholesterol < 160) return 0;
    if (cholesterol < 200) return 2;
    if (cholesterol < 240) return isWoman ? 4 : 3;
    if (cholesterol < 280) return isWoman ? 5 : 4;
    return isWoman ? 7 : 5;
  }
  if (age >= 60 && age <= 69) {
    if (cholesterol < 160) return 0;
    if (cholesterol < 200) return 1;
    if (cholesterol < 240) return 2;
    if (cholesterol < 280) return 3;
    return isWoman ? 4 : 3;
  }
  if (age >= 70 && age <= 79) {
    if (cholesterol < 160) return 0;
    if (cholesterol < 200) return 1;
    if (cholesterol < 240) return 1;
    if (cholesterol < 280) return 2;
    return 2;
  }
  return 0;
};

const getSmokingPoints = (isSmoker, age, gender) => {
  if (!isSmoker) return 0;
  
  const isWoman = gender === 'femme';
  if (age >= 20 && age <= 39) return isWoman ? 9 : 8;
  if (age >= 40 && age <= 49) return isWoman ? 7 : 5;
  if (age >= 50 && age <= 59) return isWoman ? 4 : 3;
  if (age >= 60 && age <= 69) return isWoman ? 2 : 1;
  if (age >= 70 && age <= 79) return isWoman ? 1 : 1;
  return 0;
};

const getHDLPoints = (hdl) => {
  if (hdl >= 60) return -1;
  if (hdl >= 50) return 0;
  if (hdl >= 40) return 1;
  return 2;
};

const getSystolicBPPoints = (systolic, isTreated, gender) => {
  const isWoman = gender === 'femme';
  
  if (isTreated) {
    if (systolic < 120) return 0;
    if (systolic < 130) return isWoman ? 3 : 1;
    if (systolic < 140) return isWoman ? 4 : 2;
    if (systolic < 160) return isWoman ? 5 : 2;
    return isWoman ? 6 : 3;
  } else {
    if (systolic < 120) return 0;
    if (systolic < 130) return isWoman ? 1 : 0;
    if (systolic < 140) return isWoman ? 2 : 1;
    if (systolic < 160) return isWoman ? 3 : 1;
    return isWoman ? 4 : 2;
  }
};

const getRiskPercentage = (totalPoints, gender) => {
  const isWoman = gender === 'femme';
  
  if (isWoman) {
    if (totalPoints < 9) return '<1%';
    if (totalPoints <= 9) return '1%';
    if (totalPoints <= 12) return '1%';
    if (totalPoints <= 14) return '2%';
    if (totalPoints === 15) return '3%';
    if (totalPoints === 16) return '4%';
    if (totalPoints === 17) return '5%';
    if (totalPoints === 18) return '6%';
    if (totalPoints === 19) return '8%';
    if (totalPoints === 20) return '11%';
    if (totalPoints === 21) return '14%';
    if (totalPoints === 22) return '17%';
    if (totalPoints === 23) return '22%';
    if (totalPoints === 24) return '27%';
    return '>30%';
  } else {
    if (totalPoints <= 0) return '<1%';
    if (totalPoints <= 4) return '1%';
    if (totalPoints <= 6) return '2%';
    if (totalPoints === 7) return '3%';
    if (totalPoints === 8) return '4%';
    if (totalPoints === 9) return '5%';
    if (totalPoints === 10) return '6%';
    if (totalPoints === 11) return '8%';
    if (totalPoints === 12) return '10%';
    if (totalPoints === 13) return '12%';
    if (totalPoints === 14) return '16%';
    if (totalPoints === 15) return '20%';
    if (totalPoints === 16) return '25%';
    return '>30%';
  }
};

const getRiskLevel = (riskPercentage) => {
  const percentValue = parseInt(riskPercentage.replace('%' , '').replace('>','').replace('<',''));
  if (percentValue < 5) return 'faible';
  if (percentValue < 10) return 'modéré';
  return 'élevé';
};

export const calculateFraminghamScore = ({
  age,
  gender,
  totalCholesterol,
  hdlCholesterol,
  systolic,
  isSmoker,
  bpTreated = false,
}) => {
  if (!age || !gender || totalCholesterol === undefined || hdlCholesterol === undefined || systolic === undefined) {
    return null;
  }

  const agePoints = getAgePoints(parseInt(age), gender);
  const cholesterolPoints = getCholesterolPoints(parseInt(totalCholesterol), parseInt(age), gender);
  const smokingPoints = getSmokingPoints(isSmoker === 'oui' || isSmoker === true, parseInt(age), gender);
  const hdlPoints = getHDLPoints(parseInt(hdlCholesterol));
  const bpPoints = getSystolicBPPoints(parseInt(systolic), bpTreated, gender);

  const totalPoints = agePoints + cholesterolPoints + smokingPoints + hdlPoints + bpPoints;
  const riskPercentage = getRiskPercentage(totalPoints, gender);
  const riskLevel = getRiskLevel(riskPercentage);

  return {
    totalPoints,
    riskPercentage,
    riskLevel,
    breakdown: {
      agePoints,
      cholesterolPoints,
      smokingPoints,
      hdlPoints,
      bpPoints,
    },
  };
};

export default calculateFraminghamScore;
