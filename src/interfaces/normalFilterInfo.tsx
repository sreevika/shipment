interface NormalFilterInfo {
  [section: string]: {
    field: any;
    sectionValue: any;
    type: string;
    filterVariable: string;
    display: string;
    filterType: string;
    checkedStatus: boolean;
    count: number;
    displayFilterTab: string;
    orginalData: any[];
  };
}

export default NormalFilterInfo;
