import { Component, OnInit } from '@angular/core';
import { InventoryService } from '@app/api/inventory.service';
import { ToastHandlerService, ToastStatus } from '@app/common/services/toast-handler.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  apiInit: boolean = false;
  recordsPerPage: number = 10;
  totalItemCount: number = 0;
  currentPageNo: number = 1;
  currentAction: string = 'add';
  searchQuery: string = '';
  selectedItem: any = undefined;
  itemList: any[] = [];
  currentSuggestionValues: any[] = []
  openOverlayUI: boolean = false;
  date = new Date();
  reloadTheUI: boolean = false;
  customFilterConfig = {
    sortConfig: {
      createdOn: {
        label: 'Created On',
        value: false,
        sortType: 'ascending'
      }
    },
    filterConfig: {
      unavailable_for_delivery: {
        label: 'Unavailable for delivery',
        value: false,
        key: 'unavailable_for_delivery'
      },
      available_for_delivery: {
        label: 'Available for delivery',
        value: false,
        key: 'available_for_delivery'
      }
    }
  };
  filterVal: string[] | undefined;  
  sortbyVal: string | undefined;
  sortbymethod: string | undefined;
  constructor(
    private inventoryService: InventoryService,
    private toastHandler: ToastHandlerService
  ) { }

  ngOnInit(): void {
    this.getItemList('list', undefined, this.searchQuery);
  }

  reloadTheList() {
    this.reloadTheUI = true;
    this.getItemList('list', () => {
      this.reloadTheUI = false;
    }, this.searchQuery);
  }

  getItemList(fetchType: string, callback?: any, search?: string) {
    this.inventoryService.getInventoryList(
      Boolean(search) ? search : undefined, // --search query param.
      this.currentPageNo, // -- offset
      this.recordsPerPage, // -- limit
      fetchType === 'list' ? this.filterVal : undefined, 
      fetchType === 'list' ? this.sortbyVal : undefined, 
      fetchType === 'list' ? this.sortbymethod : undefined
    ).pipe(
      finalize(() => {
        if(!this.apiInit) {
          this.apiInit = true;
        }
        if(callback) {
          callback();
        }
      })
    )
    .subscribe(
      (res: any) => {
        if (!res) {
          this.toastHandler.showToast(
            ToastStatus.ERROR,
            'No result Found'
          );
        } else {
          if(fetchType === 'list') {
            console.log(res)
            this.itemList = res.data;
            this.totalItemCount = res.count;
          } else {
            this.currentSuggestionValues = res.data.map((ele: any) => {
              return {
                ...ele,
                value: ele.name
              }
            });
          }
        }
      },
      (err) => {
        this.toastHandler.showToast(ToastStatus.ERROR, err.error.message);
      }
    )
  }

  fetchSuggestion(query: string) {
    this.getItemList('suggestion', undefined, query);
  }

  filterAction(event: any) {
    // -- filter by
    this.filterVal = [];
    for(let key in event.filterConfig) {
      this.filterVal.push(event.filterConfig[key]);
    }
    // -- sort by
    this.sortbyVal = undefined;
    this.sortbymethod = undefined;
    for(let key in event.sortConfig) {
      this.sortbyVal = key;
      this.sortbymethod= event.sortConfig[key]
    }
    this.getItemList('list', undefined, this.searchQuery);
  }

  displayActivePage(event: number) {
    /**istanbul ignore else */
    if(this.currentPageNo !== event) {
      this.currentPageNo = event;
      this.getItemList('list', undefined, this.searchQuery);
    }
  }

  closeOverlay() {
    this.openOverlayUI = false;
  }

  addItem() {
    this.currentAction = 'add'
    this.selectedItem = undefined;
    this.openOverlayUI = true;
  }

  showItemDetail(item: any) {
    this.currentAction = 'detail'
    this.selectedItem = item;
    this.openOverlayUI = true;
  }

  editItem(item: any) {
    this.currentAction = 'edit'
    this.selectedItem = item;
    this.openOverlayUI = true;
  }

  deleteItem(item: any) {
    this.inventoryService.deleteInventoryItem(item.id).subscribe((res) => {
      this.toastHandler.showToast(ToastStatus.SUCCESS, res.message);
      this.getItemList('list', undefined, this.searchQuery);
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, err.error.message);
    });
  }

  suggestionSelected(val: any) {
    this.currentAction = 'detail'
    this.selectedItem = val;
    this.openOverlayUI = true;
  }

  overlayAction() {
    this.openOverlayUI = false;
    this.reloadTheList();
  }

  searchByValue(query: string) {
    this.searchQuery = query
    this.getItemList('list', undefined, query);
  } 

}
