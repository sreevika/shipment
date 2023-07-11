interface SelectedFilterListInfo {
  field: string;
  filterType: number; //  1= status filter , 2 : shipper/recipent filter 3. card filter 4. tracking number
  sectionValue: any;
  type: string;
  filterVariable: string;
  display: any;
  key: string;
}

export default SelectedFilterListInfo;
