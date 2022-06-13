import {RawContent} from './types';

export const getParentChildrenMap = (raw: RawContent) => {
  const categoriesParentChildren: Record<number, Array<number>> = {}

    for (let i=0; i<raw.parentEntityLongIds.length; i++){
      const each = raw.parentEntityLongIds[i];      

      if(each===-1){
        if(!categoriesParentChildren[0]){
          categoriesParentChildren[0] = [];
        }        
        categoriesParentChildren[0].push(raw.entityLongIds[i])
      } else {

      if(!categoriesParentChildren[each]){
        categoriesParentChildren[each]=[];        
      }
        categoriesParentChildren[each].push(raw.entityLongIds[i]);
      }
    }

    return categoriesParentChildren
}

export const getItems = (array: Array<number>, parentChildren: Record<string, Array<any>>) => {

  const res: Record<number, any> = {};
  
  array.forEach((each)=>{
    const children = parentChildren[each];

    if(!res[each]){
      res[each] = {       
        value: each
      }
    }

    if(!children){          
      return null;
    }

    else {     
      res[each].children = (getItems(children, parentChildren));                  
    }  
  });  

  return res   
}
