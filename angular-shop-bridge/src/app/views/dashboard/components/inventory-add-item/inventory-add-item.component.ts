import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InventoryService } from '@app/api/inventory.service';
import { ToastHandlerService, ToastStatus } from '@app/common/services/toast-handler.service';

@Component({
  selector: 'app-inventory-add-item',
  templateUrl: './inventory-add-item.component.html',
  styleUrls: ['./inventory-add-item.component.scss']
})
export class InventoryAddItemComponent {

  reader = new FileReader();
  uploadedImage: ArrayBuffer | undefined;
  itemId: string = '';
  itemModel: ItemForm = {
    name: '',
    description: '',
    price: null,
    itemStatus: '',
    warehouseLocation: '', 
    totalItemStock: null,
  };

  @Input() implementationInfo = 'add';
  @Input() set itemInfo(val: any) {
    /**istanbul ignore else */
    if(val){ 
      this.itemId = val.id
      this.uploadedImage = val.imgUrl;
      this.itemModel = {...val};
    }
  }

  @Output() readonly actionEmition: EventEmitter<any> = new EventEmitter<any>();

  itemStatus = [
    {
      id: 'available',
      name: 'Available for delivery'
    },
    {
      id: 'unavailable',
      name: 'Unavailable for delivery'
    }
  ];

  warehouseLocation = [
    {
      id: 'in',
      name: 'INDIA'
    },
    {
      id: 'us',
      name: 'UNITED STATES'
    }
  ];
  invalidFileFormatError: boolean | undefined;
  constructor(
    private inventoryService: InventoryService,
    private toastHandler: ToastHandlerService
  ) { }

  onActionButtonClick(form: NgForm) {
    if(form.valid) {
      if(this.implementationInfo === 'add') {
        this.addNewItem();
      } else {
        this.editNewItem();
      }
    }
  }

  fileUpload(event: Event): void {
    let eventRef = (event.target as HTMLInputElement).files;
    if(eventRef && eventRef.length) {
      const selectedFile = eventRef[0];
      if(selectedFile.size / 1024 > 100) {
        this.toastHandler.showToast(ToastStatus.ERROR, 'Please upload a file of size less than 100kb'); // --coverage not implemented
      } else {
        if (
          selectedFile.type === 'image/png' ||
          selectedFile.type === 'image/jpg' ||
          selectedFile.type === 'image/jpeg'
        ) {
          this.reader.readAsDataURL(selectedFile);
          this.reader.onload = () => {
            this.uploadedImage = this.reader.result as ArrayBuffer;
          };
        } else {
          this.toastHandler.showToast(ToastStatus.ERROR, 'Invalid file format !, please upload file with following format(PNG, JPG, JPEG)');
        }
      }
    }
  }

  addNewItem() {
    const userId = localStorage.getItem('userId') || 'test-id';
    this.inventoryService.createInventoryItem(userId,{
      ...this.itemModel,
      imgUrl: this.uploadedImage
    }).subscribe((res) => {
      this.toastHandler.showToast(ToastStatus.SUCCESS, res.message);
      this.actionEmition.emit(true);
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, err.error.message);
    });
  }

  editNewItem() {
    this.inventoryService.updateInventoryItem(this.itemId,{
      ...this.itemModel,
      imgUrl: this.uploadedImage
    }).subscribe((res) => {
      this.toastHandler.showToast(ToastStatus.SUCCESS, res.message);
      this.actionEmition.emit(true);
    }, err => {
      this.toastHandler.showToast(ToastStatus.ERROR, err.error.message);
    });
  }

}

export interface ItemForm { 
  name: string | null;
  description: string;
  price: number  | null;
  itemStatus: string  | null;
  warehouseLocation: string  | null; 
  totalItemStock: number  | null;
}