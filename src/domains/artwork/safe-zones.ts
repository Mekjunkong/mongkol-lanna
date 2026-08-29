import type { OutputFormat, SafeZoneType } from "../catalog/types";
export type ZoneLocation="TOP"|"BOTTOM"|"LEFT"|"RIGHT"|"CENTER"|"PERIMETER";
export type SafeZone=Readonly<{type:SafeZoneType;location:ZoneLocation;x:number;y:number;width:number;height:number;reason:string}>;
export function safeZoneFor(type:SafeZoneType,format:OutputFormat,preferred:ZoneLocation):SafeZone{
 if(type==="LOCK_SCREEN") return Object.freeze({type,location:"TOP",x:0.15,y:0,width:0.7,height:format==="PORTRAIT"?0.28:0.2,reason:"Reserve quiet space for the device clock overlay"});
 if(type==="HOME_SCREEN") return Object.freeze({type,location:format==="LANDSCAPE"?"RIGHT":"BOTTOM",x:format==="LANDSCAPE"?0.66:0.1,y:format==="LANDSCAPE"?0.1:0.68,width:format==="LANDSCAPE"?0.34:0.8,height:format==="LANDSCAPE"?0.8:0.32,reason:"Keep app-icon area visually quiet"});
 const regions:Record<ZoneLocation,[number,number,number,number]>={TOP:[0.1,0,0.8,0.18],BOTTOM:[0.1,0.82,0.8,0.18],LEFT:[0,0.1,0.24,0.8],RIGHT:[0.76,0.1,0.24,0.8],CENTER:[0.3,0.3,0.4,0.4],PERIMETER:[0,0,1,1]};
 const [x,y,width,height]=regions[preferred];
 return Object.freeze({type,location:preferred,x,y,width,height,reason:"Composition breathing room"});
}
