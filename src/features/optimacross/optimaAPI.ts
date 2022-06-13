const RAW_URL = 'https://gist.githubusercontent.com/avydashenko/e1702c1ef26cddd006da989aa47d4f62/raw/067f7b75946baf7faf5b8afcd04c66ecf0b47486/view.json'

export async function fetchData () {
    const response = await fetch(RAW_URL);  
  return await response.json();
}


