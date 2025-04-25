export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const dateArray = dateObj.toISOString().split("T");
    dateArray[0] = dateArray[0].split("-").reverse().join("/");
    
  return `${dateArray[0]} ${dateArray[1].split(".")[0]}`;
};
