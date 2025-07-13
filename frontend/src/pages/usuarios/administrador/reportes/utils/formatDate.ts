export const formatDate = (date: string) => {
    const dateObj = new Date(date);


  return dateObj.toLocaleString(); // Remove seconds from the string
};
