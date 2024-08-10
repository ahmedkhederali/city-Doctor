import image1 from "../../assets/gldia.jfif";
import image2 from "../../assets/asnan.jfif";
import image3 from "../../assets/ezam.jfif";
import image4 from "../../assets/nfsi.jfif";
import image5 from "../../assets/nsa.jfif";
import image6 from "../../assets/mokh.jfif";
import image7 from "../../assets/anf.jfif";
// Map image imports to indices
export const imageMap = {
    0: image1,
    1: image2,
    2: image3,
    3: image4,
    4: image5,
    5: image6,
    6: image7
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

  period = period === "PM" ? "مساءا" : "صباحا";

  return {
    translatedDay: daysMap[day],
    translatedTime: `${hour} ${period}`,
  };
};

export function convertToArabicNumerals(number) {
  // Define Arabic numeral mapping
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  
  // Convert number to string to handle each digit
  const numberString = number.toString();
  
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
