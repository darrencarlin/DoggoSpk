// async function getDictionary() {
//   let dictionaryArr = [];
//   let dictionaryRef = db.collection("dictionary");
//   let dictionary = await dictionaryRef.get();
//   for (item of dictionary.docs) {
//     let data = item.data();
//     let obj = {
//       name: data.name,
//       arr: data.arr
//     };
//     dictionaryArr.push(obj);
//   }
//   console.log(dictionaryArr);
//   try {
//   } catch (err) {
//     console.log("error", err);
//   }
// }

// getDictionary();
// let testArr = [];
// async function getWordsTest() {
//   let wordsRef = db.collection("noTranslation");
//   let words = await wordsRef.get();
//   for (word of words.docs) {
//     let data = word.data();
//     testArr.push(data.word);
//   }
//   console.log(testArr);

//   try {
//   } catch (err) {
//     console.log("error", err);
//   }
// }
// getWordsTest();

// Get words not yet translated from Firestore

// let wordsArr = [];

// function getWords() {
//   wordsArr = [];
//   wordsRef.get().then(snapshot => {
//     wordCount.innerHTML = snapshot.size;
//     snapshot.forEach(doc => {
//       const data = doc.data();
//       const id = doc.id;
//       for (key in data) {
//         if (data.hasOwnProperty(key)) {
//           let value = data[key];
//           entireWordsArr.push(value);
//           wordsArr.push({
//             name: value,
//             id: id
//           });
//         }
//       }
//     });

//     // displayWords(wordsArr);
//   });
// }
// getWords();

// const dictionary = {
//   what: ["wut"],
//   why: ["y"],
//   puppy: ["pupperino"],
//   fur: ["floof"],
//   help: ["halp"],
//   hello: ["herro"],
//   lick: ["mlem"],
//   fat: ["thicc"],
//   treats: ["yum yums"],
//   hungry: ["hungo"],
//   snack: ["snacc"],
//   attention: ["attenchon"],
//   stop: ["staph"],
//   that: ["dat"],
//   thats: ["dats"],
//   this: ["dis"],
//   fuck: ["furk"],
//   never: ["neber"],
//   some: ["sum"],
//   someone: ["some1"],
//   weird: ["werd"],
//   somebody: ["sumbufy"],
//   fuckery: ["furkery"],
//   brother: ["brofur"],
//   brothers: ["brofurs"],
//   laugh: ["laf"],
//   sister: ["sisfur"],
//   sisters: ["sisfurs"],
//   parent: ["pawrent"],
//   parents: ["pawrents"],
//   are: ["r"],
//   serious: ["sirius"],
//   paws: ["stumps", "toe beans"],
//   dog: ["doggo"],
//   more: ["moar"],
//   with: ["wid"],
//   please: ["peez"],
//   scratches: ["scritches"],
//   look: ["lewk"],
//   give: ["gib"],
//   teeth: ["teef"],
//   think: ["tink"],
//   you: ["u"],
//   need: ["ned"],
//   to: ["2"],
//   your: ["ur"],
//   its: ["is"],
//   me: ["ma"],
//   friend: ["fren"],
//   friends: ["frens"],
//   fret: ["fret"],
//   treats: ["noms"],
//   doing: ["doin"],
//   bark: ["bork"],
//   come: ["com"],
//   human: ["hooman"],
//   hungry: ["hungy"],
//   for: ["fur"],
//   love: ["luv", "lub"],
//   very: ["heckin"],
//   food: ["noms"],
//   like: ["liek"],
//   nose: ["snoot"],
//   legs: ["nubs"],
//   have: ["hav"],
//   run: ["zoom"],
//   running: ["zoomies"],
//   bird: ["birb"],
//   crazy: ["heckin"],
//   good: ["da bes"],
//   boy: ["boye"],
//   ignoring: ["ignore"],
//   cat: ["catto"],
//   kitten: ["kitteh"],
//   dead: ["ded"],
//   have: ["hav"],
//   never: ["neber"],
//   hated: ["h8d"],
//   hate: ["h8"],
//   small: ["smol"],
//   loves: ["ruffs"],
//   believe: ["belieb"],
//   butter: ["butta"],
//   hi: ["hai"],
//   best: ["bestest"],
//   peanuts: ["nutz"],
//   cashews: ["nutz"],
//   sprint: ["zoom"],
//   fish: ["fishies"],
//   sprints: ["zoomies"],
//   sprinting: ["zoomies"],
//   mom: ["mahm"],
//   dad: ["dadfur", "popfur"],
//   walk: ["walkies"],
//   dinner: ["kibble"],
//   train: ["tren"],
//   cheese: ["chez", "cheeezz"],
//   afraid: ["fraid", "fraaaid", "fraaaaiiiddddd"],
//   excuse: ["scuse"],
//   stupid: ["stoopid"],
//   too: ["2"],
//   protect: ["protec"],
//   there: ["ther"],
//   here: ["hur"],
//   talk: ["tak"],
//   take: ["tak"],
//   breakfast: ["breakfurrst"],
//   happy: ["happi"],
//   sniff: ["smells"],
//   georgethewelshcorgi: ["fluffybumasaurus"]
// };
//console.log(dictionary);
