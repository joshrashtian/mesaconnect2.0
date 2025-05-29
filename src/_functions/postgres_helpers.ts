export const formatPostgresInterval = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  }
};

export const parsePostgresInterval = (intervalString: string) => {
  if (!intervalString) return 15;
  
  const hoursMatch = intervalString.match(/(\d+)\s*hours?/);
  const minutesMatch = intervalString.match(/(\d+)\s*minutes?/);
  
  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
  
  return hours * 60 + minutes;
};
