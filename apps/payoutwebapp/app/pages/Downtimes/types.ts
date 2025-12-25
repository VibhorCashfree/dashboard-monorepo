export type DowntimesProps = {
  fundSources: AnyObject[];
  downtimes: AnyObject[];
  fetchDowntimes: (obj: { type: string }) => void;
};
