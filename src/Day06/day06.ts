const waysToBeatRecordDistance = (time: number, dist: number) => {
  // dist=t*(time-t)=t*time-t^2  =>  t^2-time*t+dist=0
  // ax^2+bx+c=0  =>  x=(-b+-sqrt(b^2-4ac))/2a
  const t1 = (time - Math.sqrt(time * time - 4 * dist)) / 2;
  const t2 = (time + Math.sqrt(time * time - 4 * dist)) / 2;
  const intsBetween = Math.ceil(t2) - Math.floor(t1) - 1;
  return intsBetween;
};

export const solveStar1 = (input: string[]) => {
  const [times, dists] = input.map((line) =>
    line.split(":")[1].split(" ").map(Number).filter(Boolean)
  );

  return times
    .map((time, index) => waysToBeatRecordDistance(time, dists[index]))
    .reduce((acc, curr) => acc * curr, 1);
};

export const solveStar2 = (input: string[]) => {
  const [time, dist] = input
    .map((line) => line.split(":")[1].replaceAll(" ", ""))
    .map(Number);

  return waysToBeatRecordDistance(time, dist);
};
