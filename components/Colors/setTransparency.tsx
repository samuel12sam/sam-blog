export default function setTransparency(hexColorString:string,transparencyValue:number) {
  function percentageToHex(percent:number) {
    // Ensure the input is within the range of 0 to 100
    percent = Math.max(0, Math.min(100, percent));
    
    // Convert percentage to a number between 0 and 255
    const decimalValue = Math.round((percent / 100) * 255);
    
    // Convert the decimal value to hexadecimal
    const hexValue = decimalValue.toString(16).padStart(2, '0'); // Ensure at least two digits
    
    return hexValue;
}
  
  return (
    `${hexColorString}${percentageToHex(transparencyValue)}`
  )
}