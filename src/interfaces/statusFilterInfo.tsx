interface StatusFilterInfo {
  [section: string]: {
    field: any;
    sectionValue: any;
    display: string;
    checkedStatus: boolean;
    count: number;
  };
}

export default StatusFilterInfo;
