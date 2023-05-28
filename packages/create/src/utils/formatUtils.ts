export function roundToTwoSignificantDigits(num: number): string {
    let wholeNumberDigits = num.toString().split('.')[0].length;
  
    if (num < 1) {
      let parts = num.toString().split('.');
      if (parts.length > 1) {
        let leadingZerosMatch = parts[1].match(/^0*/);
        let leadingZeros = leadingZerosMatch ? leadingZerosMatch[0].length : 0;
        wholeNumberDigits = leadingZeros + 2;
      }
    } else {
      wholeNumberDigits = 2;
    }
  
    return num.toFixed(wholeNumberDigits);
  }
  