interface Trip {
  id: string;
  title: string;
  destination?: string;
  departure?: Date | string;
  arrival?: Date | string;
  expenses?: number | null;
}

export default Trip;
