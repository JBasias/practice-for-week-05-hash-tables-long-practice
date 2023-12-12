const HashTable = require('./01-implementation');

function anagrams(str1, str2) {

  if(str1.length != str2.length ) return false;

  let C1 = new HashTable(26);
  let C2 = new HashTable(26);

  for(const c of str1)
  {

    if(C1.read(c)=== undefined)
    {
      C1.insert(c,1);
    }
    else
    {
      C1.insert(c, C1.read(c)+1);
    }
  }


  for(const c of str2)
  {

    if(C2.read(c)=== undefined)
    {
      C2.insert(c,1);
    }
    else
    {
      C2.insert(c, C2.read(c)+1);
    }
  }

  for(const c of str1)
  {
    if(C1.read(c)!=C2.read(c)) return false;
  }

  return true;
  // Your code here
}


function commonElements(A1, A2) {

 /*

  let S1 = new HashTable(A1.length);
  let S2 = new HashTable(A2.length);

  for(const e of A1)
  {
    S1.insert(e,true);
  }

  for(const e of A2)
  {
    S2.insert(e,true);
  }

  let ret=[];

  for(const e of A1)
  {
    if(S2.read(e)!== undefined)
    {
      ret.push(e);
    }
  }

  return ret; */

  // Your code here
}


function duplicate(A) {

  /*
  let B = new HashTable(8);

  for(const e of A)
  {
    if(B.read(e)=== undefined)
    {
      B.insert(e,true);
    }
    else
    {
      return e;
    }
  }

  return 'these are not the droids you are looking for';
*/
  //break;
  // Your code here
}


function twoSum(N, T) {

  /*
  let B=new HashTable(N.length);


  for(const e of N)
  {

    if(B.read(T-e)!== undefined)
    {
      return true;
    }
    else
    {
       B.insert(e,true);
    }
  }

   return false; */
  //break;
  // Your code here
}


function wordPattern(P, S) {

  if(S.length != P.length) return false;

  let M = new HashTable(P.length);
  let N = new HashTable(P.length);

  for(let i=0;i<P.length;i++)
  {
     if(M.read(P[i])=== undefined || N.read(S[i]) === undefined)
     {

        if(!(M.read(P[i])=== undefined&& N.read(S[i]) === undefined))
        {
          return false
        }

        M.insert(P[i],S[i]);
        N.insert(S[i],P[i]);
     }
     else if(M.read(P[i])!== S[i] || N.read(S[i])!==P[i])
     {
        return false;
     }
  }




  return true;
 // break;
  // Your code here
}

/////////////////////////// Extra Credit Problems /////////////////////////////

function newAlphabet(W, A)
{

  let D = new HashTable(26);

  for(let i=0;i<A.length;i++)
  {
    D.insert(A[i],i);
  }

  let cur=0;

  for(const c of W)
  {

    if(D.read(c)<cur)
    {
      return false;
    }
    else
    {
      cur = D.read(c);
    }

  }

  return true;

}

//console.log(newAlphabet('leetcode', 'abcdefghijklmnopqrstuvwxyz') );

function get(c)
{

    return c.charCodeAt(0) - 'a'.charCodeAt(0);
}

function longestSubstr(str)
{

  let D = []; let b=0; let e=1; let ret=0;

  for(let i=0;i<26;i++) D.push(0);

  D[get(str[0])]++;

  while(b<str.length && e<str.length)
  {
      ///console.log(b + ' ----- ' + e + ' ----- ' + D[get(str[e])]);

      while(e<str.length && D[get(str[e-1])]<2)
      {
        D[get(str[e])]++;
        e++;
      }

      ret = Math.max(e-b -1 , ret);

      if(e === str.length) break;
      //D[get(str[e])]++;
      //if(e === str.length)  break;

      //D[get(str[e])]++;

      while(D[get(str[e-1])]>1)
      {
         D[get(str[b])]--;
         b++;
      }

      //D[get(str[b])]--;

  }


  return ret;
}

//console.log(longestSubstr("abcfabcbb") );


function longestPalindrome(str)
{

  let ret=[]; let m='a'.charCodeAt(0)

  for(let i=0;i<26;i++) ret.push(0);

  for(const c of str)
  {
    ret[c.charCodeAt(0) - m]++;
  }

  let add=0; let v=0;

  for(let i=0;i<26;i++)
  {
    if(ret[i]%2 === 1) add=1;

    v+= ret[i]-ret[i]%2;

  }

  v+=add;

  return v;

}

//console.log(longestPalindrome("abbccccdd"));


function coinChange(C, T)
{

  let ret = [];

  ret.push(0);

  for(let i=1;i<=T;i++) ret.push(50000);

  for(let i=1;i<=T;i++)
  {
    for(const c of C)
    {

      if(i-c >=0)
      {
         ret[i] = Math.min(ret[i], ret[i-c]+1);
      }
    }
  }

  return ret[T];


}


function climbingSteps(T)
{

  //if(T===0) return(1)

   let ret=[];

   ret.push(1);
   ret.push(1);
   ret.push(2);
   //ret.push(1);

   for(let i=3;i<=T;i++)
   {
      ret.push(ret[i-1] + ret[i-2] + ret[i-3]);
   }

   return ret[T];

}

//console.log(climbingSteps(4));

//const coins = [1, 5, 10, 25];
//const coins2 = [5];

//console.log(coinChange(coins, 31));


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
