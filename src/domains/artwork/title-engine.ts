const banned=/(?:masterpiece|ultimate|luxury|magical|mystic|blessed|sacred|fortune|prosperity|guaranteed|AI)/iu;
const nouns:Readonly<Record<string,string>>={"mountain-dawn":"Dawn","teak-courtyard":"Courtyard","rice-terraces":"Fields","forest-stream":"Current","botanical-atelier":"Garden Study","earthen-village":"Homeward Field","mist-valley":"Valley Mist","northern-garden":"Northern Garden"};
const qualities:Readonly<Record<string,string>>={NEW_BEGINNING:"Opening",GROWTH:"Patient",COURAGE:"Steadfast",HARMONY:"Quiet",GRATITUDE:"Gathered",REMEMBRANCE:"Remembered",BELONGING:"Returning",RESTORATION:"Restored"};
export function createArtworkTitle(intention:string,worldId:string):string{
 const title=`${qualities[intention]??"Quiet"} ${nouns[worldId]??"Horizon"}`;
 if(banned.test(title)) throw new Error("Title contains a prohibited claim or marketing term");
 return title;
}
export function isTitleAllowed(title:string):boolean{return title.length>=3&&title.length<=80&&!banned.test(title);}
