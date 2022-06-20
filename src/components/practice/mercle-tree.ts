export const transactions = ['tx1', 'tx2', 'tx3', 'tx4'];

let hashes = [];

for(let i=0;i < transactions.length;i++){
  hashes.push(transactions[i])
}

let count = transactions.length;
let offset = 0;

while(count >= 1){
  for(let i=0; i < count - 1; i+=2){
    hashes.push(hashes[offset + i]+hashes[offset + i + 1]);      
  }
  offset+=count;
  count = count / 2;
}

console.log(hashes)