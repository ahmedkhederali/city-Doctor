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