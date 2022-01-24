import {v4 as uuid} from 'uuid';

let inventory = [
    {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Item 1',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        price: 50,
        itemStatus: 'Available for delivery',
        warehouseLocation: 'INDIA', 
        totalItemStock: 10,
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        createdOn: new Date(),
        lastUpdatedOn: null,
        imgUrl: null
    }
];

export const getInventoryList = (req, res) => {
    const {
        search = '', 
        offset = 0, 
        limit = 10, 
        filterVal = undefined, 
        sortbyVal = undefined,
        sortbymethod = undefined 
    } = req.query;
    let list = inventory;
    // -- search based on query
    if(Boolean(search)) {
        const regEX = new RegExp(`${search}`, 'gi')
        list = list.filter((ele) => regEX.test(ele.name))
    }
    // -- search based on status
    if(filterVal) {
        const status = filterVal.split(',');
        list = list.filter(el => status.indexOf(el.itemStatus) !== -1);
    }
    // -- sorting filter
    if(sortbyVal === 'createdOn') {
        list = list.sort((a,b) => {
            if(new Date(a.createdOn).getTime() > new Date(b.createdOn).getTime()) {
                return sortbymethod === 'ascending' ? 1 : -1;
            }
            if(new Date(a.createdOn).getTime() < new Date(b.createdOn).getTime()) {
                return sortbymethod === 'ascending' ? -1 : 1;
            }
            return 0;
        });
    }
    // -- offset and limit
    list = list.slice(offset * limit, limit);
    console.log('get inventory list api is called ');
    setTimeout(() => {
        res.send({data: list, count: list.length, query: req.query}, 200);
    }, 300); // -- just for simulating the api delay
};

export const createInventoryItem = (req, res) => {
    const {userid = undefined} = req.headers;
    const body = req.body;
    inventory.push({...body, id: uuid(), createdBy: userid, createdOn: new Date(), lastUpdatedOn: null});
    console.log('created new item');
    res.send({message: 'Successfully created the item'}, 201);
}

export const updateInventoryItem = (req, res) => {
    let index = inventory.findIndex((ele) => ele.id === req.params.id);
    inventory[index] = {
        ...inventory[index],
        ...req.body,
        lastUpdatedOn: new Date()
    };
    console.log('updated the item with id: ' + inventory[index].id);
    res.send({message: 'Successfully updated the item'}, 200);
}

export const  getInventoryItem = (req, res) => {
    const item = inventory.find((ele) => ele.id === req.params.id);
    console.log('get innventory item called');
    res.send({data: item}, 200);
}

export const deleteInventoryItem = (req, res) => { 
    inventory = inventory.filter((ele) => ele.id !== req.params.id);
    console.log('deleted the item with id: ' + req.params.id);
    res.send({message: 'Successfully deleted the item'}, 200);
};