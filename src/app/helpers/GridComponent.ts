
export class GridComponent{
   
    sort: any;

   
    changeSorting(columnName,event): void{
     var sort = this.sort;
    if (sort.column == columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
  }
}