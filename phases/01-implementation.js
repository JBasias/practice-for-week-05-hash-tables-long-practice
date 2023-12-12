const sha256 = require('js-sha256');
class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {


    this.count = 0;

    this.capacity = numBuckets; // Number of buckets (size of the array)
    this.data = new Array(numBuckets).fill(null); // Initialize an array to store data

    // Initialize your buckets here
    // Your code here
  }

  hash(key) {

    /*
    const sha256Hash = sha256(key);
    const first8Chars = sha256Hash.substring(0, 8);
    return parseInt(first8Chars, 16);
*/

    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {

    const index = this.hashMod(key);
    this.count++;

    if (this.data[index]) {
      // If a key already exists at this index, check if it matches the current key
      let current = this.data[index];


      while (current) {
        if (current.key === key) {
          // Update the value for the existing key
          current.value = value;
          return; // Exit the method after updating
        }
        current = current.next;
      }

      current = this.data[index];

      let add = new KeyValuePair(key, value);

      add.next = current;
      this.data[index]  = add;

      return;

    }

    this.data[index] = new KeyValuePair(key, value);
    return;
    // Your code here
  }


  read(key) {
    // Your code here

    const index = this.hashMod(key);

    let current = this.data[index];

    while(current!=null && current.key != key)
    {
      current = current.next;
    }

    if(current === null) return undefined;

    return current.value
  }


  resize() {

    this.capacity = this.capacity *2;

    const oldData = this.data;

    this.data = new Array(this.capacity).fill(null);


    for(let A of oldData)
    {
        while(A!=null)
        {

          const index = this.hashMod(A.key);
          let current = this.data[index];
          if(current === null)
          {
            this.data[index] = new KeyValuePair(A.key, A.value);
          }
          else
          {
             let add = new KeyValuePair(A.key, A.value);
             add.next = current;
             this.data[index]= add;
          }

          //this.insert(A.key, A.value);
          A=A.next;
        }

    }

    // Your code here
  }


  delete(key) {

    const index = this.hashMod(key);

    // Check if there's no data at the calculated index
    if (!this.data[index]) {

      return "Key not found";
      //throw new Error("Key not found");
      //return; //false; // Key doesn't exist, return false
    }

    let current = this.data[index];
    let prev = null;

    while (current) {
      if (current.key === key) {
        // Found the key, remove the key-value pair from the linked list
        if (prev) {
          prev.next = current.next; // Update the previous node's next reference
        } else {
          this.data[index] = current.next; // Update the head of the linked list
        }

        this.count--; // Reduce the count of key-value pairs
        return; // true; // Key was deleted, return true
      }

      prev = current;
      current = current.next;
    }

    return "Key not found"; //""


    // Your code here
  }
}


module.exports = HashTable;
