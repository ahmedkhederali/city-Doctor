import image1 from "../../assets/gldia.jfif";
import image2 from "../../assets/asnan.jfif";
import image3 from "../../assets/ezam.jfif";
import image4 from "../../assets/nfsi.jfif";
import image5 from "../../assets/nsa.jfif";
import image6 from "../../assets/mokh.jfif";
import image7 from "../../assets/anf.jfif";
import image8 from "../../assets/alagtbi3i.jpg";
import image9 from "../../assets/albwaw3ia.jpg";
import image10 from "../../assets/btnaa.jpg";
import image12 from "../../assets/haknmahgri.jpg";
import image11 from "../../assets/esbatmla3b.webp";
import image13 from "../../assets/oyon.jpg";

import { jwtDecode } from "jwt-decode";

//Decode the Token and Get User Role
export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role; // Assuming the role is stored in the `role` field
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
// Utility function to convert numbers to Arabic numerals
export const convertDecimalToArabicNumerals = (number=0) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.toString().split('').map(num => arabicNumerals[num] || num).join('');
};
// Map image imports to indices
export const imageMap = {
    0: image1,
    1: image2,
    2: image3,
    3: image4,
    4: image5,
    5: image6,
    6: image7,
    7:image8,
    8:image9,
    9:image10,
    10:image11,
    11:image12,
    12:image13

  };

  export const calculateAverageRating = (ratings) => {
    if (!ratings.length) return 0;
  
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return parseFloat((total / ratings.length).toFixed(1));
  };

  // Function to translate days and time
  export const translateDayAndTime = (day, time) => {
  const daysMap = {
    Sunday: "الأحد",
    Monday: "الاثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
    Saturday: "السبت",
  };

  let [hour, period] = time.split(" ");
  hour = hour.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

  period = period === "م" ? "مساءا" : "صباحا";

  return {
    translatedDay: daysMap[day],
    translatedTime: `${hour} ${period}`,
  };
};
export const consvertToArName=(name)=>{
  if(name === "medical"){
    return "معمل طبي"
  }else{
    return "مركز أشعة"
  }
}
export function convertToArabicNumerals(number="") {
  // Define Arabic numeral mapping
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  
  // Convert number to string to handle each digit
  const numberString = number?.toString();
  
  // Map each digit to its Arabic numeral
  return numberString.split('').map(digit => arabicNumerals[digit]).join('');
}

// Function to convert numbers to Arabic numerals
const toArabicNumerals = (number) => {
  const arabicNumerals = '٠١٢٣٤٥٦٧٨٩';
  return number.toString().replace(/\d/g, (digit) => arabicNumerals[digit]);
};

// Function to translate month names to Arabic
const getArabicMonth = (month) => {
  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  return months[month];
};

// Function to format the date and time in Arabic
export const formatArabicDateTime = (date) => {
  const dt = new Date(date);
  const day = toArabicNumerals(dt.getDate());
  const month = getArabicMonth(dt.getMonth());
  const year = toArabicNumerals(dt.getFullYear());
  const hours = toArabicNumerals(dt.getHours().toString().padStart(2, '0'));
  const minutes = toArabicNumerals(dt.getMinutes().toString().padStart(2, '0'));

  // Format time based on AM/PM
  const amPm = dt.getHours() >= 12 ? 'م' : 'ص';
  
  return `${day} ${month} ${year} ${hours}:${minutes} ${amPm}`;
};

export const removeTokenWhneStatus401=(status)=>{
  if(Number(status)=== 401){
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
  }
}