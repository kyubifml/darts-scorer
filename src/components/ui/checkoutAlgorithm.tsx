const PREFERRED_DOUBLES = [40, 32, 24, 16]; 

export const checkoutAlgorithm = (score: number): string[] | null => {
  if (score > 170) return null;
  if ([169, 168, 166, 165, 163, 162, 159].includes(score)) {
    return null; 
    }

  if (score === 50) return ['D25'];
  if (score <= 40 && score % 2 === 0) return [`D${score / 2}`];

  if (score <= 110) {
    for (const double of PREFERRED_DOUBLES) {
      const remainder = score - double; 
      if (remainder <= 0) continue;

      
      if (remainder <= 20) return [`${remainder}`, `D${double / 2}`];
      
      if (remainder % 3 === 0 && remainder <= 60) return [`T${remainder / 3}`, `D${double / 2}`];

      if (remainder === 25) return ['25', `D${double / 2}`];
      if (remainder === 50) return ['D25', `D${double / 2}`];
    }
  }

  // (Na razie zaślepka, tu wjedzie najgrubsza logika)
  return ['Trudna droga (do napisania)'];
};