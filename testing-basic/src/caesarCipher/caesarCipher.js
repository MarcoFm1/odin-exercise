export default function caesarCipher(k, str){
    const alf = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let preword = [];

    for(let i = 0 ; i<=str.length - 1 ; i++){
        preword.push(str[i])
    }

    let newWord = preword.map(item => {
        for(let i = 0; i < alf.length ; i++){
            if(item === alf[i]){
                return alf[(i+k)%alf.length]
            }
        }

        return item;
    }).join("")

    return newWord;
}
