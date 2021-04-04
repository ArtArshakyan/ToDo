export function formatDate(dateStr=""){
    return dateStr.slice(0, 10);
}

export function textTruncate(str = "", maxLength){

    if(!maxLength || str.length<maxLength){
    return str;
    }

return str.slice(0, maxLength)+"...";
}
