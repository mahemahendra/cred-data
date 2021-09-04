export const generateBarCodeText = () => {
    const first3Number = _generateBarCodeFormat(3, 'NUM');
    const first3Text = _generateBarCodeFormat(3);
    const second4Number = _generateBarCodeFormat(3, 'NUM');
    const second4ext = _generateBarCodeFormat(4);
    const second5Number = _generateBarCodeFormat(5, 'NUM');
    return first3Number+first3Text+second4Number+second4ext+second5Number;
}

const _generateBarCodeFormat = (len = 19, type = 'text') => {
    let p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(type === 'NUM') {
        p = "0123456789";
    }
    return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'');
}