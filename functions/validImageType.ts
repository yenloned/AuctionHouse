export const validImageType = (event: any): boolean => {
    try{
        if(!(/^image\/.*/.test(event.target.files[0].type))){
            return false
        }
    }catch(e){
        return false
    }

    return true;
}